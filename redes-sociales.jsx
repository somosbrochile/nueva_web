import React from 'react'
import ReactDOM from 'react-dom/client'
import { CustomCursor, Magnetic, FadeUp, Nav, Footer, PageTransition } from './site.jsx'
import './styles.css'
import './redes-sociales.css'

const Arrow = () => (
  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
);

const PLANS = [
  {
    id: 'inicio',
    name: 'Plan Inicio',
    price: 'Desde $280.000',
    unit: '/mes + IVA',
    for: 'Para pymes y negocios locales que necesitan presencia profesional en redes sin equipo interno.',
    items: [
      'Gestión de 2 redes sociales (Instagram + Facebook o LinkedIn)',
      '12 publicaciones mensuales (3 por semana)',
      'Diseño de piezas gráficas según tu marca',
      'Redacción y copywriting de cada publicación',
      'Reporte mensual de desempeño',
    ],
    cta: 'Cotizar Plan Inicio',
  },
  {
    id: 'crecimiento',
    name: 'Plan Crecimiento',
    price: 'Desde $550.000',
    unit: '/mes + IVA',
    featured: true,
    tag: 'Más contratado',
    for: 'Para empresas que quieren crecer su comunidad y convertir seguidores en clientes.',
    items: [
      'Gestión de hasta 3 redes sociales',
      '20 publicaciones mensuales + stories semanales',
      'Estrategia de contenido mensual con temas definidos',
      'Diseño, copywriting y programación incluidos',
      'Community management (respuesta a comentarios y mensajes)',
      'Reporte mensual con métricas clave',
    ],
    cta: 'Cotizar Plan Crecimiento',
  },
  {
    id: 'estrategia',
    name: 'Plan Estrategia',
    price: 'Desde $990.000',
    unit: '/mes + IVA',
    for: 'Para empresas con objetivos claros que necesitan contenido profesional, pauta y resultados medibles.',
    items: [
      'Todo lo del Plan Crecimiento',
      'Sesión de estrategia mensual con el equipo Somos Bro',
      'Gestión de campañas en Meta Ads (pauta no incluida)',
      'Posicionamiento de marca en LinkedIn',
      'Análisis de competencia trimestral',
      'Reporte ejecutivo mensual con recomendaciones',
    ],
    cta: 'Cotizar Plan Estrategia',
  },
];

const STEPS = [
  { num: "01", title: "Reunión de diagnóstico",
    desc: "Partimos con una reunión de 30 minutos donde entendemos tu empresa, tu audiencia, tus objetivos y lo que has hecho hasta ahora. Sin formularios, sin propuestas genéricas." },
  { num: "02", title: "Estrategia y calendario de contenido",
    desc: "Desarrollamos una estrategia con temas, formatos y frecuencias adaptada a tu marca. Antes de publicar, tú apruebas el calendario mensual." },
  { num: "03", title: "Producción y publicación",
    desc: "Diseñamos las piezas, redactamos el copy y publicamos en los horarios óptimos. Tú no tienes que hacer nada — salvo aprobar si lo prefieres." },
  { num: "04", title: "Reporte y ajuste mensual",
    desc: "Cada mes revisamos qué funcionó y qué no, y ajustamos la estrategia. El contenido mejora con el tiempo; no parte de cero cada mes." },
];

const WHO = [
  { color: "var(--orange)",  title: "Tienes redes pero sin estrategia", desc: "Publicas cuando puedes, sin plan, sin resultados. Es hora de hacerlo bien." },
  { color: "var(--magenta)", title: "No tienes equipo digital interno", desc: "Pymes y empresas que necesitan un equipo completo sin contratar tres personas." },
  { color: "var(--blue)",    title: "Tienes una agencia mediocre", desc: "Diseños genéricos, no conocen tu industria, reportes que no explican nada." },
  { color: "var(--yellow)",  title: "Quieres crecer de forma sostenible", desc: "Sin depender solo de publicidad paga. Contenido que trabaja para ti mes a mes." },
];

const SERVICES = [
  { title: "Estrategia de contenido", desc: "Temas, formatos y frecuencias alineados con tus objetivos de negocio, no solo con el algoritmo." },
  { title: "Diseño de piezas gráficas", desc: "Publicaciones, stories y carruseles diseñados con tu identidad visual. No plantillas genéricas." },
  { title: "Redacción y copywriting", desc: "Copy que suena a tu marca y habla el idioma de tu audiencia en Chile." },
  { title: "Community management", desc: "Respuesta a comentarios y mensajes. Tu comunidad atendida, siempre." },
  { title: "Programación y publicación", desc: "Publicamos en los mejores horarios para tu audiencia. Tú no tienes que estar pendiente." },
  { title: "Reportes mensuales", desc: "Qué funcionó, qué no y qué cambiamos. Sin humo, con datos reales." },
];

const FAQ = [
  { q: "¿Cuánto cuesta el manejo de redes sociales en Chile?",
    a: "En Somos Bro los planes parten desde $280.000 + IVA al mes, dependiendo del número de redes, la frecuencia de publicación y el nivel de servicio. Los precios exactos dependen de cada caso: escríbenos y te damos una propuesta en menos de 24 horas." },
  { q: "¿Qué incluye la gestión de redes sociales para empresas?",
    a: "Según el plan: estrategia de contenido, diseño de piezas gráficas, redacción y copywriting, programación y publicación, community management (respuesta a comentarios y mensajes), y reporte mensual de resultados." },
  { q: "¿En qué redes sociales trabajan?",
    a: "Trabajamos principalmente con Instagram, Facebook y LinkedIn. Dependiendo del negocio, también TikTok y YouTube Shorts. No somos expertos en todo: si tu audiencia no está en una plataforma, no te la vamos a vender." },
  { q: "¿Cuánto tiempo tarda en verse resultados en redes sociales?",
    a: "Con una estrategia consistente, los primeros resultados — crecimiento de seguidores, mayor alcance, más interacciones — se empiezan a notar entre los 60 y 90 días. Las ventas directas desde redes dependen también de otros factores como tu sitio web y tu propuesta de valor." },
  { q: "¿Necesito un community manager interno o una agencia?",
    a: "Un CM interno tiene sentido cuando necesitas respuesta en tiempo real, como en e-commerce con alto volumen de mensajes. Una agencia como Somos Bro te da estrategia, diseño, copywriting y análisis — más que lo que hace un CM solo. Para la mayoría de las pymes en Chile, la agencia da más por el mismo costo." },
  { q: "¿Puedo ver el contenido antes de que lo publiquen?",
    a: "Sí. Trabajamos con un calendario de contenido mensual que tú apruebas antes de publicar. Si quieres modificar algo, lo hacemos. El proceso es colaborativo, no unilateral." },
];

function PlanCard({ plan }) {
  return (
    <div className={"glass dx-plan rs-plan" + (plan.featured ? " is-featured" : "")} id={"plan-" + plan.id}>
      {plan.tag && <span className="dx-plan-tag">{plan.tag}</span>}
      <h3>{plan.name}</h3>
      <p className="dx-plan-for">{plan.for}</p>
      <div className="dx-plan-price">
        <span className="dx-plan-amount rs-plan-amount">{plan.price}</span>
        <span className="dx-plan-iva">{plan.unit}</span>
      </div>
      <ul className="dx-plan-list">
        {plan.items.map((it) => <li key={it}><Check />{it}</li>)}
      </ul>
      <div className="dx-plan-cta">
        <Magnetic>
          <a className={"btn " + (plan.featured ? "btn-primary" : "btn-ghost")} href="/contacto">
            {plan.cta} <Arrow />
          </a>
        </Magnetic>
      </div>
    </div>
  );
}

function RedesSociales() {
  return (
    <PageTransition>
      <Nav active="/servicios" />

      {/* HERO */}
      <header className="page-head dx-head">
        <div className="blob" style={{background:"radial-gradient(circle,#206ea6,transparent 70%)"}} />
        <div className="blob" style={{background:"radial-gradient(circle,#d00a5f,transparent 70%)", top:"auto", bottom:-220, right:"auto", left:-160, opacity:.25}} />
        <div className="container">
          <FadeUp><span className="eyebrow">Redes sociales para empresas · Santiago, CL</span></FadeUp>
          <FadeUp delay={0.05}>
            <h1 style={{marginTop:24}}>Contenido que trabaja<br /><span className="grad-text">mientras tú trabajas.</span></h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="dx-sub">
              Gestionamos las redes sociales de tu empresa en Chile con estrategia real, diseño propio
              y copywriting que suena a tu marca. Publicamos, medimos y mejoramos mes a mes.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div className="dx-badges">
              <span className="dx-badge">Desde $280.000/mes + IVA</span>
              <span className="dx-badge">Estrategia + diseño + copy</span>
              <span className="dx-badge">Sin permanencia mínima</span>
              <span className="dx-badge">Instagram · LinkedIn · TikTok</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.24}>
            <div className="row">
              <Magnetic>
                <a className="btn btn-primary" href="#planes">Ver planes <Arrow /></a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" href="#como-funciona">¿Cómo funciona?</a>
              </Magnetic>
            </div>
          </FadeUp>
        </div>
      </header>

      {/* QUÉ INCLUYE */}
      <section id="que-incluye">
        <div className="container">
          <div className="dx-section-head">
            <FadeUp><span className="eyebrow">01 · El servicio</span></FadeUp>
            <FadeUp delay={0.05}><h2>Un equipo completo, <span className="grad-text">por una fracción</span> del costo</h2></FadeUp>
            <FadeUp delay={0.1}>
              <p>
                Estrategia, diseño, copywriting, publicación y análisis. Todo lo que necesitas para
                crecer en redes sociales en Chile, sin contratar tres personas ni perder tiempo
                explicando tu marca desde cero cada mes.
              </p>
            </FadeUp>
          </div>

          <div className="rs-services">
            {SERVICES.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.05}>
                <div className="glass rs-service-card">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" style={{paddingTop:0}}>
        <div className="container">
          <div className="dx-section-head">
            <FadeUp><span className="eyebrow">02 · Los planes</span></FadeUp>
            <FadeUp delay={0.05}><h2>Tres niveles de <span className="grad-text">gestión</span></h2></FadeUp>
            <FadeUp delay={0.1}>
              <p>
                Elige según la etapa de tu negocio. Todos los planes incluyen estrategia, diseño y
                copywriting. La diferencia está en el volumen, las redes y el nivel de acompañamiento.
              </p>
            </FadeUp>
          </div>

          <div className="rs-plans">
            {PLANS.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.08}><PlanCard plan={p} /></FadeUp>
            ))}
          </div>

          <FadeUp>
            <p className="dx-note">
              <strong>Sin permanencia mínima:</strong> los planes son mensuales. Si en algún momento
              necesitas pausar o cambiar de plan, lo hacemos sin cláusulas ni costos adicionales.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{paddingTop:0}}>
        <div className="container">
          <div className="dx-section-head">
            <FadeUp><span className="eyebrow">03 · El proceso</span></FadeUp>
            <FadeUp delay={0.05}><h2>Cómo gestionamos <span className="grad-text">tus redes</span></h2></FadeUp>
            <FadeUp delay={0.1}>
              <p>Cuatro pasos. Tú apruebas, nosotros ejecutamos. Sin sorpresas, sin contenido genérico.</p>
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
            <FadeUp><span className="eyebrow">04 · Para quién</span></FadeUp>
            <FadeUp delay={0.05}><h2>Es para ti <span className="grad-text">si…</span></h2></FadeUp>
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
      <section id="cotizar" style={{paddingTop:0}}>
        <div className="container">
          <FadeUp>
            <div className="glass dx-cta">
              <div className="dx-cta-glow" />
              <h2>¿Listo para hacer <span className="grad-text">redes que venden?</span></h2>
              <p>
                Cuéntanos sobre tu empresa y te preparamos una propuesta en menos de 48 horas.
                Sin compromiso, sin formularios kilométricos.
              </p>
              <div className="row">
                <Magnetic>
                  <a className="btn btn-primary" href="/contacto">Cotizar ahora <Arrow /></a>
                </Magnetic>
                <Magnetic>
                  <a className="btn btn-ghost" href="#planes">Ver los planes</a>
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
            <FadeUp><span className="eyebrow">05 · FAQ</span></FadeUp>
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

ReactDOM.createRoot(document.getElementById("root")).render(<RedesSociales />);
