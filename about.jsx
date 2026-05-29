/* global React, ReactDOM, Nav, Footer, CustomCursor, Magnetic, FadeUp, StatNumber, PageTransition */

const VALUES = [
  { t: "Sin BS.", d: "Decimos las cosas como son. Si tu idea no funciona, te lo decimos. Si necesitamos más plata, te lo decimos." },
  { t: "Trabajo de standard alto.", d: "Mismo nivel para PYMES que para corporativos. La marca no debería costarte el doble por el logo." },
  { t: "Equipo, no fábrica.", d: "Trabajamos contigo, no para ti. Un proyecto lo lleva una persona del equipo de inicio a fin." },
  { t: "Resultados, no promesas.", d: "Métricas claras, reportes mensuales, conversaciones honestas. Sin gráficos bonitos que no significan nada." },
];

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

      {/* VALUES */}
      <section>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:80,alignItems:"start"}}>
            <div>
              <FadeUp><span className="eyebrow">Cómo trabajamos</span></FadeUp>
              <FadeUp delay={0.05}><h2 style={{marginTop:16,maxWidth:"12ch"}}>Cuatro reglas, <span className="grad-text">cero excusas.</span></h2></FadeUp>
            </div>
            <div style={{display:"grid",gap:24}}>
              {VALUES.map((v, i) => (
                <FadeUp key={v.t} delay={i * 0.06}>
                  <div className="glass" style={{padding:32}}>
                    <h3 style={{fontSize:24}}>{v.t}</h3>
                    <p style={{marginTop:12}}>{v.d}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section>
        <div className="container">
          <FadeUp>
            <div className="stats-grid">
              <div className="stat"><StatNumber to={2018} /><div className="stat-label">Año uno</div></div>
              <div className="stat"><StatNumber to={120} suffix="+" /><div className="stat-label">Proyectos</div></div>
              <div className="stat"><StatNumber to={48} /><div className="stat-label">Marcas activas</div></div>
              <div className="stat"><StatNumber to={9} /><div className="stat-label">Personas en el equipo</div></div>
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
