import React from 'react'
import ReactDOM from 'react-dom/client'
import { CustomCursor, Magnetic, FadeUp, Nav, Footer, PageTransition } from './site.jsx'
import './styles.css'

function Contact() {
  return (
    <PageTransition>
      <Nav active="contact.html" />
      <header className="page-head">
        <div className="blob" style={{background:"radial-gradient(circle,#f8ac08,transparent 70%)"}} />
        <div className="container">
          <FadeUp><span className="eyebrow">Contacto</span></FadeUp>
          <FadeUp delay={0.05}><h1 style={{marginTop:24,maxWidth:"14ch"}}>Hablemos, <span className="grad-text">bro.</span></h1></FadeUp>
          <FadeUp delay={0.12}>
            <p style={{maxWidth:"58ch",fontSize:20,marginTop:32,color:"var(--ink-2)"}}>
              Cuéntanos qué andas armando. Respondemos en menos de 24h. Si calza, agendamos un café (presencial en Santiago o por Meet).
            </p>
          </FadeUp>
        </div>
      </header>

      <section>
        <div className="container">
          <div className="contact-grid">
            <FadeUp>
              <form className="contact-form glass" style={{padding:40}} onSubmit={(e)=>{e.preventDefault(); alert("Gracias bro, te escribimos al toque.");}}>
                <div className="field"><label>Tu nombre</label><input type="text" placeholder="Cómo te llamas" required/></div>
                <div className="field"><label>Email</label><input type="email" placeholder="tu@correo.cl" required/></div>
                <div className="field"><label>Empresa</label><input type="text" placeholder="Tu marca o proyecto"/></div>
                <div className="field"><label>Servicio</label>
                  <select defaultValue=""><option value="" disabled>¿Qué buscas?</option><option>Estrategia de contenido</option><option>Producción audiovisual</option><option>Social media</option><option>Diseño web</option><option>Todo el paquete</option></select>
                </div>
                <div className="field"><label>Presupuesto aprox.</label>
                  <select defaultValue=""><option value="" disabled>Rango mensual</option><option>$500k – $1.5M CLP</option><option>$1.5M – $3M CLP</option><option>$3M – $6M CLP</option><option>$6M+ CLP</option><option>Aún no sé</option></select>
                </div>
                <div className="field"><label>Cuéntanos</label><textarea placeholder="Qué marca, qué problema, qué soñái" rows="4"></textarea></div>
                <Magnetic strength={0.2}>
                  <button type="submit" className="btn btn-primary" style={{width:"100%",justifyContent:"center"}}>
                    Enviar
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M9 7h8v8"/></svg>
                  </button>
                </Magnetic>
              </form>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div style={{display:"flex",flexDirection:"column",gap:24}}>
                <Magnetic strength={0.2}>
                  <a className="wa-btn" href="https://wa.me/56900000000" target="_blank" rel="noreferrer" style={{width:"100%",boxSizing:"border-box"}}>
                    <svg className="wa-icon" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3 9 3 16c0 2.4.7 4.7 2 6.7L3 29l6.5-2C11.4 28 13.7 28.7 16 28.7c7 0 13-6 13-13S23 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.8-1.7l-.4-.2-3.9 1.2 1.2-3.8-.3-.4C5.5 19.8 5 17.9 5 16c0-6 5-11 11-11s11 5 11 11-5 11-11 11zm6-8.2c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.8.2s-.9 1.1-1.1 1.3c-.2.2-.4.3-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.6.1-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.4c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.6-.5z"/></svg>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2}}>
                      <span style={{fontWeight:700}}>Hablar por WhatsApp</span>
                      <span style={{fontSize:12,opacity:.7,fontWeight:500}}>Respuesta &lt; 24h</span>
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
