/* global React, ReactDOM, Nav, Footer, CustomCursor, Magnetic, FadeUp, PageTransition */
const { useState } = React;

const PROJECTS = [
  { brand: "Café Norte", tag: "Branding · Web", year: "2025", color: "linear-gradient(135deg,#491c4b 0%,#d00a5f 100%)", initial: "CN", filter: "branding" },
  { brand: "Estudio Lina", tag: "Audiovisual", year: "2025", color: "linear-gradient(135deg,#206ea6 0%,#491c4b 100%)", initial: "EL", filter: "audiovisual" },
  { brand: "Mantra Yoga", tag: "Social Media", year: "2025", color: "linear-gradient(135deg,#e47204 0%,#d00a5f 100%)", initial: "MY", filter: "social" },
  { brand: "Vinos del Sur", tag: "Branding", year: "2024", color: "linear-gradient(135deg,#2d1230 0%,#206ea6 100%)", initial: "VS", filter: "branding" },
  { brand: "Forma Living", tag: "Web · Content", year: "2024", color: "linear-gradient(135deg,#d00a5f 0%,#f8ac08 100%)", initial: "FL", filter: "web" },
  { brand: "Ruta Patagonia", tag: "Audiovisual", year: "2024", color: "linear-gradient(135deg,#206ea6 0%,#58bba0 100%)", initial: "RP", filter: "audiovisual" },
  { brand: "Casa Maipo", tag: "Web", year: "2024", color: "linear-gradient(135deg,#f8ac08 0%,#e47204 100%)", initial: "CM", filter: "web" },
  { brand: "Alma Pisco", tag: "Branding · Social", year: "2023", color: "linear-gradient(135deg,#491c4b 0%,#206ea6 100%)", initial: "AP", filter: "branding" },
];
const FILTERS = [["all","Todo"],["branding","Branding"],["audiovisual","Audiovisual"],["social","Social"],["web","Web"]];

function Portfolio() {
  const [f, setF] = useState("all");
  const list = f === "all" ? PROJECTS : PROJECTS.filter((p) => p.filter === f);
  return (
    <PageTransition>
      <Nav active="portfolio.html" />
      <header className="page-head">
        <div className="blob" style={{background:"radial-gradient(circle,#206ea6,transparent 70%)"}} />
        <div className="container">
          <FadeUp><span className="eyebrow">Portfolio</span></FadeUp>
          <FadeUp delay={0.05}><h1 style={{marginTop:24}}>Trabajo <span className="grad-text">real.</span></h1></FadeUp>
          <FadeUp delay={0.12}>
            <p style={{maxWidth:"58ch",fontSize:20,marginTop:32,color:"var(--ink-2)"}}>
              Una selección de marcas con las que armamos algo bueno. Click en cualquiera para ver el caso completo (próximamente).
            </p>
          </FadeUp>
        </div>
      </header>

      <section style={{paddingTop:48}}>
        <div className="container">
          <FadeUp>
            <div className="row" style={{marginBottom:48,gap:8}}>
              {FILTERS.map(([k,label]) => (
                <button key={k} onClick={() => setF(k)} className="service-tag" style={{
                  border: f===k ? "1px solid var(--ink)" : "1px solid var(--line-2)",
                  background: f===k ? "var(--ink)" : "transparent",
                  color: f===k ? "var(--bg)" : "var(--ink-2)",
                  padding:"10px 18px", fontSize:13, fontWeight:600
                }}>{label}</button>
              ))}
            </div>
          </FadeUp>
          <div className="work-grid">
            {list.map((p, i) => (
              <FadeUp key={p.brand} delay={i * 0.05}>
                <a className="work-item" href="#">
                  <div className="work-thumb" style={{background:p.color}}>
                    <div className="ph">{p.initial}</div>
                  </div>
                  <div className="work-foot">
                    <div>
                      <h4>{p.brand}</h4>
                      <div className="tag">{p.tag}</div>
                    </div>
                    <span className="year-pill">{p.year}</span>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </PageTransition>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Portfolio />);
