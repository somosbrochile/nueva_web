import React from 'react'
import { CustomCursor, Nav, Footer, PageTransition, FadeUp, Magnetic } from '../site.jsx'
import '../styles.css'

/* ------------------------------------------------------------------
   PLANTILLA REUTILIZABLE DE ARTÍCULO
   Para crear un artículo nuevo:
   1. Copia el par de archivos de un artículo existente
      (blog/mi-slug.html  +  blog/mi-slug.jsx).
   2. En el .html cambia: <title>, description, keywords, canonical,
      og:*, y los bloques de schema (BlogPosting + BreadcrumbList + FAQ).
   3. En el .jsx cambia el objeto `meta` y el contenido dentro de <Article>.
   4. Registra el artículo en blog-data.js (arriba del todo).
   5. Agrega la entrada al input de vite.config.js.
   6. Agrega la URL al sitemap.xml.

   IMÁGENES
   - Portada: en `meta` agrega  heroImage: '/assets/tu-foto.jpg'  y
     heroAlt: 'texto alternativo con keyword'. Si heroImage queda vacío
     ('') no se muestra nada — el artículo queda limpio.
   - Fotos dentro del texto: usa el componente <Figure> en el cuerpo:
        <Figure src="/assets/galeria/foto.jpg" alt="descripcion con keyword"
                caption="Pie de foto opcional" />
   ------------------------------------------------------------------ */

/* Imagen dentro del cuerpo del artículo (con pie de foto opcional) */
export function Figure({ src, alt = '', caption }) {
  return (
    <FadeUp>
      <figure className="article-figure">
        <img src={src} alt={alt} loading="lazy" />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </FadeUp>
  );
}

export function Article({ meta, children }) {
  return (
    <PageTransition>
      <CustomCursor />
      <Nav active="/blog" />

      <article>
        {/* HEADER */}
        <header className="article-head">
          <div className="container article-container">

            {/* Breadcrumb visible (coincide con el schema BreadcrumbList del .html) */}
            <nav className="breadcrumb" aria-label="Ruta de navegación">
              <a href="/">Home</a>
              <span>/</span>
              <a href="/blog">Blog</a>
              <span>/</span>
              <span className="breadcrumb-current">{meta.category}</span>
            </nav>

            <FadeUp>
              <span className="article-category">{meta.category}</span>
            </FadeUp>
            <FadeUp delay={0.05}>
              <h1 className="article-title">{meta.title}</h1>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="article-meta">
                <span>{meta.author || 'Somos Bro'}</span>
                <span>·</span>
                <time dateTime={meta.dateISO}>{meta.dateLabel}</time>
                <span>·</span>
                <span>{meta.readTime} de lectura</span>
              </div>
            </FadeUp>
          </div>
        </header>

        {/* PORTADA — solo se muestra si meta.heroImage tiene una ruta */}
        {meta.heroImage && (
          <div className="container article-container">
            <FadeUp>
              <figure className="article-hero">
                <img src={meta.heroImage} alt={meta.heroAlt || meta.title} />
              </figure>
            </FadeUp>
          </div>
        )}

        {/* CUERPO */}
        <div className="container article-container">
          <div className="article-prose">
            {children}
          </div>

          {/* CTA final (genérico, sirve para cualquier artículo) */}
          <FadeUp>
            <div className="article-cta">
              <h2>{meta.ctaTitle || '¿Hablamos de tu proyecto?'}</h2>
              <p>
                {meta.ctaText || 'En Somos Bro construimos marcas que generan autoridad: contenido, branding y diseño web para empresas en Santiago y todo Chile.'}
              </p>
              <div className="row" style={{ marginTop: 24 }}>
                <Magnetic>
                  <a className="btn btn-primary" href="/contacto">
                    Empezar un proyecto
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a className="btn btn-ghost" href="/blog">Ver más artículos</a>
                </Magnetic>
              </div>
            </div>
          </FadeUp>
        </div>
      </article>

      <Footer />
    </PageTransition>
  );
}
