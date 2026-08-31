import React from 'react'
import { CustomCursor, Nav, Footer, PageTransition, FadeUp, Magnetic } from '../site.jsx'
import '../styles.css'

/* ------------------------------------------------------------------
   PLANTILLA REUTILIZABLE DE ARTÍCULO
   Para crear un artículo nuevo:
   1. Copia el par de archivos de un artículo existente
      (blog/mi-slug.html  +  blog/mi-slug.jsx).
   2. En el .html cambia: <title>, description, keywords, canonical,
      og:*, y los DOS bloques de schema (BlogPosting + BreadcrumbList).
   3. En el .jsx cambia el objeto `meta` y el contenido dentro de <Article>.
   4. Registra el artículo en blog-data.js (arriba del todo).
   5. Agrega la entrada al input de vite.config.js.
   6. Agrega la URL al sitemap.xml.
   ------------------------------------------------------------------ */

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

        {/* CUERPO */}
        <div className="container article-container">
          <div className="article-prose">
            {children}
          </div>

          {/* CTA final */}
          <FadeUp>
            <div className="article-cta">
              <h2>¿Tu marca necesita más que un logo?</h2>
              <p>
                En Somos Bro construimos identidad de marca completa para empresas
                en Santiago y todo Chile. Conversemos sobre tu proyecto.
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
