import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Nav, Footer, PageTransition, FadeUp } from '../site.jsx'
import { articles, categories } from '../blog-data.js'
import '../styles.css'

function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filtered = activeCategory === 'Todos'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <PageTransition>
      <Nav active="/blog" />

      <header className="page-head">
        <div className="container">
          <FadeUp><span className="eyebrow">Blog</span></FadeUp>
          <FadeUp delay={0.05}>
            <h1 style={{ marginTop: 24, maxWidth: '18ch' }}>
              Ideas que <span className="grad-text">generan resultados.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p style={{ maxWidth: '60ch', fontSize: 20, marginTop: 32, color: 'var(--ink-2)' }}>
              Marketing digital, branding, diseño web y marca personal para empresas en Santiago y Chile.
            </p>
          </FadeUp>
        </div>
      </header>

      <section style={{ padding: '80px 0' }}>
        <div className="container">

          {/* Filtro categorías */}
          <FadeUp>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 999,
                    border: '1px solid var(--line)',
                    background: activeCategory === cat ? 'var(--orange)' : 'transparent',
                    color: '#fff',
                    fontFamily: 'var(--font-h)',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all 200ms'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Grid artículos */}
          {filtered.length === 0 ? (
            <FadeUp>
              <p style={{ color: 'var(--ink-2)', fontSize: 18 }}>
                Próximamente — el primer artículo ya está en camino.
              </p>
            </FadeUp>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
              {filtered.map((article, i) => (
                <FadeUp key={article.slug} delay={i * 0.06}>
                  <a
                    href={`/blog/${article.slug}`}
                    style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                  >
                    <article style={{
                      border: '1px solid var(--line)',
                      borderRadius: 16,
                      padding: 32,
                      background: 'var(--bg-2)',
                      transition: 'border-color 200ms',
                      height: '100%'
                    }}>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: 'var(--orange)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}>
                        {article.category}
                      </span>
                      <h2 style={{ fontSize: 22, marginTop: 12, color: '#fff', lineHeight: 1.3 }}>
                        {article.title}
                      </h2>
                      <p style={{ color: 'var(--ink-2)', marginTop: 12, fontSize: 15, lineHeight: 1.6 }}>
                        {article.excerpt}
                      </p>
                      <div style={{ display: 'flex', gap: 16, marginTop: 24, fontSize: 13, color: 'var(--ink-3)' }}>
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.readTime} lectura</span>
                      </div>
                    </article>
                  </a>
                </FadeUp>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogIndex />);
