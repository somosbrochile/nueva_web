import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, email, empresa, servicio, presupuesto, mensaje } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

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
      subject: `Nuevo contacto: ${nombre}${empresa ? ` · ${empresa}` : ""}`,
      html: `
        <h2>Nuevo mensaje desde somosbro.cl</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ""}
        ${servicio ? `<p><strong>Servicio:</strong> ${servicio}</p>` : ""}
        ${presupuesto ? `<p><strong>Presupuesto:</strong> ${presupuesto}</p>` : ""}
        ${mensaje ? `<p><strong>Mensaje:</strong><br>${mensaje.replace(/\n/g, "<br>")}</p>` : ""}
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
}
