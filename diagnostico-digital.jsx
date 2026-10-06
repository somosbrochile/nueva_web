import React from 'react'
import ReactDOM from 'react-dom/client'
import { CustomCursor, Magnetic, FadeUp, Nav, Footer, PageTransition } from './site.jsx'
import './styles.css'
import './diagnostico.css'

/* ------------------------------------------------------------------
   LINKS DE PAGO: pega aquí el link de pago de cada plan (Flow, Mercado Pago, etc.).
   Mientras estén vacíos, los botones llevan a /contacto.
   ------------------------------------------------------------------ */
const PAY_LINKS = {
  esencial: '',
  auditoria: '',
};
const payHref = (plan) => PAY_LINKS[plan] || '/contacto';
const isExternal = (plan) => Boolean(PAY_LINKS[plan]);

const Arrow = () => (
  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
);

const PLANS = [
  {
    id: 'esencial',
    name: 'Diagnóstico Esencial',
    price: '$89.000',
    for: 'Para emprendimientos y negocios locales que quieren saber qué están haciendo mal y poner orden.',
    items: [
      'Sesión de 45 minutos',
      'Revisión de usabilidad web (UX) y SEO básico',
      'Auditoría visual de tus redes sociales (Instagram y LinkedIn)',
      'Reporte PDF en 48 horas con "victorias rápidas": lo que puedes arreglar hoy',
    ],
    cta: 'Contratar Diagnóstico Esencial',
  },
  {
    id: 'auditoria',
    name: 'Auditoría Estratégica',
    price: '$220.000',
    featured: true,
    tag: 'Para empresas con tráfico',
    for: 'Para empresas establecidas, e-commerce y negocios B2B que ya tienen tráfico, pero no están vendiendo lo suficiente.',
    items: [
      'Sesión de 60 a 90 minutos con los socios de Somos Bro',
      'Análisis de tu embudo de ventas y de la conversión de tu sitio',
      'Benchmark de 2 competidores',
      'Auditoría de branding y coherencia de marca',
      'Revisión de tus campañas en Meta Ads y Google Ads, si las tienes',
      'Reporte PDF en 5 días hábiles con un plan de acción a 30 y 60 días',
    ],
    cta: 'Contratar Auditoría Estratégica',
  },
];

const STEPS = [
  { num: "01", title: "Eliges tu plan y pagas",
    desc: "Contratas el diagnóstico que necesitas y te contactamos para agendar el día y la hora de la sesión." },
  { num: "02", title: "Sesión en vivo",
    desc: "Revisamos contigo tu sitio, tus redes y tu marca. Tú explicas tu contexto, nosotros identificamos los problemas reales. Presencial en Santiago o por Google Meet." },
  { num: "03", title: "Recibes el reporte",
    desc: "Un documento con hallazgos, prioridades y pasos concretos: en 48 horas el Esencial y en 5 días hábiles la Auditoría Estratégica." },
];

const WHO = [
  { color: "var(--orange)",  title: "Tienes una pyme en Chile", desc: "Con presencia digital activa, pero sin claridad de si está funcionando." },
  { color: "var(--magenta)", title: "Eres profesional independiente", desc: "Abogado, consultor, médico, coach: alguien que vive de su reputación digital." },
  { color: "var(--blue)",    title: "Estás lanzando o relanzando", desc: "Antes de invertir en publicidad quieres saber si tu base está sólida." },
  { color: "var(--yellow)",  title: "Sientes que algo no funciona", desc: "Tienes presencia digital, pero no genera consultas, ventas ni confianza." },
];

const FAQ = [
  { q: "¿Cuánto cuesta el diagnóstico digital?",
    a: "El Diagnóstico Esencial cuesta $89.000 + IVA y la Auditoría Estratégica, $220.000 + IVA. Si dentro de los 15 días siguientes contratas con nosotros un proyecto de desarrollo web o branding, el valor del diagnóstico se abona a ese proyecto." },
  { q: "¿Qué diferencia hay entre el Diagnóstico Esencial y la Auditoría Estratégica?",
    a: "El Esencial es una revisión rápida para ordenar lo básico: usabilidad, SEO y redes, con una lista de arreglos inmediatos. La Auditoría Estratégica es para empresas que ya tienen tráfico: analiza tu embudo de ventas, tu competencia, tu marca y tus campañas, y termina en un plan de acción a 30 y 60 días." },
  { q: "¿Por qué el diagnóstico no es gratis?",
    a: "Porque un diagnóstico serio toma horas de trabajo antes y después de la sesión. Cobrarlo nos permite dedicarle ese tiempo de verdad y entregarte algo que sirva, no una venta disfrazada de consultoría. Y si después trabajamos juntos, se abona a tu proyecto." },
  { q: "¿Qué necesito tener listo para la Auditoría Estratégica?",
    a: "Si tienes campañas en Meta Ads o Google Ads, o Google Analytics, necesitamos acceso de lectura a esas cuentas para revisarlas. Te explicamos cómo darlo; toma un par de minutos y no nos permite modificar nada." },
  { q: "¿El diagnóstico se puede hacer de forma remota?",
    a: "Sí. La mayoría de las sesiones se hacen por Google Meet. También ofrecemos sesiones presenciales en Santiago para quienes prefieren el cara a cara." },
  { q: "¿Qué pasa si no quiero contratar nada después?",
    a: "El reporte es tuyo de todas formas. No hay presión de venta ni seguimiento no solicitado. Si el diagnóstico te ayuda y quieres seguir trabajando con nosotros, bien. Si no, también." },
];

function PlanCard({ plan }) {
  const ext = isExternal(plan.id);
  return (
    <div className={"glass dx-plan" + (plan.featured ? " is-featured" : "")} id={"plan-" + plan.id}>
      {plan.tag && <span className="dx-plan-tag">{plan.tag}</span>}
      <h3>{plan.name}</h3>
      <p className="dx-plan-for">{plan.for}</p>
      <div className="dx-plan-price">
        <span className="dx-plan-amount">{plan.price}</span>
        <span className="dx-plan-iva">+ IVA</span>
      </div>
      <ul className="dx-plan-list">
        {plan.items.map((it) => <li key={it}><Check />{it}</li>)}
      </ul>
      <div className="dx-plan-cta">
        <Magnetic>
          <a className={"btn " + (plan.featured ? "btn-primary" : "btn-ghost")} href={payHref(plan.id)}
             {...(ext ? { target: "_blank", rel: "noreferrer" } : {})}>
            {plan.cta} <Arrow />
          </a>
        </Magnetic>
      </div>
    </div>
  );
}

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
              Revisamos tu sitio web, tus redes sociales y tu identidad de marca, y te entregamos
              un reporte con todo lo que está fallando y cómo arreglarlo.
              Sin tecnicismos. Sin venta disfrazada de consultoría.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div className="dx-badges">
              <span className="dx-badge">Desde $89.000 + IVA</span>
              <span className="dx-badge">Reporte escrito en PDF</span>
              <span className="dx-badge">Se abona si contratas en 15 días</span>
              <span className="dx-badge">Presencial o Google Meet</span>
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

      {/* PLANES */}
      <section id="planes">
        <div className="container">
          <div className="dx-section-head">
            <FadeUp><span className="eyebrow">01 · Los planes</span></FadeUp>
            <FadeUp delay={0.05}><h2>Dos niveles de <span className="grad-text">diagnóstico</span></h2></FadeUp>
            <FadeUp delay={0.1}>
              <p>
                Una auditoría de presencia digital para empresas en Chile. Elige según la etapa de tu
                negocio: ordenar lo básico o encontrar por qué tu tráfico no se convierte en ventas.
              </p>
            </FadeUp>
          </div>

          <div className="dx-plans">
            {PLANS.map((p, i) => (
              <FadeUp key={p.id} delay={i * 0.08}><PlanCard plan={p} /></FadeUp>
            ))}
          </div>

          <FadeUp>
            <p className="dx-note">
              <strong>El diagnóstico se abona a tu proyecto:</strong> si dentro de los 15 días siguientes
              contratas con nosotros desarrollo web o branding, descontamos su valor.
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
              <h2>Elige tu <span className="grad-text">diagnóstico</span></h2>
              <p>
                Contratas, te contactamos en menos de 24 horas para agendar y en la sesión
                revisamos tu caso. Presencial en Santiago o por Google Meet.
              </p>
              <div className="row">
                <Magnetic>
                  <a className="btn btn-ghost" href={payHref('esencial')} {...(isExternal('esencial') ? { target: "_blank", rel: "noreferrer" } : {})}>Esencial · $89.000 + IVA</a>
                </Magnetic>
                <Magnetic>
                  <a className="btn btn-primary" href={payHref('auditoria')} {...(isExternal('auditoria') ? { target: "_blank", rel: "noreferrer" } : {})}>Auditoría Estratégica · $220.000 + IVA <Arrow /></a>
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
