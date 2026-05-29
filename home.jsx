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
function InstagramFeed() {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!INSTAGRAM_TOKEN) {
      setLoading(false);
      setError("no-token");
      return;
    }
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=5&access_token=${INSTAGRAM_TOKEN}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError("api-error"); }
        else { setPosts(data.data || []); }
        setLoading(false);
      })
      .catch(() => { setError("fetch-error"); setLoading(false); });
  }, []);

  const igUrl = "https://www.instagram.com/somos_bro/";

  return (
    <section id="instagram">
      <div className="container">
        <div className="ig-head">
          <div>
            <FadeUp><span className="eyebrow">Instagram</span></FadeUp>
            <FadeUp delay={0.05}>
              <h2 style={{marginTop:16}}>
                Lo último en{" "}
                <a href={igUrl} target="_blank" rel="noreferrer" className="grad-text" style={{textDecoration:"none"}}>
                  @somos_bro
                </a>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.1}>
            <Magnetic>
              <a className="btn btn-ghost" href={igUrl} target="_blank" rel="noreferrer">
                Seguir en Instagram
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
              </a>
            </Magnetic>
          </FadeUp>
        </div>

        {/* ESTADO: cargando */}
        {loading && (
          <div className="ig-grid">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="ig-card ig-skeleton" />
            ))}
          </div>
        )}

        {/* ESTADO: sin token configurado */}
        {!loading && error === "no-token" && (
          <FadeUp>
            <div className="ig-no-token glass">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--magenta)" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="var(--magenta)" stroke="none"/></svg>
              <div>
                <div style={{fontFamily:"var(--font-h)",fontWeight:700,fontSize:18,marginBottom:8}}>Conecta tu cuenta de Instagram</div>
                <div style={{color:"var(--ink-2)",fontSize:14,maxWidth:"52ch"}}>
                  Para mostrar tus posts reales, agrega tu token en <code style={{background:"rgba(255,255,255,.08)",padding:"2px 8px",borderRadius:6,fontSize:13}}>home.jsx</code> → constante <code style={{background:"rgba(255,255,255,.08)",padding:"2px 8px",borderRadius:6,fontSize:13}}>INSTAGRAM_TOKEN</code>.<br/>
                  Ver instrucciones en <strong>INSTAGRAM_SETUP.md</strong>.
                </div>
              </div>
              <a className="btn btn-primary" href={igUrl} target="_blank" rel="noreferrer" style={{flexShrink:0}}>
                Ver perfil ↗
              </a>
            </div>
          </FadeUp>
        )}

        {/* ESTADO: error de API */}
        {!loading && (error === "api-error" || error === "fetch-error") && (
          <FadeUp>
            <div className="ig-no-token glass">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <div>
                <div style={{fontFamily:"var(--font-h)",fontWeight:700,fontSize:18,marginBottom:8}}>No se pudo cargar Instagram</div>
                <div style={{color:"var(--ink-2)",fontSize:14}}>Token vencido o inválido. Genera uno nuevo siguiendo las instrucciones en <strong>INSTAGRAM_SETUP.md</strong>.</div>
              </div>
              <a className="btn btn-ghost" href={igUrl} target="_blank" rel="noreferrer" style={{flexShrink:0}}>Ver perfil ↗</a>
            </div>
          </FadeUp>
        )}

        {/* ESTADO: posts cargados */}
        {!loading && !error && posts.length > 0 && (
          <FadeUp delay={0.1}>
            <div className="ig-grid">
              {posts.map((post, i) => {
                const imgSrc = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
                const caption = post.caption ? post.caption.slice(0, 90) + (post.caption.length > 90 ? "…" : "") : "";
                return (
                  <a key={post.id} href={post.permalink} target="_blank" rel="noreferrer" className="ig-card" style={{animationDelay: i * 0.06 + "s"}}>
                    <img src={imgSrc} alt={caption || "Post de @somos_bro"} loading="lazy" />
                    <div className="ig-overlay">
                      {post.media_type === "VIDEO" && (
                        <div className="ig-play">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      )}
                      {caption && <p className="ig-caption">{caption}</p>}
                      <span className="ig-link">Ver en Instagram ↗</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </FadeUp>
        )}
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
  { brand: "Café Norte", tag: "Branding · Web", color: "linear-gradient(135deg,#491c4b 0%,#d00a5f 100%)", initial: "CN" },
  { brand: "Estudio Lina", tag: "Audiovisual", color: "linear-gradient(135deg,#206ea6 0%,#491c4b 100%)", initial: "EL" },
  { brand: "Mantra Yoga", tag: "Social Media", color: "linear-gradient(135deg,#e47204 0%,#d00a5f 100%)", initial: "MY" },
  { brand: "Vinos del Sur", tag: "Branding", color: "linear-gradient(135deg,#2d1230 0%,#206ea6 100%)", initial: "VS" },
  { brand: "Forma Living", tag: "Web · Content", color: "linear-gradient(135deg,#d00a5f 0%,#f8ac08 100%)", initial: "FL" },
  { brand: "Ruta Patagonia", tag: "Audiovisual", color: "linear-gradient(135deg,#206ea6 0%,#58bba0 100%)", initial: "RP" },
];

function HorizontalPortfolio() {
  const wrap = useRef(null);
  const track = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-46%"]);
  return (
    <section className="portfolio" ref={wrap}>
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
      </div>
      <div className="portfolio-track-wrap" data-drag>
        <motion.div className="portfolio-track" ref={track} style={{ x }}>
          {PORTFOLIO.map((p, i) => (
            <a key={i} href="portfolio.html" className="portfolio-card" style={{ background: p.color }}>
              <div className="ph">{p.initial}</div>
              <div className="meta">
                <div>
                  <div className="tag">{p.tag}</div>
                  <h4 style={{marginTop:6}}>{p.brand}</h4>
                </div>
                <span className="pill">2025 ↗</span>
              </div>
            </a>
          ))}
        </motion.div>
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
        { text: "Contenido que se ve", dot: "" },
        { text: "Branding con vibra", dot: "b" },
        { text: "Sitios que venden", dot: "c" },
        { text: "Real talk, real results", dot: "d" },
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

      <HorizontalPortfolio />

      {/* STATS */}
      <section style={{paddingTop:0,paddingBottom:80}}>
        <div className="container">
          <FadeUp>
            <div className="stats-grid">
              <div className="stat"><StatNumber to={120} suffix="+" /><div className="stat-label">Proyectos entregados</div></div>
              <div className="stat"><StatNumber to={48} /><div className="stat-label">Marcas activas</div></div>
              <div className="stat"><StatNumber to={6} suffix="M+" /><div className="stat-label">Views generadas</div></div>
              <div className="stat"><StatNumber to={2018} /><div className="stat-label">Año uno</div></div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section>
        <div className="container">
          <div style={{maxWidth:"72ch"}}>
            <FadeUp><span className="eyebrow">Quiénes somos</span></FadeUp>
            <FadeUp delay={0.05}><h2 style={{marginTop:16}}>Agencia creativa <span className="grad-text">con foco en resultados.</span></h2></FadeUp>
            <FadeUp delay={0.1}>
              <p style={{fontSize:18,marginTop:24,lineHeight:1.65}}>
                Somos una agencia creativa con base en Santiago, Chile. Trabajamos con empresas y marcas que quieren comunicar mejor — con contenido que genera autoridad, identidades que se recuerdan y sitios web que convierten. Sin rodeos, sin relleno. Solo trabajo bien hecho.
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div style={{marginTop:32}}>
                <Magnetic><a className="btn btn-ghost" href="about.html">Conocer más<svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg></a></Magnetic>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <InstagramFeed />

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
                    <a className="wa-btn" href="https://wa.me/56900000000" target="_blank" rel="noreferrer">
                      <svg className="wa-icon" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3 9 3 16c0 2.4.7 4.7 2 6.7L3 29l6.5-2C11.4 28 13.7 28.7 16 28.7c7 0 13-6 13-13S23 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.8-1.7l-.4-.2-3.9 1.2 1.2-3.8-.3-.4C5.5 19.8 5 17.9 5 16c0-6 5-11 11-11s11 5 11 11-5 11-11 11zm6-8.2c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.8.2s-.9 1.1-1.1 1.3c-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.6.1-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.4c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.6-.5z"/></svg>
                      Hablar por WhatsApp
                    </a>
                  </Magnetic>
                  <a href="mailto:contacto@somosbro.cl" style={{fontSize:18,color:"var(--ink-2)"}}>contacto@somosbro.cl ↗</a>
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
