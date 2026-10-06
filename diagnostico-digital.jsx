import React from 'react'
import ReactDOM from 'react-dom/client'
import { CustomCursor, Magnetic, FadeUp, Nav, Footer, PageTransition } from './site.jsx'
import './styles.css'
import './diagnostico.css'

const Arrow = () => (
  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
);

const PILLARS = [
  { num: "01", title: "Sitio web",
    desc: "Revisamos velocidad de carga, estructura SEO, claridad del mensaje, llamados a la acción y si el sitio está diseñado para generar consultas o solo para existir. Identificamos los cambios que más impacto tienen en conversión.",
    tags: ["SEO", "Velocidad", "Conversión", "Mensajes"] },
  { num: "02", title: "Redes sociales",
    desc: "Analizamos consistencia visual, frecuencia de publicación, tipo de contenido, tono de comunicación y si tus perfiles generan confianza en el cliente que quieres atraer.",
    tags: ["Instagram", "LinkedIn", "TikTok", "Consistencia"] },
  { num: "03", title: "Branding e identidad",
    desc: "Evaluamos si tu logo, paleta de colores, tipografía y tono de comunicación están alineados entre sí y si generan confianza en tu cliente ideal o mandan señales mixtas.",
    tags: ["Logo", "Colores", "Tono", "Coherencia"] },
];

const STEPS = [
  { num: "01", title: "Agendas la reunión",
    desc: "Elige el día y la hora que más te acomode. Sin formularios largos ni esperas de 72 horas." },
  { num: "02", title: "Sesión de 60 minutos",
    desc: "Revisamos en vivo tu sitio, tus redes y tu identidad visual. Tú explicas tu contexto, nosotros identificamos los problemas reales." },
  { num: "03", title: "Recibes el reporte",
    desc: "En 48 horas tienes un documento con diagnóstico, prioridades y pasos concretos. El reporte es tuyo aunque no contrates nada." },
];

const WHO = [
  { color: "var(--orange)",  title: "Tienes una pyme en Chile", desc: "Con presencia digital activa, pero sin claridad de si está funcionando." },
  { color: "var(--magenta)", title: "Eres profesional independiente", desc: "Abogado, consultor, médico, coach: alguien que vive de su reputación digital." },
  { color: "var(--blue)",    title: "Estás lanzando o relanzando", desc: "Antes de invertir en publicidad quieres saber si tu base está sólida." },
  { color: "var(--yellow)",  title: "Sientes que algo no funciona", desc: "Tienes presencia digital, pero no genera consultas, ventas ni confianza." },
];

const FAQ = [
  { q: "¿Cuánto cuesta el diagnóstico digital para pymes?",
    a: "La primera sesión es sin costo. Si después decides implementar los cambios con Somos Bro, conversamos una propuesta a la medida de lo que necesitas." },
  { q: "¿Qué incluye exactamente el diagnóstico?",
    a: "Cubre tres áreas: sitio web (SEO, velocidad, conversión y mensajes), redes sociales (consistencia, contenido y comunidad) e identidad de marca (logo, colores, tipografía y tono). Incluye una sesión de 60 minutos y un reporte escrito entregado en 48 horas." },
  { q: "¿El diagnóstico se puede hacer de forma remota?",
    a: "Sí. La mayoría de las sesiones se hacen por Google Meet. También ofrecemos sesiones presenciales en Santiago para empresas que prefieren el cara a cara." },
  { q: "¿Para qué tipo de empresas es este servicio?",
    a: "Está diseñado para pymes, startups y profesionales independientes en Chile que ya tienen presencia digital, pero no saben si está funcionando. Si tienes un sitio web y redes sociales activas, el diagnóstico tiene valor para ti." },
  { q: "¿Qué pasa si no quiero contratar nada después?",
    a: "El reporte es tuyo de todas formas. No hay presión de venta ni seguimiento no solicitado. Si el diagnóstico te ayuda y quieres seguir trabajando con nosotros, bien. Si no, también." },
  { q: "¿Cuántos cupos hay disponibles por semana?",
    a: "Tenemos disponibilidad limitada para mantener la calidad de cada diagnóstico. Si no encuentras horario, escríbenos a contacto@somosbro.cl y te buscamos un cupo." },
];

function Diagnostico() {
  return (
    <PageTransition>
      <Nav active="/servicios" />

      {/* HERO */}
      <header className="page-head dx-head">
        <div className="blob" style={{background:"radial-gradient(circle,#d00a5f,transparent 70%)"}} />
        <div className="blob" style={{background:"radial-gradient(circle,#206ea6,transparent 70%)", top:"auto", bottom:-220, right:"auto", left:-160, opacity:.25}} />
        <div className="container">
          <FadeUp><span className="eyebrow">Diagnóstico digital · Santiago, CL</span></FadeUp>
          <FadeUp delay={0.05}>
            <h1 style={{marginTop:24}}>¿Tu empresa se&nbsp;ve<br /><span className="grad-text">como lo que vale?</span></h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="dx-sub">
              Revisamos tu sitio web, tus redes sociales y tu identidad de marca en una sola sesión.
              Te entregamos un reporte con todo lo que está fallando y cómo arreglarlo.
              Sin tecnicismos. Sin venta disfrazada de consultoría.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div className="dx-badges">
              <span className="dx-badge">60 min de sesión</span>
              <span className="dx-badge">Reporte escrito en 48h</span>
              <span className="dx-badge">Primera sesión sin costo</span>
              <span className="dx-badge">Presencial o Google Meet</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="row">
              <Magnetic>
                <a className="btn btn-primary" href="/contacto">Agendar diagnóstico gratuito <Arrow /></a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" href="#como-funciona">¿Cómo funciona?</a>
              </Magnetic>
            </div>
          </FadeUp>
        </div>
      </header>

      {/* QUÉ REVISAMOS */}
      <section id="que-revisamos">
        <div className="container">
          <div className="dx-section-head">
            <FadeUp><span className="eyebrow">01 · El diagnóstico</span></FadeUp>
            <FadeUp delay={0.05}><h2>¿Qué revisamos en&nbsp;el <span className="grad-text">diagnóstico digital?</span></h2></FadeUp>
            <FadeUp delay={0.1}>
              <p>
                Una auditoría de presencia digital para pymes en Chile que cubre los tres pilares
                de la comunicación de tu empresa: dónde te ven, cómo te ven y qué tan claro eres.
              </p>
            </FadeUp>
          </div>

          <div className="dx-pillars">
            {PILLARS.map((p, i) => (
              <FadeUp key={p.num} delay={i * 0.06}>
                <div className="service-card">
                  <span className="service-num">{p.num}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="service-tags">
                    {p.tags.map((t) => <span key={t} className="service-tag">{t}</span>)}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <p className="dx-note">
              Al final recibes un <strong>reporte escrito</strong> con hallazgos concretos y
              recomendaciones priorizadas por impacto. No una lista genérica: un diagnóstico de
              tu empresa específica.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{paddingTop:0}}>
        <div className="container">
          <div className="dx-section-head">
            <FadeUp><span className="eyebrow">02 · El proceso</span></FadeUp>
            <FadeUp delay={0.05}><h2>Cómo funciona el <span className="grad-text">diagnóstico</span></h2></FadeUp>
            <FadeUp delay={0.1}>
              <p>Tres pasos. Sin formularios largos, sin propuestas genéricas, sin presión de venta.</p>
            </FadeUp>
          </div>

          {STEPS.map((s) => (
            <FadeUp key={s.num}>
              <div className="svc-row">
                <div className="num">{s.num}</div>
                <div><h3>{s.title}</h3></div>
                <div className="body"><p>{s.desc}</p></div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section id="para-quien" style={{paddingTop:0}}>
        <div className="container">
          <div className="dx-section-head">
            <FadeUp><span className="eyebrow">03 · Para quién</span></FadeUp>
            <FadeUp delay={0.05}><h2>Está hecho para <span style={{whiteSpace:"nowrap"}}>ti <span className="grad-text">si…</span></span></h2></FadeUp>
          </div>

          <div className="dx-who">
            {WHO.map((w, i) => (
              <FadeUp key={w.title} delay={i * 0.06}>
                <div className="glass dx-who-card">
                  <span className="dx-who-dot" style={{background:w.color, boxShadow:`0 0 16px ${w.color}`}} />
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="agendar" style={{paddingTop:0}}>
        <div className="container">
          <FadeUp>
            <div className="glass dx-cta">
              <div className="dx-cta-glow" />
              <h2>Agenda tu diagnóstico <span className="grad-text">gratuito</span></h2>
              <p>
                Cupos de lunes a viernes. Sesión presencial en Santiago o por Google Meet.
                Te respondemos en menos de 24 horas para coordinar día y hora.
              </p>
              <div className="row">
                <Magnetic>
                  <a className="btn btn-primary" href="/contacto">Agendar mi diagnóstico <Arrow /></a>
                </Magnetic>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas-frecuentes" style={{paddingTop:0}}>
        <div className="container">
          <div className="dx-section-head">
            <FadeUp><span className="eyebrow">04 · FAQ</span></FadeUp>
            <FadeUp delay={0.05}><h2>Preguntas <span className="grad-text">frecuentes</span></h2></FadeUp>
          </div>
          <FadeUp>
            <div className="dx-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>
                    <span>{f.q}</span>
                    <span className="dx-plus" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 5v14M5 12h14"/></svg>
                    </span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </PageTransition>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Diagnostico />);
