import React from 'react'
import ReactDOM from 'react-dom/client'
import { Article } from './article-layout.jsx'

const meta = {
  title: '¿Cuánto cuesta una página web en Chile? Precios 2026 y qué estás pagando realmente',
  category: 'Diseño Web',
  author: 'Somos Bro',
  dateISO: '2026-10-06',
  dateLabel: '6 de octubre, 2026',
  readTime: '8 min',
  // Portada: sube la foto a public/assets/blog/ y descomenta:
  // heroImage: '/assets/blog/cuanto-cuesta-pagina-web-chile.jpg',
  // heroAlt: 'Cuánto cuesta una página web en Chile — Somos Bro',
  heroImage: '/assets/blog/cuanto-cuesta-pagina-web-chile.jpg',
  heroAlt: 'Diseñador web en una oficina de Santiago con vista a la cordillera revisando tres propuestas de sitio web, cuánto cuesta una página web en Chile',
  ctaTitle: '¿Quieres una cotización clara, sin letra chica?',
  ctaText: 'Te decimos qué necesita tu sitio, cuánto cuesta y qué pagas aparte. Diseño web para pymes y empresas en Santiago y todo Chile.',
};

function Post() {
  return (
    <Article meta={meta}>
      <p>
        ¿Cuánto cuesta una página web en Chile? Si ya cotizaste, sabes que las respuestas van
        de un extremo al otro: alguien te ofrece un sitio por $150.000 y otro te pide $4.000.000
        por algo que, en apariencia, es lo mismo. No es que uno sea estafador y el otro un
        genio. Es que casi nunca están cotizando lo mismo.
      </p>

      <div className="key-takeaway">
        <p>
          <strong>En resumen:</strong> en Chile una página web cuesta desde{' '}
          <strong>$150.000</strong> (sitio básico, freelance) hasta <strong>más de $5.000.000</strong>{' '}
          (e-commerce o desarrollo a medida). La mayoría de las pymes invierte entre{' '}
          <strong>$500.000 y $2.000.000</strong>. A eso súmale dominio y hosting, que se pagan
          todos los años, y una regla que no se negocia: <strong>el dominio debe quedar a tu nombre</strong>.
        </p>
      </div>

      <h2>Por qué los precios son tan distintos</h2>
      <p>
        En el mercado chileno conviven ofertas muy económicas y precios elevados, y ambas pueden
        tener sentido. La diferencia está en lo que viene dentro del precio:
      </p>
      <ul>
        <li><strong>Las ofertas económicas</strong> suelen ser una plantilla con tu logo y tus colores, textos que escribes tú y poca o nula estrategia. Para partir puede bastar.</li>
        <li><strong>Los precios intermedios</strong> normalmente suman diseño propio, textos pensados para vender, SEO básico y un sitio que puedes editar tú mismo.</li>
        <li><strong>Los precios altos</strong> incluyen estrategia, diseño a medida, integraciones (pagos, reservas, CRM), e-commerce o funciones que no existen en una plantilla.</li>
      </ul>
      <p>
        El problema aparece cuando comparas cotizaciones como si fueran lo mismo. Una de $300.000
        y una de $1.500.000 pueden estar ofreciendo dos productos completamente distintos.
      </p>

      <h2>Precios de una página web en Chile por tipo de sitio</h2>
      <p>
        Estos son rangos de referencia del mercado chileno en 2026, según los datos de{' '}
        <a href="https://www.godaddy.com/resources/latam/clientes/cuanto-cuesta-pagina-web-chile" target="_blank" rel="noreferrer">GoDaddy</a>{' '}
        y de la plataforma de freelancers{' '}
        <a href="https://www.2x3.cl/p/precios-disenador-web" target="_blank" rel="noreferrer">2x3</a>,
        que calcula un promedio de $600.000 a partir de cotizaciones reales:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Tipo de sitio</th>
              <th>Rango aproximado</th>
              <th>Para quién sirve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Hazlo tú (Wix, constructores)</strong></td>
              <td>Desde ~$30.000 + tu tiempo</td>
              <td>Emprendimientos que recién parten y necesitan existir en internet</td>
            </tr>
            <tr>
              <td><strong>Sitio básico o landing</strong></td>
              <td>$150.000 – $500.000</td>
              <td>Profesionales independientes o negocios con un solo servicio</td>
            </tr>
            <tr>
              <td><strong>Sitio corporativo</strong></td>
              <td>$500.000 – $2.000.000</td>
              <td>Pymes que necesitan generar consultas y transmitir confianza</td>
            </tr>
            <tr>
              <td><strong>Tienda online (e-commerce)</strong></td>
              <td>Desde $500.000 a varios millones</td>
              <td>Negocios que venden productos con pago y despacho online</td>
            </tr>
            <tr>
              <td><strong>Desarrollo a medida</strong></td>
              <td>$2.000.000 – $5.000.000 o más</td>
              <td>Empresas con procesos, integraciones o funciones específicas</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>De qué depende el precio de una página web</h2>
      <ul>
        <li><strong>Cantidad de páginas y secciones:</strong> no cuesta lo mismo una página que diez.</li>
        <li><strong>Diseño propio o plantilla:</strong> diseñar desde cero toma más horas que adaptar algo existente.</li>
        <li><strong>Quién escribe los textos y pone las fotos:</strong> si lo hace la agencia, se nota en el precio (y casi siempre en el resultado).</li>
        <li><strong>Funcionalidades:</strong> formularios, reservas, pagos con Webpay, blog, multi-idioma o integraciones.</li>
        <li><strong>SEO:</strong> un sitio hecho para aparecer en Google requiere trabajo técnico que una plantilla no trae.</li>
        <li><strong>Quién lo hace:</strong> un freelance, un estudio pequeño o una agencia con equipo tienen costos distintos.</li>
      </ul>

      <h2>Los costos que no aparecen en la cotización: dominio y hosting</h2>
      <p>
        Muchas cotizaciones muestran solo el diseño y desarrollo. Pero un sitio no funciona sin
        dos cosas que se pagan aparte, todos los años. Si no tienes claro qué son, acá va la
        versión simple:
      </p>
      <h3>¿Qué es un dominio?</h3>
      <p>
        Es la <strong>dirección</strong> de tu sitio: tuempresa.cl. Los dominios .cl se registran
        en NIC Chile y cuestan <strong>$9.990 al año</strong>, exento de IVA, según su{' '}
        <a href="https://www.nic.cl/dominios/tarifas.html" target="_blank" rel="noreferrer">tarifa oficial</a>.
        Si te cobran mucho más solo por el dominio, pregunta qué más incluye.
      </p>
      <h3>¿Qué es un hosting?</h3>
      <p>
        Es el <strong>servidor</strong> donde viven los archivos de tu web, el terreno que
        arriendas para que tu sitio esté disponible las 24 horas. Para un sitio simple parte en
        unos pocos miles de pesos al mes, y sube si necesitas más velocidad, más tráfico o
        correos corporativos.
      </p>
      <h3>Y la mantención</h3>
      <p>
        Actualizaciones, seguridad, respaldos y cambios menores. Algunos proveedores la cobran
        mensual y otros por hora. Pregunta siempre cuánto cuesta antes de firmar, no después.
      </p>

      <h2>El dominio y el hosting siempre a tu nombre</h2>
      <p>
        Este punto casi nadie lo explica. Muchas agencias usan su propio hosting y compran el
        dominio a nombre de ellas. Mientras trabajas con esa agencia no se nota. El problema
        aparece cuando quieres cambiarte: el traspaso depende de que el proveedor anterior
        responda, y muchas veces no responde.
      </p>
      <p>
        Por eso nuestra recomendación es simple: <strong>cada cliente compra su propio dominio
        y su propio hosting</strong>. En Somos Bro te enviamos las mejores opciones, seguras y a
        buen precio, para que elijas tú y todo quede a tu nombre desde el primer día. Si cambias
        de proveedor mañana, tu sitio se va contigo.
      </p>
      <p>
        Lo desarmamos en detalle, junto con otras preguntas clave, en{' '}
        <a href="/blog/como-cotizar-una-pagina-web">cómo cotizar una página web sin sorpresas</a>.
      </p>

      <h2>¿Lo barato sale caro?</h2>
      <p>
        No siempre. Un sitio de $300.000 puede ser exactamente lo que necesita un negocio que
        está partiendo. Lo caro es pagar por algo que no cumple su función: una web bonita que
        nadie encuentra en Google, que no se ve bien en el celular o que no genera ni una
        consulta. La pregunta correcta no es cuánto cuesta, sino{' '}
        <strong>qué tiene que lograr tu sitio</strong> y cuánto vale para tu negocio que lo logre.
      </p>
      <p>
        Si ya tienes un sitio y no sabes si está funcionando, puedes partir por un{' '}
        <a href="/servicios/diagnostico-digital-pymes">diagnóstico digital</a> antes de invertir
        en uno nuevo.
      </p>

      <h2>Preguntas frecuentes</h2>
      <h3>¿Cuánto cuesta una página web en Chile en 2026?</h3>
      <p>
        Depende del tipo de sitio y de quién lo haga. Un sitio básico hecho por un freelance parte
        cerca de los $150.000 a $500.000; un sitio corporativo de agencia suele estar entre
        $500.000 y $2.000.000; y un e-commerce o un sitio a medida puede ir de $2.000.000 a más
        de $5.000.000. A eso se suman el dominio y el hosting, que se pagan aparte todos los años.
      </p>
      <h3>¿Qué es un dominio y qué es un hosting?</h3>
      <p>
        El dominio es la dirección de tu sitio (por ejemplo, tuempresa.cl) y el hosting es el
        servidor donde viven los archivos de la web. El dominio es como la dirección de tu local
        y el hosting, el terreno que arriendas para construirlo. Un dominio .cl cuesta $9.990 al
        año en NIC Chile; el hosting parte en unos pocos miles de pesos al mes.
      </p>
      <h3>¿El dominio y el hosting deben quedar a nombre de la empresa?</h3>
      <p>
        Sí. El dominio siempre debe quedar a nombre de tu empresa como titular, y lo ideal es que
        el hosting también esté en una cuenta tuya. Si quedan a nombre de la agencia y después
        quieres cambiar de proveedor, el traspaso depende de que el proveedor anterior responda,
        y si no lo hace, recuperar tu dominio puede tomar tiempo y costar dinero.
      </p>
    </Article>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Post />);
