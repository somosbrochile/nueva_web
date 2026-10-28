import React from 'react'
import ReactDOM from 'react-dom/client'
import { CustomCursor, Magnetic, FadeUp, Nav, Footer, PageTransition } from './site.jsx'
import './styles.css'

function ContactForm() {
  const [status, setStatus] = React.useState("idle"); // idle | sending | success | error
  const formRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form ref={formRef} className="contact-form glass" style={{padding:40}} onSubmit={handleSubmit}>
      <input name="website" type="text" style={{display:"none"}} tabIndex="-1" autoComplete="off"/>
      <div className="field"><label>Tu nombre</label><input name="nombre" type="text" placeholder="Cómo te llamas" required/></div>
      <div className="field"><label>Email</label><input name="email" type="email" placeholder="tu@correo.cl" required/></div>
      <div className="field"><label>Empresa</label><input name="empresa" type="text" placeholder="Tu marca o proyecto"/></div>
      <div className="field"><label>Servicio</label>
        <select name="servicio" defaultValue=""><option value="" disabled>¿Qué buscas?</option><option>Estrategia de contenido</option><option>Producción audiovisual</option><option>Social media</option><option>Diseño web</option><option>Todo el paquete</option></select>
      </div>
      <div className="field"><label>Presupuesto aprox.</label>
        <select name="presupuesto" defaultValue=""><option value="" disabled>Rango mensual</option><option>$500k – $1.5M CLP</option><option>$1.5M – $3M CLP</option><option>$3M – $6M CLP</option><option>$6M+ CLP</option><option>Aún no sé</option></select>
      </div>
      <div className="field"><label>Cuéntanos</label><textarea name="mensaje" placeholder="Cuéntanos dónde estás y a dónde quieres llegar." rows="4"></textarea></div>

      {status === "success" && (
        <div style={{
          display:"flex", alignItems:"center", gap:12,
          padding:"16px 20px", borderRadius:12,
          background:"rgba(88,187,160,0.12)", border:"1px solid rgba(88,187,160,0.3)",
          color:"var(--teal)", fontSize:15, fontWeight:500,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
          ¡Mensaje recibido! Te respondemos en menos de 24h.
        </div>
      )}

      {status === "error" && (
        <div style={{
          display:"flex", alignItems:"center", gap:12,
          padding:"16px 20px", borderRadius:12,
          background:"rgba(208,10,95,0.1)", border:"1px solid rgba(208,10,95,0.3)",
          color:"var(--magenta)", fontSize:15, fontWeight:500,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
          Hubo un problema al enviar. Escríbenos a contacto@somosbro.cl
        </div>
      )}

      <Magnetic strength={0.2}>
        <button
          type="submit"
          className="btn btn-primary"
          style={{width:"100%", justifyContent:"center", opacity: status === "sending" ? 0.6 : 1}}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Enviando…" : "Enviar"}
          {status !== "sending" && (
            <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
          )}
        </button>
      </Magnetic>
    </form>
  );
}

function Contact() {
  return (
    <PageTransition>
      <Nav active="/contacto" />
      <header className="page-head">
        <div className="blob" style={{background:"radial-gradient(circle,#f8ac08,transparent 70%)"}} />
        <div className="container">
          <FadeUp><span className="eyebrow">Contacto</span></FadeUp>
          <FadeUp delay={0.05}><h1 style={{marginTop:24,maxWidth:"14ch"}}>Tu proyecto <span className="grad-text">empieza aquí.</span></h1></FadeUp>
          <FadeUp delay={0.12}>
            <p style={{maxWidth:"58ch",fontSize:20,marginTop:32,color:"var(--ink-2)"}}>
              Cuéntanos qué proyecto tienes. Respondemos en menos de 24h y agendamos una llamada sin costo.
            </p>
          </FadeUp>
        </div>
      </header>

      <section>
        <div className="container">
          <div className="contact-grid">
            <FadeUp>
              <ContactForm />
            </FadeUp>

            <FadeUp delay={0.1}>
              <div style={{display:"flex",flexDirection:"column",gap:24}}>
                <Magnetic strength={0.2}>
                  <a className="wa-btn" href="#form" style={{width:"100%",boxSizing:"border-box"}} onClick={e=>{e.preventDefault();document.querySelector('.contact-form')?.scrollIntoView({behavior:'smooth'})}}>
                    <svg className="wa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2}}>
                      <span style={{fontWeight:700}}>Escríbenos por el formulario</span>
                      <span style={{fontSize:12,opacity:.7,fontWeight:500}}>Respondemos en menos de 24h</span>
                    </div>
                  </a>
                </Magnetic>

                <div className="contact-info-row">
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <a href="mailto:contacto@somosbro.cl" className="info-val">contacto@somosbro.cl</a>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Teléfono</span>
                    <span className="info-val">+56 9 0000 0000</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Estudio</span>
                    <span className="info-val">Providencia, Santiago<br/>Chile · GMT-3</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Horario</span>
                    <span className="info-val">Lun – Vie · 09:00 – 19:00</span>
                  </div>
                </div>

                <div className="glass" style={{padding:24,display:"flex",gap:16,alignItems:"center"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:"var(--teal)",boxShadow:"0 0 12px var(--teal)"}}/>
                  <div>
                    <div style={{fontFamily:"var(--font-h)",fontWeight:700,fontSize:16}}>Disponibles este mes</div>
                    <div style={{fontSize:13,color:"var(--ink-3)",marginTop:2}}>Quedan 2 cupos para mayo</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <Footer />
      <CustomCursor />
    </PageTransition>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<Contact />);
