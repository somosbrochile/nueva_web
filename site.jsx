/* global React, ReactDOM */
const FM = window.framerMotion || window.Motion || window.motion;
window.framerMotion = FM;
const { useEffect, useRef, useState, useCallback, createContext, useContext } = React;
const { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } = FM;

/* ------------------------------------------------------------------
   1. CUSTOM CURSOR — portal-based, always visible
   Rendered directly into document.body via createPortal so that
   position:fixed is never broken by parent transform/stacking contexts
   (Framer Motion, page-enter animation, etc.)
   ------------------------------------------------------------------ */
function CustomCursor() {
  useEffect(() => {
    // Create elements directly in body — completely outside React's tree
    const dot  = document.createElement("div");
    const ring = document.createElement("div");
    dot.className  = "cursor-dot";
    ring.className = "cursor-ring";
    // Start off-screen and invisible; revealed on first mousemove
    dot.style.opacity  = "0";
    ring.style.opacity = "0";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx=0, my=0, dx=0, dy=0, rx=0, ry=0, primed=false, raf=null;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (!primed) {
        // Snap to position immediately on first move (no lerp lag)
        dx = mx; dy = my; rx = mx; ry = my;
        primed = true;
      }
    };

    const onOver = (e) => {
      const isDrag  = !!e.target.closest("[data-drag]");
      const isHover = !!e.target.closest("a, button, [data-magnetic], input, textarea, select");
      if (isDrag) {
        dot.className  = "cursor-dot is-drag";
        ring.className = "cursor-ring is-drag";
      } else if (isHover) {
        dot.className  = "cursor-dot is-hover";
        ring.className = "cursor-ring is-hover";
      } else {
        dot.className  = "cursor-dot";
        ring.className = "cursor-ring";
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    const tick = () => {
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      dot.style.transform  = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;

      // Opacity forced to 1 every frame once primed — immune to CSS cascade
      if (primed) {
        dot.style.opacity  = "1";
        ring.style.opacity = "1";
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      dot.remove();
      ring.remove();
    };
  }, []);

  // Nothing rendered into React's vDOM — elements live directly in body
  return null;
}

/* ------------------------------------------------------------------
   2. MAGNETIC BUTTON — translate towards cursor when near
   ------------------------------------------------------------------ */
function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const tx = useRef(0), ty = useRef(0);
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const tick = () => {
    cur.current.x += (tx.current - cur.current.x) * 0.18;
    cur.current.y += (ty.current - cur.current.y) * 0.18;
    if (ref.current) ref.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px)`;
    if (Math.abs(tx.current - cur.current.x) > 0.1 || Math.abs(ty.current - cur.current.y) > 0.1) {
      raf.current = requestAnimationFrame(tick);
    } else { raf.current = null; }
  };
  const ensureTick = () => { if (!raf.current) raf.current = requestAnimationFrame(tick); };
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    tx.current = (e.clientX - (r.left + r.width / 2)) * strength;
    ty.current = (e.clientY - (r.top + r.height / 2)) * strength;
    ensureTick();
  };
  const onLeave = () => { tx.current = 0; ty.current = 0; ensureTick(); };
  useEffect(() => () => raf.current && cancelAnimationFrame(raf.current), []);
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      data-magnetic
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------
   3. REVEAL ON SCROLL — fade-up + slide-in primitives
   ------------------------------------------------------------------ */
function FadeUp({ children, delay = 0, y = 16, className = "", as = "div" }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Comp>
  );
}

/* Word-by-word headline reveal with mask */
function RevealHeadline({ lines, delay = 0 }) {
  return (
    <h1>
      {lines.map((line, li) => (
        <span key={li} className="reveal-line">
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1], delay: delay + li * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* ------------------------------------------------------------------
   4. STATS COUNTER
   ------------------------------------------------------------------ */
function StatNumber({ to, suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf, started=false, t0=0;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        const tick = (now) => {
          if (!t0) t0 = now;
          const p = Math.min((now - t0) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref} className="stat-num">{val}<span className="suf">{suffix}</span></span>;
}

/* ------------------------------------------------------------------
   5. HEADER NAV — page-aware active state, scroll-aware bg
   ------------------------------------------------------------------ */
function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Home", "index.html"],
    ["Services", "services.html"],
    ["Portfolio", "portfolio.html"],
    ["Nosotros", "about.html"],
    ["Contact", "contact.html"],
  ];
  return (
    <header className="nav-wrapper">
      <div className={"nav-island" + (scrolled ? " is-scrolled" : "")}>
        <a href="index.html" className="nav-logo" aria-label="Somos Bro · home">
          <img src="../assets/logo-somosbro-white.png" alt="Somos Bro" style={{height:30,width:"auto"}} />
        </a>
        <nav className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href} className={"nav-link" + (active === href ? " is-active" : "")}>{label}</a>
          ))}
        </nav>
        <Magnetic strength={0.25}>
          <a className="btn btn-primary" href="contact.html" style={{padding:"10px 18px",fontSize:13}}>
            Hablemos
            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
          </a>
        </Magnetic>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
   6. FOOTER — shared across pages
   ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <FadeUp>
            <div className="footer-cta">
              ¿Listos para <span className="grad-text">crear</span>?
            </div>
            <div className="row" style={{marginTop:32}}>
              <Magnetic><a className="btn btn-primary" href="contact.html">Empezar un proyecto<svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg></a></Magnetic>
              <Magnetic><a className="btn btn-ghost" href="mailto:contacto@somosbro.cl">Escribir un correo</a></Magnetic>
            </div>
          </FadeUp>
          <div className="footer-cols">
            <div className="footer-col"><h5>Estudio</h5>
              <a href="about.html">Nosotros</a>
              <a href="services.html">Servicios</a>
              <a href="portfolio.html">Portfolio</a>
              <a href="contact.html">Contacto</a>
            </div>
            <div className="footer-col"><h5>Servicios</h5>
              <a href="services.html">Creación de contenido</a>
              <a href="services.html">Marca personal</a>
              <a href="services.html">Diseño web</a>
              <a href="services.html">Branding</a>
              <a href="services.html">Logos</a>
            </div>
            <div className="footer-col"><h5>Síguenos</h5>
              <a href="https://www.instagram.com/somos_bro/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="https://www.tiktok.com/@somos.bro" target="_blank" rel="noreferrer">TikTok ↗</a>
              <a href="https://www.linkedin.com/company/somos-bro" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://www.youtube.com/@somosbro" target="_blank" rel="noreferrer">YouTube ↗</a>
            </div>
          </div>
        </div>
        <div className="footer-bot">
          <span>© 2026 Somos Bro · Santiago, CL</span>
          <span>Hecho con 🤘🏼 desde Santiago</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------
   7. PAGE TRANSITION WRAPPER — fade + slide on first paint
   ------------------------------------------------------------------ */
function PageTransition({ children }) {
  return <div className="page-enter">{children}</div>;
}

/* ------------------------------------------------------------------
   Marquee strip — looping word band
   ------------------------------------------------------------------ */
function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((it, i) => (
          <span key={i} className="marquee-item">
            <span>{it.text}</span>
            <span className={"dot " + it.dot}></span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* expose */
Object.assign(window, {
  CustomCursor, Magnetic, FadeUp, RevealHeadline, StatNumber, Nav, Footer, PageTransition, Marquee
});
