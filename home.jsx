/* global React, ReactDOM, framerMotion, Nav, Footer, CustomCursor, Magnetic, FadeUp, RevealHeadline, StatNumber, Marquee, PageTransition */
const { useEffect, useRef, useState } = React;
const { motion, useScroll, useTransform } = window.framerMotion;

/* ----------------------------------------------------------------
   INSTAGRAM — pega aquí tu token de acceso
   Instrucciones: ver INSTAGRAM_SETUP.md en la raíz del proyecto
---------------------------------------------------------------- */
const INSTAGRAM_TOKEN = ""; // 👈 pega tu token aquí

/* ----------------------------------------------------------------
   INSTAGRAM FEED COMPONENT
---------------------------------------------------------------- */
/* ----------------------------------------------------------------
   ESFERA 3D — elemento decorativo para "Quiénes somos"
   Técnica: CSS preserve-3d + 3 anillos orbitales animados.
   Parallax en Y via scroll → JS lerp + rAF (sin librerías).
---------------------------------------------------------------- */
function OrbScene() {
  const groupRef = useRef(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current = 0;
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      const target = window.scrollY * 0.15;    // factor de rotación por pixel
      current = lerp(current, target, 0.05);   // suavidad del seguimiento
      if (group) group.style.transform = `rotateY(${current}deg)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="orb-scene" aria-hidden="true">
      <div className="orb-group" ref={groupRef}>
        {/* Esfera central */}
        <div className="orb">
          <div className="orb-shine" />
        </div>
        {/* Anillos orbitales — distintos ejes y velocidades */}
        <div className="orb-ring orb-ring-1" />
        <div className="orb-ring orb-ring-2" />
        <div className="orb-ring orb-ring-3" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   ABOUT SECTION — con canvas de partículas tipo polvo lunar
---------------------------------------------------------------- */
const PARTICLE_COLORS = ["#e47204","#d00a5f","#206ea6","#f8ac08","#491c4b"];

function AboutSection() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let rafId;

    /* --- tamaño del canvas sincronizado con la sección --- */
    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    /* --- spawnea 3-5 partículas en la posición del mouse --- */
    const spawn = (x, y) => {
      const n = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 1.8;
        particles.push({
          x, y,
          vx:    Math.cos(angle) * speed,
          vy:    Math.sin(angle) * speed - 0.8,  // impulso hacia arriba
          size:  1.5 + Math.random() * 2.5,       // 1.5 – 4px
          color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
          alpha: 0.75 + Math.random() * 0.25,
          decay: 0.016 + Math.random() * 0.024,   // fade variable
        });
      }
    };

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      spawn(e.clientX - r.left, e.clientY - r.top);
    };
    section.addEventListener("mousemove", onMove);

    /* --- loop de animación --- */
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => p.alpha > 0);

      for (const p of particles) {
        p.x     += p.vx;
        p.y     += p.vy;
        p.vy    += 0.045;   // gravedad
        p.vx    *= 0.97;    // rozamiento aire
        p.alpha -= p.decay;

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size / 2), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{position:"relative"}}>
      {/* Canvas overlay — pointer-events:none para no bloquear clicks */}
      <canvas ref={canvasRef} className="about-particles-canvas" />
      <div className="container" style={{position:"relative", zIndex:1}}>
        <div className="about-split">
          {/* Texto — izquierda */}
          <div>
            <FadeUp><span className="eyebrow">Quiénes somos</span></FadeUp>
            <FadeUp delay={0.05}><h2 style={{marginTop:16}}>Agencia creativa <span className="grad-text">con foco en resultados.</span></h2></FadeUp>
            <FadeUp delay={0.1}>
              <p style={{fontSize:18,marginTop:24,lineHeight:1.65,maxWidth:"50ch"}}>
                Somos una agencia creativa con base en Santiago, Chile. Trabajamos con empresas y marcas que quieren comunicar mejor — con contenido que genera autoridad, identidades que se recuerdan y sitios web que convierten. Sin rodeos, sin relleno. Solo trabajo bien hecho.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div style={{marginTop:32}}>
                <Magnetic><a className="btn btn-ghost" href="about.html">Conocer más<svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg></a></Magnetic>
              </div>
            </FadeUp>
          </div>
          {/* Esfera 3D — derecha */}
          <FadeUp delay={0.2}>
            <OrbScene />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------
   GALERÍA MASONRY — "Nuestro trabajo"
---------------------------------------------------------------- */
const GALERIA = [
  { src: "assets/galeria/Doctor-claudio-rojas-ginecologo-antofagasta.jpg",          client: "Dr. Claudio Rojas" },
  { src: "assets/galeria/chris-bannister-tio-wom.jpg",                              client: "Chris Bannister · WOM" },
  { src: "assets/galeria/aerocopter-servicios-helicoptero-chile.jpg",               client: "Aerocopter" },
  { src: "assets/galeria/Modelo-sesion-fotos-somos-bro.jpg",                        client: "Sesión Somos Bro" },
  { src: "assets/galeria/Parafernalia-joyas-anillos-plata-artesanales.jpg",         client: "Parafernalia Joyas" },
  { src: "assets/galeria/maquiyogui.paula.albornoz-creacion-contenido-santiago.jpg",client: "Paula Albornoz · Maquiyogui" },
];

function GaleriaSection() {
  return (
    <section id="galeria">
      <div className="container">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:56,gap:24,flexWrap:"wrap"}}>
          <div>
            <FadeUp><span className="eyebrow">Nuestro trabajo</span></FadeUp>
            <FadeUp delay={0.05}><h2 style={{marginTop:16}}>Detrás de <span className="grad-text">cámara.</span></h2></FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <p style={{maxWidth:"38ch",color:"var(--ink-2)",fontSize:17}}>Una selección de producciones, marcas y momentos reales.</p>
          </FadeUp>
        </div>
        <div className="galeria-grid">
          {GALERIA.map((item, i) => (
            <FadeUp key={item.src} delay={i * 0.07} className="galeria-item-wrap">
              <div className="galeria-item">
                <img
                  src={item.src}
                  alt={item.client}
                  loading="lazy"
                  className="galeria-img"
                />
                <div className="galeria-overlay">
                  <span className="galeria-client">{item.client}</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

const SOCIAL_NETWORKS = [
  {
    name: "Instagram",
    handle: "@somos_bro",
    url: "https://www.instagram.com/somos_bro/",
    color: "#E1306C",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@somos.bro",
    url: "https://www.tiktok.com/@somos.bro",
    color: "#ffffff",
    borderColor: "rgba(255,255,255,0.5)",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.82a4.85 4.85 0 01-1-.13z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@somosbro",
    url: "https://www.youtube.com/@somosbro",
    color: "#FF0000",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.19a3.02 3.02 0 00-2.13-2.14C19.51 3.6 12 3.6 12 3.6s-7.51 0-9.37.47A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.13 2.14C4.49 20.4 12 20.4 12 20.4s7.51 0 9.37-.47a3.02 3.02 0 002.13-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.75 15.52V8.48L15.5 12l-5.75 3.52z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Somos Bro",
    url: "https://www.linkedin.com/company/somos-bro",
    color: "#0077B5",
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.35-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
      </svg>
    ),
  },
];

function SocialSection() {
  return (
    <section id="redes">
      <div className="container">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:56,gap:24,flexWrap:"wrap"}}>
          <div>
            <FadeUp><span className="eyebrow">Redes sociales</span></FadeUp>
            <FadeUp delay={0.05}>
              <h2 style={{marginTop:16,maxWidth:"20ch"}}>
                Síguenos y ve el trabajo <span className="grad-text">en tiempo real.</span>
              </h2>
            </FadeUp>
          </div>
        </div>
        <div className="social-grid">
          {SOCIAL_NETWORKS.map((net, i) => (
            <FadeUp key={net.name} delay={0.06 + i * 0.07}>
              <a
                href={net.url}
                target="_blank"
                rel="noreferrer"
                className="social-card"
                style={{"--social-color": net.color, "--social-border": net.borderColor || net.color + "44"}}
              >
                <div className="social-card-icon">{net.icon}</div>
                <div className="social-card-body">
                  <div className="social-card-name">{net.name}</div>
                  <div className="social-card-handle">{net.handle}</div>
                </div>
                <svg className="social-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M9 7h8v8"/></svg>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { num: "01", title: "Creación de contenido para empresas", desc: "Producimos contenido estratégico para que tu empresa comunique con claridad, consistencia y autoridad en todos sus canales.", tags: ["Estrategia", "Copy", "Contenido"] },
  { num: "02", title: "Marca personal", desc: "Construimos tu presencia digital como referente. Posicionamiento, voz y contenido para que te conozcan por lo que sabes.", tags: ["Posicionamiento", "Personal brand", "Redes"] },
  { num: "03", title: "Creación de sitios web", desc: "Sitios rápidos, claros y hechos para convertir. Diseño y desarrollo con foco en resultados reales para tu negocio.", tags: ["Diseño", "Desarrollo", "UX/UI"] },
  { num: "04", title: "Branding", desc: "Identidad visual completa para marcas que quieren destacar. Sistema de diseño coherente desde el logo hasta cada pieza gráfica.", tags: ["Identidad", "Visual", "Sistema"] },
  { num: "05", title: "Creación de logos", desc: "Diseñamos el símbolo que va a representar tu marca. Proceso claro, opciones reales y entrega de archivos listos para usar.", tags: ["Logo", "Diseño", "Marca"] },
];

const PORTFOLIO = [
  { brand: "Carolyn San Martín", tag: "Diseño web", img: "assets/portfolio/Carolyn-san-martin-abogada-penalista-sitio-web.png" },
  { brand: "Doctek", tag: "Diseño web", img: "assets/portfolio/sitio-web-doctek-ingenieria-antofagasta.png" },
  { brand: "Pamela Olivares", tag: "Diseño web · Marca personal", img: "assets/portfolio/pamela-olivares-abogada-familia-santiago.png" },
];

/* ----------------------------------------------------------------
   HERO KINETIC — floating words + mouse parallax
   Technique: CSS `translate` (independent of `transform`) handles
   parallax; `transform` stays free for CSS keyframe float/rotate.
   They stack per CSS Transforms Level 2 — zero conflict.
---------------------------------------------------------------- */
function HeroKinetic() {
  const containerRef = useRef(null);

  // [text, top, left, fontSize, color, animClass, dur(s), negDelay(s), speed, opacity]
  // speed: distance from hero center → farther = higher value (0.02–0.08)
  // opacity: 0.25–0.35 for real visual presence
  // Solo 5 palabras visibles en el viewport; el resto posicionadas fuera
  const WORDS = [
    ["Contenido",      "8%",   "4%",    "clamp(14px,1.7vw,25px)", "#ffffff", "hk-a", 14, 0,   0.072, 0.09],
    ["Branding",       "6%",   "60%",   "clamp(11px,1.4vw,20px)", "#ffffff", "hk-b", 11, 1.5, 0.065, 0.08],
    ["Web",            "34%",  "88%",   "clamp(21px,2.7vw,36px)", "#ffffff", "hk-c", 17, 0.8, 0.068, 0.10],
    ["Logos",          "130%", "7%",    "clamp(13px,1.5vw,22px)", "#ffffff", "hk-d", 12, 2.2, 0.063, 0.09],
    ["Reels",          "18%",  "48%",   "clamp(9px,1.1vw,15px)",  "#ffffff", "hk-e", 9,  3.1, 0.028, 0.08],
    ["Estrategia",     "50%",  "-15%",  "clamp(11px,1.3vw,18px)", "#ffffff", "hk-f", 15, 0.3, 0.058, 0.10],
    ["Identidad",      "78%",  "62%",   "clamp(13px,1.6vw,24px)", "#ffffff", "hk-b", 13, 1.8, 0.055, 0.09],
    ["Marca personal", "110%", "70%",   "clamp(9px,1vw,14px)",    "#ffffff", "hk-c", 10, 4.0, 0.038, 0.08],
    ["SEO",            "4%",   "105%",  "clamp(18px,2.2vw,32px)", "#ffffff", "hk-d", 18, 0.6, 0.075, 0.10],
    ["Copy",           "84%",  "42%",   "clamp(15px,2vw,28px)",   "#ffffff", "hk-e", 11, 2.7, 0.048, 0.09],
    ["Video",          "120%", "52%",   "clamp(10px,1.2vw,17px)", "#ffffff", "hk-f", 14, 1.1, 0.022, 0.08],
    ["Social",         "24%",  "110%",  "clamp(12px,1.4vw,20px)", "#ffffff", "hk-a", 16, 3.5, 0.060, 0.09],
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero    = container.closest(".hero");
    const spans   = Array.from(container.querySelectorAll(".hk-word"));
    const speeds  = spans.map(el => parseFloat(el.dataset.speed) || 0.04);

    // Per-word lerp state
    const cur = spans.map(() => ({ x: 0, y: 0 }));
    const tgt = spans.map(() => ({ x: 0, y: 0 }));

    const onMove = (e) => {
      if (!hero) return;
      const r  = hero.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      spans.forEach((_, i) => {
        tgt[i].x = dx * speeds[i];
        tgt[i].y = dy * speeds[i];
      });
    };

    // Restore on mouse leave
    const onLeave = () => {
      spans.forEach((_, i) => { tgt[i].x = 0; tgt[i].y = 0; });
    };

    (hero || window).addEventListener("mousemove", onMove);
    (hero || window).addEventListener("mouseleave", onLeave);

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const SMOOTH = 0.075; // lerp coefficient — ~13 frames to 60% target

    const tick = () => {
      spans.forEach((el, i) => {
        cur[i].x = lerp(cur[i].x, tgt[i].x, SMOOTH);
        cur[i].y = lerp(cur[i].y, tgt[i].y, SMOOTH);
        // `translate` property is separate from `transform` in CSS Transforms L2
        // → stacks on top of keyframe animations without overriding them
        el.style.translate = `${cur[i].x.toFixed(2)}px ${cur[i].y.toFixed(2)}px`;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      (hero || window).removeEventListener("mousemove", onMove);
      (hero || window).removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="hero-kinetic" ref={containerRef} aria-hidden="true">
      {WORDS.map(([text, top, left, fontSize, color, animClass, dur, delay, speed, opacity]) => (
        <span
          key={text}
          className={"hk-word " + animClass}
          data-speed={speed}
          style={{
            top, left, fontSize, color, opacity,
            animationDuration: dur + "s",
            animationDelay: "-" + delay + "s",
            textShadow: `0 0 22px ${color}70, 0 0 44px ${color}30`,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

function GridPortfolio() {
  return (
    <section className="portfolio">
      <div className="container">
        <div className="portfolio-head">
          <div>
            <FadeUp><span className="eyebrow">Portfolio</span></FadeUp>
            <FadeUp delay={0.05}><h2 style={{marginTop:16}}>Trabajo<br/>reciente.</h2></FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <Magnetic><a className="btn btn-ghost" href="portfolio.html">Ver todo<svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg></a></Magnetic>
          </FadeUp>
        </div>
        <div className="portfolio-grid">
          {PORTFOLIO.map((p, i) => (
            <FadeUp key={i} delay={0.08 + i * 0.07} className="portfolio-card-wrap">
              <a href="portfolio.html" className="portfolio-card" style={{"--scroll-dur":"8s"}}>
                <div className="portfolio-card-thumb">
                  <img src={p.img} alt={p.brand} loading="lazy" className="portfolio-card-scroll-img" />
                </div>
                <div className="portfolio-card-overlay">
                  <div className="portfolio-card-overlay-inner">
                    <div className="tag" style={{marginBottom:12}}>{p.tag}</div>
                    <h3 className="portfolio-card-title">{p.brand}</h3>
                    <span className="portfolio-card-cta">Ver proyecto<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginLeft:8}}><path d="M7 17 17 7M9 7h8v8"/></svg></span>
                  </div>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stat: contador animado vanilla ──────────────────────────── */
function CountStat({ to, suffix = "", label }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false, raf, t0 = 0;
    const DURATION = 1800;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const tick = (now) => {
          if (!t0) t0 = now;
          const p = Math.min((now - t0) / DURATION, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return (
    <div className="stat" ref={ref}>
      <span className="stat-num">{val}<span className="suf">{suffix}</span></span>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ── Stat: carousel con fade ──────────────────────────────────── */
function CarouselStat({ items, label }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % items.length);
        setVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(timerRef.current);
  }, [items.length]);
  return (
    <div className="stat">
      <span className="stat-num stat-carousel" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
        {items[idx]}
      </span>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ── Stat: typewriter vanilla ─────────────────────────────────── */
function TypewriterStat({ words, label }) {
  const [text, setText] = useState("");
  const stateRef = useRef({ wordIdx: 0, charIdx: 0, deleting: false });
  useEffect(() => {
    let timeout;
    const WRITE_SPEED = 90, DELETE_SPEED = 55, PAUSE = 1400;
    const tick = () => {
      const s = stateRef.current;
      const word = words[s.wordIdx];
      if (!s.deleting) {
        setText(word.slice(0, s.charIdx + 1));
        s.charIdx++;
        if (s.charIdx === word.length) {
          s.deleting = true;
          timeout = setTimeout(tick, PAUSE);
          return;
        }
        timeout = setTimeout(tick, WRITE_SPEED);
      } else {
        setText(word.slice(0, s.charIdx - 1));
        s.charIdx--;
        if (s.charIdx === 0) {
          s.deleting = false;
          s.wordIdx = (s.wordIdx + 1) % words.length;
        }
        timeout = setTimeout(tick, DELETE_SPEED);
      }
    };
    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="stat">
      <span className="stat-num stat-typewriter">
        {text}<span className="tw-cursor">|</span>
      </span>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ── Sección stats completa ───────────────────────────────────── */
function StatsSection() {
  return (
    <section style={{paddingTop:0,paddingBottom:80}}>
      <div className="container">
        <FadeUp>
          <div className="stats-grid">
            <CountStat to={2018} label="Trabajando contigo" />
            <CountStat to={6} suffix="M+" label="Views generadas" />
            <CarouselStat items={["Salud","Legal","Finanzas","Lifestyle","Educación"]} label="Industrias" />
            <TypewriterStat words={["Santiago","Chile","LATAM"]} label="Dónde operamos" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Home() {
  return (
    <PageTransition>
      <Nav active="index.html" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-blob a" />
        <div className="hero-bg-blob b" />
        <div className="hero-bg-blob c" />
        <HeroKinetic />
        <div className="container" style={{position:"relative",zIndex:1,width:"100%"}}>
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.1}} className="hero-eyebrow">
            <span className="eyebrow">Agencia creativa · Santiago, CL</span>
          </motion.div>
          <RevealHeadline lines={[<span key="l1">Humanizamos</span>, <span key="l2" className="grad-text">marcas.</span>]} delay={0.15} />
          <motion.p
            initial={{opacity:0,y:12}}
            animate={{opacity:1,y:0}}
            transition={{duration:.7,delay:.85}}
            style={{maxWidth:"56ch",fontSize:20,marginTop:32,color:"var(--ink-2)"}}
          >
            Creamos contenido para empresas y marcas que quieren comunicar con claridad y autoridad. Desde Santiago para Chile y LATAM.
          </motion.p>
          <motion.div
            className="hero-cta-row"
            initial={{opacity:0,y:12}}
            animate={{opacity:1,y:0}}
            transition={{duration:.7,delay:1.0}}
          >
            <Magnetic><a className="btn btn-primary" href="contact.html">Empezar un proyecto<svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg></a></Magnetic>
            <Magnetic><a className="btn btn-ghost" href="portfolio.html">Ver el trabajo</a></Magnetic>
          </motion.div>
          <motion.div
            className="hero-meta"
            initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8,delay:1.2}}
          >
            <div className="hero-meta-item">
              <span className="hero-meta-label">Para</span>
              <span className="hero-meta-value">PYMES, startups y marcas que recién despegan en Chile y LATAM.</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Disponibles</span>
              <span className="hero-meta-value">Tomamos 4 proyectos al mes. Quedan 2 cupos para mayo.</span>
            </div>
            <div className="hero-meta-item" style={{textAlign:"right"}}>
              <span className="hero-meta-label">Scroll</span>
              <span className="hero-meta-value">↓</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={[
        { text: "La gente agenda con quien conoce.", dot: "" },
        { text: "Tu cara vale más que tu logo.", dot: "b" },
        { text: "De invisible a inevitable.", dot: "c" },
        { text: "Contenido que conecta, marcas que crecen.", dot: "d" },
      ]} />

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"end",marginBottom:64,gap:24,flexWrap:"wrap"}}>
            <div>
              <FadeUp><span className="eyebrow">Servicios</span></FadeUp>
              <FadeUp delay={0.05}><h2 style={{marginTop:16}}>Lo que <span className="grad-text">hacemos.</span></h2></FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <p style={{maxWidth:"42ch",color:"var(--ink-2)",fontSize:18}}>Cinco especialidades, un solo equipo. Trabajamos en paquete o por servicio — tú eliges.</p>
            </FadeUp>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.num} delay={0.1 + i * 0.07}>
                <a href="services.html" className="service-card">
                  <div className="arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
                  </div>
                  <span className="service-num">{s.num} ·</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="service-tags">
                    {s.tags.map((t) => <span key={t} className="service-tag">{t}</span>)}
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <GridPortfolio />

      {/* STATS */}
      <StatsSection />

      {/* ABOUT TEASER — con esfera 3D y partículas */}
      <AboutSection />

      <GaleriaSection />

      <SocialSection />

      {/* CONTACT TEASER */}
      <section>
        <div className="container">
          <div className="contact-grid">
            <div>
              <FadeUp><span className="eyebrow">Contacto</span></FadeUp>
              <FadeUp delay={0.05}><h2 style={{marginTop:16,maxWidth:"14ch"}}>Cuéntanos en qué andas.</h2></FadeUp>
              <FadeUp delay={0.1}>
                <p style={{maxWidth:"46ch",fontSize:18,marginTop:24}}>Respondemos en menos de 24h. Si el proyecto calza, agendamos un café (presencial o Meet).</p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <div style={{marginTop:32,display:"flex",flexDirection:"column",gap:16,alignItems:"flex-start"}}>
                  <Magnetic strength={0.25}>
                    <a className="btn btn-primary" href="mailto:contacto@somosbro.cl">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:8}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      contacto@somosbro.cl
                    </a>
                  </Magnetic>
                </div>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <form className="contact-form glass" style={{padding:32}} onSubmit={(e)=>{e.preventDefault(); alert("Gracias bro, te escribimos al toque.");}}>
                <div className="field"><label>Tu nombre</label><input type="text" placeholder="Cómo te llamas" required/></div>
                <div className="field"><label>Email</label><input type="email" placeholder="tu@correo.cl" required/></div>
                <div className="field"><label>Servicio</label>
                  <select defaultValue=""><option value="" disabled>¿Qué buscas?</option><option>Estrategia de contenido</option><option>Producción audiovisual</option><option>Social media</option><option>Diseño web</option><option>Todo el paquete</option></select>
                </div>
                <div className="field"><label>Cuéntanos</label><textarea placeholder="Qué marca, qué problema, qué soñái" rows="3"></textarea></div>
                <Magnetic strength={0.2}>
                  <button type="submit" className="btn btn-primary" style={{width:"100%",justifyContent:"center"}}>
                    Enviar
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
                  </button>
                </Magnetic>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </PageTransition>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Home />);
