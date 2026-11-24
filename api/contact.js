import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // Honeypot: los bots llenan el campo oculto "website"
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  // Normaliza: solo strings, sin espacios extra y con largo máximo
  const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const nombre = clean(body.nombre, 120);
  const email = clean(body.email, 200);
  const empresa = clean(body.empresa, 150);
  const servicio = clean(body.servicio, 120);
  const presupuesto = clean(body.presupuesto, 80);
  const mensaje = clean(body.mensaje, 5000);

  if (!nombre || !email) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  // Escapa HTML para que nadie inyecte código en el correo
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const oneLine = (s) => s.replace(/[\r\n]+/g, " ");

  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Somos Bro Web" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER,
      replyTo: email,
      subject: `Nuevo contacto: ${oneLine(nombre)}${empresa ? ` · ${oneLine(empresa)}` : ""}`,
      html: `
        <h2>Nuevo mensaje desde somosbro.cl</h2>
        <p><strong>Nombre:</strong> ${esc(nombre)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        ${empresa ? `<p><strong>Empresa:</strong> ${esc(empresa)}</p>` : ""}
        ${servicio ? `<p><strong>Servicio:</strong> ${esc(servicio)}</p>` : ""}
        ${presupuesto ? `<p><strong>Presupuesto:</strong> ${esc(presupuesto)}</p>` : ""}
        ${mensaje ? `<p><strong>Mensaje:</strong><br>${esc(mensaje).replace(/\n/g, "<br>")}</p>` : ""}
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
}
