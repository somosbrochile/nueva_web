import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { CustomCursor, Magnetic, FadeUp, Nav, Footer, PageTransition } from './site.jsx'
import './styles.css'

/* ── SVG icons — stroke fino, sin fill ──────────────────────── */
const PF_ICONS = [
  // 0 — Cámara de video profesional
  { top:"8%",  left:"3%",  size:68, color:"#e47204", anim:"hk-a", dur:13, delay:0,   speed:0.068, opacity:0.22,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="13" height="10" rx="2"/><path d="M15 10l6-3v10l-6-3V10z"/><line x1="6" y1="7" x2="6" y2="4"/><line x1="10" y1="7" x2="10" y2="4"/><line x1="6" y1="4" x2="10" y2="4"/></svg> },

  // 1 — Smartphone
  { top:"5%",  left:"62%", size:52, color:"#d00a5f", anim:"hk-b", dur:10, delay:1.5, speed:0.060, opacity:0.20,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/><line x1="9" y1="6" x2="15" y2="6"/></svg> },

  // 2 — Laptop
  { top:"32%", left:"87%", size:76, color:"#206ea6", anim:"hk-c", dur:16, delay:0.8, speed:0.071, opacity:0.18,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M1 21h22"/><path d="M9 17l.5 2h5l.5-2"/></svg> },

  // 3 — YouTube (play en círculo)
  { top:"68%", left:"5%",  size:58, color:"#f8ac08", anim:"hk-d", dur:12, delay:2.2, speed:0.062, opacity:0.22,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10,8 17,12 10,16" strokeLinejoin="round"/></svg> },

  // 4 — Instagram
  { top:"18%", left:"47%", size:44, color:"#f8ac08", anim:"hk-e", dur:9,  delay:3.1, speed:0.026, opacity:0.17,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5" strokeWidth="2.5"/></svg> },

  // 5 — Buscador Google
  { top:"50%", left:"1%",  size:54, color:"#e47204", anim:"hk-f", dur:15, delay:0.3, speed:0.055, opacity:0.20,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="17" rx="2"/><line x1="2" y1="8" x2="22" y2="8"/><circle cx="5" cy="5.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="8" cy="5.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="11" cy="5.5" r="0.8" fill="currentColor" stroke="none"/><rect x="5" y="11" width="14" height="3" rx="1.5"/><line x1="17" y1="13" x2="20" y2="16" strokeWidth="1.6"/></svg> },

  // 6 — Pin de ubicación
  { top:"76%", left:"63%", size:62, color:"#d00a5f", anim:"hk-b", dur:14, delay:1.8, speed:0.057, opacity:0.22,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.69 2 6 4.69 6 8c0 5.25 6 14 6 14s6-8.75 6-14c0-3.31-2.69-6-6-6z"/><circle cx="12" cy="8" r="2.2"/></svg> },

  // 7 — Rayo / flash
  { top:"42%", left:"74%", size:46, color:"#206ea6", anim:"hk-c", dur:10, delay:4.0, speed:0.034, opacity:0.18,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5H12L11 22l8.5-11.5H12.5L13 2z"/></svg> },

  // 8 — Micrófono
  { top:"4%",  left:"81%", size:82, color:"#206ea6", anim:"hk-d", dur:18, delay:0.6, speed:0.074, opacity:0.16,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/></svg> },

  // 9 — Documento / guión
  { top:"83%", left:"40%", size:60, color:"#e47204", anim:"hk-e", dur:11, delay:2.7, speed:0.046, opacity:0.21,
    svg:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/><line x1="8" y1="9" x2="11" y2="9"/></svg> },
];

function PortfolioIcons() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const header  = container.closest(".page-head");
    const spans   = Array.from(container.querySelectorAll(".pf-icon"));
    const speeds  = spans.map(el => parseFloat(el.dataset.speed) || 0.04);
    const cur     = spans.map(() => ({ x:0, y:0 }));
    const tgt     = spans.map(() => ({ x:0, y:0 }));

    const onMove = (e) => {
      const r  = (header || container).getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      spans.forEach((_, i) => { tgt[i].x = dx * speeds[i]; tgt[i].y = dy * speeds[i]; });
    };
    const onLeave = () => spans.forEach((_, i) => { tgt[i].x = 0; tgt[i].y = 0; });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const lerp = (a, b, t) => a + (b - a) * t;
    const SMOOTH = 0.07;
    let raf;
    const tick = () => {
      spans.forEach((el, i) => {
        cur[i].x = lerp(cur[i].x, tgt[i].x, SMOOTH);
        cur[i].y = lerp(cur[i].y, tgt[i].y, SMOOTH);
        el.style.translate = `${cur[i].x.toFixed(2)}px ${cur[i].y.toFixed(2)}px`;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pf-icons" ref={containerRef} aria-hidden="true">
      {PF_ICONS.map((ic, i) => (
        <span
          key={i}
          className={"pf-icon hk-" + ic.anim}
          data-speed={ic.speed}
          style={{
            top:              ic.top,
            left:             ic.left,
            width:            ic.size,
            height:           ic.size,
            color:            ic.color,
            opacity:          ic.opacity,
            animationDuration: ic.dur + "s",
            animationDelay:   "-" + ic.delay + "s",
          }}
        >
          {ic.svg}
        </span>
      ))}
    </div>
  );
}

const PROJECTS = [
  {
    brand:        "Munay Rehabilitación",
    tag:          "Creación de Contenido · Redes Sociales",
    year:         "2025",
    image:        "assets/portfolio/Munay-rehabilitacion-fisica-antofagasta.png",
    filter:       "social",
    scroll:       true,
    scrollDur:    "8s",
    footGrad:     "linear-gradient(135deg,#d00a5f,#206ea6)",
  },
  {
    brand:        "Pamela Olivares",
    tag:          "Creación de Contenido · Marca Personal",
    year:         "2025",
    image:        "assets/portfolio/pamela-olivares-abogada-familia-santiago.png",
    filter:       "web",
    scroll:       true,
    scrollDur:    "8s",
    footGrad:     "linear-gradient(135deg,#206ea6,#491c4b)",
  },
  {
    brand:        "Carolyn San Martín",
    tag:          "Diseño Web",
    year:         "2025",
    image:        "assets/portfolio/Carolyn-san-martin-abogada-penalista-sitio-web.png",
    filter:       "web",
    scroll:       true,
    scrollDur:    "11s",
    footGrad:     "linear-gradient(135deg,#5C1A1E,#2d1230)",
  },
  {
    brand:        "Doctek Ingeniería",
    tag:          "Branding · Logo · Sitio Web",
    year:         "2025",
    image:        "assets/portfolio/sitio-web-doctek-ingenieria-antofagasta.png",
    filter:       "web",
    scroll:       true,
    scrollDur:    "11s",
    footGrad:     "linear-gradient(135deg,#1C1C1E,#e47204)",
  },
];

const VIDEOS = [
  {
    videoId: "ph5-Fvsredc",
    brand:   "Sacha Damjanic · Bodyboarder Profesional",
    tag:     "Programa · Tu Historia",
    year:    "2024",
    thumb:   "https://img.youtube.com/vi/ph5-Fvsredc/maxresdefault.jpg",
    link:    "https://youtube.com/watch?v=ph5-Fvsredc",
    filter:  "audiovisual",
  },
  {
    videoId: "XZf6teyOMtE",
    brand:   "Campaña FyF · Hombres Jóvenes",
    tag:     "Producción Audiovisual · Felices y Forrados",
    year:    "2024",
    thumb:   "https://img.youtube.com/vi/XZf6teyOMtE/maxresdefault.jpg",
    link:    "https://youtube.com/watch?v=XZf6teyOMtE",
    filter:  "audiovisual",
  },
  {
    videoId: "O-vrXXRWk84",
    brand:   "Christian Dawson · Skater Profesional",
    tag:     "Programa · Tu Historia",
    year:    "2024",
    thumb:   "https://img.youtube.com/vi/O-vrXXRWk84/maxresdefault.jpg",
    link:    "https://youtube.com/watch?v=O-vrXXRWk84",
    filter:  "audiovisual",
  },
];

const FILTERS = [
  ["all",        "Todo"],
  ["branding",   "Branding"],
  ["audiovisual","Audiovisual"],
  ["social",     "Social"],
  ["web",        "Web"],
];

/* ── Tarjeta de video con preview Netflix-style ─────────────── */
function VideoCard({ p }) {
  const [preview, setPreview] = useState(false);

  const embedSrc = `https://www.youtube.com/embed/${p.videoId}` +
    `?autoplay=1&mute=1&controls=0&loop=1&playlist=${p.videoId}` +
    `&rel=0&modestbranding=1&playsinline=1`;

  return (
    <a
      className="work-item work-item--video"
      href={p.link}
      target="_blank"
      rel="noreferrer noopener"
      onMouseEnter={() => setPreview(true)}
      onMouseLeave={() => setPreview(false)}
    >
      <div className="work-thumb work-thumb--video">

        <img
          src={p.thumb}
          alt={p.brand}
          loading="lazy"
          className={"work-thumb-img" + (preview ? " work-thumb-img--hidden" : "")}
        />

        {preview && (
          <iframe
            className="work-thumb-iframe"
            src={embedSrc}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title={p.brand}
          />
        )}

        <div className={"work-play" + (preview ? " work-play--hidden" : "")}>
          <div className="work-play-circle">
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22" style={{marginLeft:2}}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

      </div>
      <div className="work-foot">
        <div>
          <h4>{p.brand}</h4>
          <div className="tag">{p.tag}</div>
        </div>
        <span className="year-pill">{p.year}</span>
      </div>
    </a>
  );
}

function PlaceholderCard({ p }) {
  return (
    <a
      className={"work-item" + (p.scroll ? " work-item--scroll" : "")}
      href="#"
      style={p.scrollDur ? {"--scroll-dur": p.scrollDur} : {}}
    >
      <div className="work-thumb" style={p.image ? {} : {background: p.color}}>
        {p.image
          ? <img
              src={p.image}
              alt={p.brand}
              loading="lazy"
              className={p.scroll ? "work-scroll-img" : "work-thumb-img"}
            />
          : <div className="ph">{p.initial}</div>
        }
      </div>
      <div
        className="work-foot"
        style={p.footGrad ? {background: p.footGrad} : {}}
      >
        <div>
          <h4>{p.brand}</h4>
          <div className="tag">{p.tag}</div>
        </div>
        <span className="year-pill">{p.year}</span>
      </div>
    </a>
  );
}

function Portfolio() {
  const [f, setF] = useState("all");

  const regularList = f === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.filter === f);

  const videoList = f === "all"
    ? VIDEOS
    : VIDEOS.filter(p => p.filter === f);

  const showRegular = regularList.length > 0;
  const showVideos  = videoList.length > 0;

  return (
    <PageTransition>
      <Nav active="portfolio.html" />
      <header className="page-head">
        <div className="blob" style={{background:"radial-gradient(circle,#206ea6,transparent 70%)"}} />
        <PortfolioIcons />
        <div className="container" style={{position:"relative",zIndex:1}}>
          <FadeUp><span className="eyebrow">Portfolio</span></FadeUp>
          <FadeUp delay={0.05}><h1 style={{marginTop:24}}>Contenido que <span className="grad-text">convierte.</span></h1></FadeUp>
          <FadeUp delay={0.12}>
            <p style={{maxWidth:"58ch",fontSize:20,marginTop:32,color:"var(--ink-2)"}}>
              Empresas y profesionales de Santiago que apostaron por contenido con estrategia, branding con identidad y sitios web que convierten.
            </p>
          </FadeUp>
        </div>
      </header>

      <section style={{paddingTop:48}}>
        <div className="container">

          {/* Filtros */}
          <FadeUp>
            <div className="row" style={{marginBottom:48,gap:8}}>
              {FILTERS.map(([k,label]) => (
                <button
                  key={k}
                  onClick={() => setF(k)}
                  className="service-tag"
                  style={{
                    border:     f===k ? "1px solid var(--ink)" : "1px solid var(--line-2)",
                    background: f===k ? "var(--ink)"          : "transparent",
                    color:      f===k ? "var(--bg)"           : "var(--ink-2)",
                    padding:"10px 18px", fontSize:13, fontWeight:600,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Grid proyectos regulares — 2 columnas */}
          {showRegular && (
            <div className="work-grid">
              {regularList.map((p, i) => (
                <FadeUp key={p.brand} delay={i * 0.05}>
                  <PlaceholderCard p={p} />
                </FadeUp>
              ))}
            </div>
          )}

          {/* Grid videos — 3 columnas */}
          {showVideos && (
            <div style={{marginTop: showRegular ? 64 : 0}}>
              <FadeUp>
                <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:32}}>
                  <span className="eyebrow">Producción audiovisual</span>
                </div>
              </FadeUp>
              <div className="video-grid">
                {videoList.map((p, i) => (
                  <FadeUp key={p.videoId} delay={i * 0.06}>
                    <VideoCard p={p} />
                  </FadeUp>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
      <CustomCursor />
    </PageTransition>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Portfolio />);
