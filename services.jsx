/* global React, ReactDOM, Nav, Footer, CustomCursor, Magnetic, FadeUp, RevealHeadline, PageTransition */

/* ── Claqueta de cine — ilustración CSS pura ─────────────────── */
function Clapperboard() {
  return (
    <div className="clap-outer" aria-hidden="true">
      <div className="clap-inner">
        <div className="clap">

          {/* Brazo superior — pieza que golpea */}
          <div className="clap-arm">
            <div className="clap-arm-hinge" />
          </div>

          {/* Cuerpo principal */}
          <div className="clap-body">

            {/* Banda de rayas diagonales en el tope del cuerpo */}
            <div className="clap-body-stripe" />

            {/* Área de información */}
            <div className="clap-info">
              <div className="clap-row">
                <span className="clap-label">PROD.</span>
                <span className="clap-val">SOMOS BRO</span>
              </div>
              <div className="clap-divider" />
              <div className="clap-row">
                <span className="clap-label">DIR.</span>
                <span className="clap-val">SANTIAGO, CL</span>
              </div>
              <div className="clap-divider" />
              <div className="clap-bottom">
                <div className="clap-cell">
                  <span className="clap-label">SCENE</span>
                  <span className="clap-val">01</span>
                </div>
                <div className="clap-cell">
                  <span className="clap-label">TAKE</span>
                  <span className="clap-val">∞</span>
                </div>
                <div className="clap-cell">
                  <span className="clap-label">ROLL</span>
                  <span className="clap-val">2025</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  { num: "01", id: "contenido", title: "Creación de contenido para empresas",
    desc: "Producimos contenido estratégico para que tu empresa comunique con claridad, consistencia y autoridad en todos sus canales digitales.",
    deliverables: ["Estrategia y calendario editorial", "Copy para redes y web", "Contenido para LinkedIn, IG y TikTok", "Reporte mensual de resultados"] },
  { num: "02", id: "marca-personal", title: "Marca personal",
    desc: "Construimos tu presencia digital como referente en tu industria. Posicionamiento, voz propia y contenido para que te conozcan por lo que sabes.",
    deliverables: ["Definición de posicionamiento", "Estrategia de contenido personal", "Gestión de redes y comunidad", "Sesiones de fotos y video"] },
  { num: "03", id: "web", title: "Creación de sitios web",
    desc: "Sitios rápidos, claros y hechos para convertir. Diseñamos y desarrollamos con foco en resultados reales para tu negocio.",
    deliverables: ["Diseño UX/UI", "Desarrollo en Webflow, Shopify o WordPress", "SEO técnico + analítica", "Soporte y capacitación"] },
  { num: "04", id: "branding", title: "Branding",
    desc: "Identidad visual completa para marcas que quieren destacar. Sistema de diseño coherente desde el concepto hasta cada pieza gráfica.",
    deliverables: ["Investigación y conceptualización", "Sistema de identidad visual", "Manual de marca", "Aplicaciones y piezas gráficas"] },
  { num: "05", id: "logos", title: "Creación de logos",
    desc: "Diseñamos el símbolo que va a representar tu marca. Proceso claro, propuestas reales y entrega de archivos listos para usar en cualquier soporte.",
    deliverables: ["Una identidad visual que genera confianza antes de que hablen contigo", "Tu marca reconocible en Instagram, tu tarjeta y tu letrero", "Deja de parecer improvisado — proyecta profesionalismo desde el logo", "Archivos listos para usar en todos los formatos y soportes"] },
];

function Services() {
  return (
    <PageTransition>
      <Nav active="services.html" />
      <header className="page-head">
        <div className="blob" style={{background:"radial-gradient(circle,#d00a5f,transparent 70%)"}} />
        <div className="container">
          <div className="services-head-split">
            {/* Texto izquierda */}
            <div>
              <FadeUp><span className="eyebrow">Servicios</span></FadeUp>
              <FadeUp delay={0.05}><h1 style={{marginTop:24,maxWidth:"14ch"}}>Cinco especialidades. <span className="grad-text">Un equipo.</span></h1></FadeUp>
              <FadeUp delay={0.12}>
                <p style={{maxWidth:"52ch",fontSize:20,marginTop:32,color:"var(--ink-2)"}}>
                  Trabajamos en paquete o por servicio. Si tu marca necesita estrategia, contenido y sitio web, lo hacemos todo bajo un solo brief — sin pasarte de proveedor en proveedor.
                </p>
              </FadeUp>
            </div>
            {/* Claqueta CSS derecha */}
            <FadeUp delay={0.2}>
              <Clapperboard />
            </FadeUp>
          </div>
        </div>
      </header>

      <section style={{paddingTop:0}}>
        <div className="container">
          {SERVICES.map((s) => (
            <FadeUp key={s.num}>
              <div className="svc-row" id={s.id}>
                <div className="num">{s.num}</div>
                <div><h3>{s.title}</h3></div>
                <div className="body">
                  <p>{s.desc}</p>
                  <ul>{s.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section>
        <div className="container">
          <FadeUp>
            <div className="glass" style={{padding:"56px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:32,flexWrap:"wrap"}}>
              <div>
                <h2 style={{fontSize:"clamp(28px,3.5vw,44px)",maxWidth:"16ch"}}>¿Listos para empezar?</h2>
                <p style={{marginTop:12,maxWidth:"42ch"}}>Te respondemos en menos de 24h con propuesta y costos.</p>
              </div>
              <Magnetic>
                <a className="btn btn-primary" href="contact.html">Cotizar
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
                </a>
              </Magnetic>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </PageTransition>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Services />);
