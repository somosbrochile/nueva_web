/**
 * Prerender de las páginas del sitio.
 *
 * Corre DESPUÉS de `vite build`. Levanta un servidor estático sobre /dist,
 * abre cada ruta en Chromium headless, deja que React (framer-motion, etc.)
 * renderice, y reescribe el HTML de cada página con el DOM ya renderizado.
 * Así Google recibe el <body> con contenido y enlaces <a href> reales en la
 * primera respuesta, en vez de un <div id="root"></div> vacío.
 *
 * Es un snapshot con navegador real: no requiere que los componentes sean
 * "SSR-safe" (usan navigator/document a nivel de módulo), a diferencia de
 * renderizar en Node.
 */
import { createServer } from 'node:http'
import { readFile, writeFile, stat } from 'node:fs/promises'
import { join, extname, resolve } from 'node:path'
import puppeteer from 'puppeteer'

const DIST = resolve('dist')
const PORT = 4321

// Rutas a prerenderizar = las mismas entradas del build (vite.config.js).
const ROUTES = [
  'index.html',
  'about.html',
  'services.html',
  'portfolio.html',
  'contact.html',
  'diagnostico-digital.html',
  'blog/index.html',
  'blog/por-que-tu-empresa-necesita-branding.html',
  'blog/publicidad-pagada-vs-contenido-organico.html',
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
}

// Servidor estático mínimo sobre /dist.
function startServer() {
  return new Promise((resolveServer) => {
    const server = createServer(async (req, res) => {
      try {
        let urlPath = decodeURIComponent(req.url.split('?')[0])
        if (urlPath.endsWith('/')) urlPath += 'index.html'
        let filePath = join(DIST, urlPath)
        try {
          const s = await stat(filePath)
          if (s.isDirectory()) filePath = join(filePath, 'index.html')
        } catch {}
        const data = await readFile(filePath)
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
        res.end(data)
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not found')
      }
    })
    server.listen(PORT, () => resolveServer(server))
  })
}

async function main() {
  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: true,
    // executablePath permite usar un Chromium ya instalado (verificación local);
    // en Vercel queda vacío y usa el Chromium que trae puppeteer.
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  let ok = 0
  for (const route of ROUTES) {
    const page = await browser.newPage()
    const url = `http://localhost:${PORT}/${route}`
    const errors = []
    page.on('pageerror', (e) => errors.push(String(e)))
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 })
      // Margen para el primer frame de framer-motion y montaje de React.
      await new Promise((r) => setTimeout(r, 1200))

      // Limpieza: quitar los nodos que el cursor personalizado inyecta en <body>
      // (son decorativos y no deben quedar en el HTML estático).
      await page.evaluate(() => {
        document
          .querySelectorAll('.cursor-dot, .cursor-ring, [data-prerender-strip]')
          .forEach((el) => el.remove())
      })

      let html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML)
      await writeFile(join(DIST, route), html, 'utf-8')

      // Verificación básica: ¿quedó texto y enlaces en el body?
      const check = await page.evaluate(() => {
        const bodyText = (document.body.innerText || '').replace(/\s+/g, ' ').trim()
        const anchors = document.querySelectorAll('a[href]').length
        return { words: bodyText.split(' ').filter(Boolean).length, anchors }
      })
      const warn = errors.length ? `  ⚠ ${errors.length} pageerror` : ''
      console.log(`✓ ${route.padEnd(48)} ${String(check.words).padStart(5)} palabras  ${String(check.anchors).padStart(3)} <a>${warn}`)
      if (check.words < 40 || check.anchors < 3) {
        console.log(`  ⚠ ${route} quedó con poco contenido — revisar`)
      } else {
        ok++
      }
    } catch (e) {
      console.error(`✗ ${route}: ${e.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
  server.close()
  console.log(`\nPrerender listo: ${ok}/${ROUTES.length} páginas con contenido.`)
  if (ok < ROUTES.length) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
