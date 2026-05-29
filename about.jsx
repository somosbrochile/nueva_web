import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { CustomCursor, Magnetic, FadeUp, StatNumber, Nav, Footer, PageTransition } from './site.jsx'
import './styles.css'

/* ── Carousel de texto con fade suave ──────────────────────────
   Rota entre palabras cada 2s. Fade out 320ms → cambia → fade in.
────────────────────────────────────────────────────────────── */
function TextCarousel({ words }) {
  const [idx,  setIdx]  = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const VISIBLE = 2000;   // ms visible
    const FADE    = 320;    // ms transición

    const id = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % words.length);
        setShow(true);
      }, FADE);
    }, VISIBLE + FADE);

    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span
      className="stat-num stat-text"
      style={{ opacity: show ? 1 : 0, transition: "opacity 0.32s ease" }}
    >
      {words[idx]}
    </span>
  );
}

/* ── Typewriter — escribe, pausa, borra, siguiente palabra ─────
   Usa ref para estado interno → evita closures stale sin deps.
────────────────────────────────────────────────────────────── */
function Typewriter({ words }) {
  const [display, setDisplay] = useState(words[0][0]); // arranca con 1 char
  const state = useRef({ wi: 0, del: false });

  useEffect(() => {
    const { wi, del } = state.current;
    const target = words[wi];
    let t;

    if (!del) {
      if (display.length < target.length) {
        // Escribiendo
        t = setTimeout(() => setDisplay(target.slice(0, display.length + 1)), 85);
      } else {
        // Pausa al completar la palabra
        t = setTimeout(() => {
          state.current.del = true;
          setDisplay(d => d.slice(0, -1));
        }, 1600);
      }
    } else {
      if (display.length > 0) {
        // Borrando
        t = setTimeout(() => setDisplay(d => d.slice(0, -1)), 50);
      } else {
        // Siguiente palabra
        state.current = { wi: (wi + 1) % words.length, del: false };
        t = setTimeout(() => setDisplay(words[state.current.wi][0]), 280);
      }
    }

    return () => clearTimeout(t);
  }, [display, words]);

  return (
    <span className="stat-num stat-text">
      {display}<span className="tw-cursor">|</span>
    </span>
  );
}

/* ── Cohetes orbitales en canvas ───────────────────────────────
   Trayectoria elíptica con sin/cos.
   Rotación dinámica apuntando en dirección del movimiento.
   Estela degradé sólido → transparente (estrella fugaz).
   Opacidad baja + blur para efecto de lejanía atmosférica.
────────────────────────────────────────────────────────────── */
function RocketCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const ROCKETS = [
      // cx_r, cy_r, rx_r, ry_r, period,  phase, size, opacity, blur, color
      [ 0.50,  0.50, 0.42, 0.36, 42000, 0.00, 17, 0.15, 0.8, "#f8ac08" ],
      [ 0.45,  0.50, 0.35, 0.28, 38000, 0.20, 13, 0.10, 1.0, "#58bba0" ],
      [ 0.55,  0.50, 0.40, 0.32, 47000, 0.42, 19, 0.12, 0.6, "#ffffff" ],
      [ 0.50,  0.48, 0.30, 0.22, 35000, 0.65, 15, 0.08, 1.0, "#d00a5f" ],
      [ 0.50,  0.52, 0.38, 0.26, 50000, 0.80, 12, 0.18, 0.7, "#f8ac08" ],
    ];
    const TRAIL = 28;
    const trails = ROCKETS.map(() => []);

    let W = 0, H = 0;
    const resize = () => {
      const p = canvas.parentElement;
      if (!p) return;
      W = canvas.width  = p.offsetWidth;
      H = canvas.height = p.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    let lastSY    = window.scrollY;
    let scrollVel = 0;
    let lastTime  = performance.now();

    function drawRocketShape(ctx, s, color) {
      const bL = -s * 0.50, bR = s * 0.30, br = s * 0.27;
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.arc(bL, 0, br, Math.PI / 2, -Math.PI / 2, true);
      ctx.lineTo(bR, -br);
      ctx.arc(bR, 0, br, -Math.PI / 2, Math.PI / 2, false);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(bR, -br * 0.72);
      ctx.lineTo(s * 0.72, 0);
      ctx.lineTo(bR,  br * 0.72);
      ctx.closePath();
      ctx.fill();

      [[1], [-1]].forEach(([sign]) => {
        ctx.beginPath();
        ctx.moveTo(bL + s * 0.12,  sign * br);
        ctx.lineTo(bL - s * 0.08,  sign * br * 2.1);
        ctx.lineTo(bL + s * 0.30,  sign * br);
        ctx.closePath();
        ctx.fill();
      });

      ctx.beginPath();
      ctx.arc(s * 0.04, 0, br * 0.42, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.20)";
      ctx.fill();
    }

    let raf;
    const TWO_PI = Math.PI * 2;

    const tick = (now) => {
      const dt  = Math.min(now - lastTime, 50);
      lastTime  = now;

      const sy   = window.scrollY;
      scrollVel  = (sy - lastSY) / Math.max(dt, 1);
      lastSY     = sy;
      const mult = 1 + Math.abs(scrollVel) * 0.10;

      ctx.clearRect(0, 0, W, H);

      ROCKETS.forEach((r, i) => {
        const [cx_r, cy_r, rx_r, ry_r, period,, size, opacity, blur, color] = r;

        r[5] += (dt / period) * mult;
        if (r[5] >= 1) r[5] -= 1;
        const phase = r[5];

        const a     = TWO_PI * phase;
        const RX    = W * rx_r;
        const RY    = H * ry_r;
        const cx    = W * cx_r;
        const cy    = H * cy_r;
        const x     = cx + RX * Math.cos(a);
        const y     = cy + RY * Math.sin(a);

        const tdx   = -RX * Math.sin(a);
        const tdy   =  RY * Math.cos(a);
        const angle = Math.atan2(tdy, tdx);

        trails[i].push({ x, y });
        if (trails[i].length > TRAIL) trails[i].shift();

        ctx.save();
        ctx.filter = `blur(${blur}px)`;

        const trail = trails[i];
        for (let j = 1; j < trail.length; j++) {
          const ratio = j / trail.length;
          ctx.globalAlpha = ratio * opacity * 1.8;
          ctx.lineWidth   = ratio * size * 0.18;
          ctx.strokeStyle = color;
          ctx.lineCap     = "round";
          ctx.beginPath();
          ctx.moveTo(trail[j - 1].x, trail[j - 1].y);
          ctx.lineTo(trail[j].x,     trail[j].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        ctx.globalAlpha = opacity;
        ctx.translate(x, y);
        ctx.rotate(angle);
        drawRocketShape(ctx, size, color);

        ctx.restore();
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="rocket-canvas" />;
}

const VALUES = [
  {
    t:        "Tu inversión, protegida.",
    d:        "Si algo no va a funcionar, te lo decimos antes de cobrarlo. Sin sorpresas, sin letra chica.",
    gradFrom: "#f8ac08", gradTo: "#e47204", glowColor: "#f8ac08",
  },
  {
    t:        "Resultados medibles, no likes vacíos.",
    d:        "Métricas que importan: agendamientos, consultas, ventas. No seguidores que no compran.",
    gradFrom: "#e47204", gradTo: "#d00a5f", glowColor: "#e47204",
  },
  {
    t:        "Tu tiempo vale.",
    d:        "El mal del emprendedor es querer hacerlo todo. Nosotros existimos para que crear contenido deje de ser tu carga y empiece a ser tu mayor ventaja competitiva.",
    gradFrom: "#d00a5f", gradTo: "#491c4b", glowColor: "#d00a5f",
  },
  {
    t:        "Tu marca, a otro nivel.",
    d:        "Contenido, branding y web que hacen que tu cliente diga 'quiero trabajar con ellos' antes de escribirte.",
    gradFrom: "#491c4b", gradTo: "#206ea6", glowColor: "#206ea6",
  },
];

function ValueCard({ t, d, gradFrom, gradTo, glowColor, delay }) {
  const glowRef = useRef(null);

  const onMove = (e) => {
    if (!glowRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    glowRef.current.style.background =
      `radial-gradient(circle 220px at ${x}% ${y}%, ${glowColor}30 0%, transparent 65%)`;
    glowRef.current.style.opacity = "1";
  };

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <FadeUp delay={delay}>
      <div
        className="value-wrap"
        style={{"--vg-from": gradFrom, "--vg-to": gradTo}}
      >
        <div className="value-card glass" onMouseMove={onMove} onMouseLeave={onLeave}>
          <div ref={glowRef} className="value-glow" />
          <h3 className="value-title">{t}</h3>
          <p  className="value-desc">{d}</p>
        </div>
      </div>
    </FadeUp>
  );
}

function About() {
  return (
    <PageTransition>
      <Nav active="about.html" />
      <header className="page-head">
        <div className="blob" style={{background:"radial-gradient(circle,#e47204,transparent 70%)"}} />
        <div className="container">
          <FadeUp><span className="eyebrow">Nosotros</span></FadeUp>
          <FadeUp delay={0.05}><h1 style={{marginTop:24,maxWidth:"15ch"}}>Agencia creativa. <span className="grad-text">Foco en resultados.</span></h1></FadeUp>
          <FadeUp delay={0.12}>
            <p style={{maxWidth:"60ch",fontSize:20,marginTop:32,color:"var(--ink-2)"}}>
              Somos una agencia creativa con base en Santiago, Chile. Trabajamos con empresas y marcas que quieren comunicar mejor — con contenido que genera autoridad, identidades que se recuerdan y sitios web que convierten. Sin rodeos, sin relleno. Solo trabajo bien hecho.
            </p>
          </FadeUp>
        </div>
      </header>

      {/* VALORES */}
      <section>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:80,alignItems:"start"}}>
            <div>
              <FadeUp><span className="eyebrow">Así trabajamos</span></FadeUp>
              <FadeUp delay={0.05}>
                <h2 style={{marginTop:16,maxWidth:"14ch"}}>
                  Así trabajamos <span className="grad-text">tu marca.</span>
                </h2>
              </FadeUp>
            </div>
            <div style={{display:"grid",gap:20}}>
              {VALUES.map((v, i) => (
                <ValueCard
                  key={v.t}
                  t={v.t}
                  d={v.d}
                  gradFrom={v.gradFrom}
                  gradTo={v.gradTo}
                  glowColor={v.glowColor}
                  delay={i * 0.07}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{position:"relative", overflow:"hidden"}}>
        <RocketCanvas />
        <div className="container" style={{position:"relative", zIndex:1}}>
          <FadeUp>
            <div className="stats-grid">

              {/* 1 — Año desde */}
              <div className="stat">
                <StatNumber to={2018} />
                <div className="stat-label">Trabajando contigo</div>
              </div>

              {/* 2 — Views */}
              <div className="stat">
                <StatNumber to={6} suffix="M+" />
                <div className="stat-label">Views generadas</div>
              </div>

              {/* 3 — Carousel industrias */}
              <div className="stat">
                <TextCarousel words={["Salud","Legal","Finanzas","Lifestyle","Educación"]} />
                <div className="stat-label">Industrias</div>
              </div>

              {/* 4 — Typewriter ubicación */}
              <div className="stat">
                <Typewriter words={["Santiago","Chile","LATAM"]} />
                <div className="stat-label">Dónde operamos</div>
              </div>

            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </PageTransition>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<About />);
