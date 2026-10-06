import React from 'react'
import ReactDOM from 'react-dom/client'
import { Article } from './article-layout.jsx'

const meta = {
  title: 'Cómo cotizar una página web: 10 preguntas antes de contratar (y la que casi nadie hace)',
  category: 'Diseño Web',
  author: 'Somos Bro',
  dateISO: '2026-10-06',
  dateLabel: '6 de octubre, 2026',
  readTime: '7 min',
  // Portada: sube la foto a public/assets/blog/ y descomenta:
  // heroImage: '/assets/blog/como-cotizar-pagina-web-chile.jpg',
  // heroAlt: 'Cómo cotizar una página web en Chile — Somos Bro',
  heroImage: '/assets/blog/como-cotizar-pagina-web-chile.jpg',
  heroAlt: 'Dueña de una pyme en Chile comparando la cotización de su página web con el diseño del sitio en su notebook',
  ctaTitle: '¿Estás cotizando tu sitio web?',
  ctaText: 'Haznos estas mismas 10 preguntas. Te respondemos todo por escrito, con el dominio y el hosting a tu nombre desde el día uno.',
};

function Post() {
  return (
    <Article meta={meta}>
      <p>
        Cotizar una página web parece fácil: pides tres presupuestos y eliges. Pero casi nadie
        compara lo mismo, y los problemas aparecen meses después: textos que nadie escribió,
        cambios que se cobran aparte, un sitio que no puedes editar o, el peor de todos, un
        dominio que no es tuyo. Estas son las 10 preguntas que tienes que hacer antes de firmar.
      </p>

      <div className="key-takeaway">
        <p>
          <strong>En resumen:</strong> antes de comparar precios, compara{' '}
          <strong>qué incluye cada cotización</strong>. Y antes de firmar, asegúrate de que el{' '}
          <strong>dominio y el hosting queden a nombre de tu empresa</strong>. Es la pregunta
          que casi nadie hace y la que más problemas evita.
        </p>
      </div>

      <h2>1. ¿A nombre de quién quedan el dominio y el hosting?</h2>
      <p>
        Partimos por la más importante. Muchas agencias usan su propio hosting y compran el
        dominio a nombre de ellas. Es cómodo para todos mientras dura la relación. El problema
        llega cuando quieres cambiar de proveedor: para traspasar el dominio necesitas que el
        titular actual haga la transferencia. Si la agencia responde, es un trámite. Si no
        responde, porque cerró, cambió de rubro o simplemente no contesta, te quedas atrapado.
      </p>
      <p>
        Lo vemos seguido: empresas que quieren renovar su sitio y no pueden, porque ni siquiera
        saben quién tiene las claves. La única salida que les queda es un proceso ante NIC Chile,
        que toma tiempo y tiene costo.
      </p>
      <p>
        <strong>Lo correcto:</strong> el dominio siempre a nombre de tu empresa como titular. La
        agencia puede tener acceso técnico para trabajar, pero el dueño eres tú. Con el hosting,
        lo ideal es lo mismo: una cuenta tuya, con tus datos.
      </p>
      <p>
        En Somos Bro trabajamos así: cada cliente compra su propio dominio y su propio hosting, y
        nosotros le enviamos las mejores opciones, seguras y a buen precio, para que elija. Si
        algún día decides irte, tu sitio se va contigo.
      </p>
      <p>
        <strong>Tip:</strong> busca tu dominio en el Whois de{' '}
        <a href="https://www.nic.cl" target="_blank" rel="noreferrer">nic.cl</a> y revisa quién
        aparece como titular. Si no es tu empresa, pide el traspaso hoy, no cuando lo necesites.
      </p>

      <h2>2. ¿Qué incluye exactamente la cotización?</h2>
      <p>
        "Página web" puede significar una sola página o veinte. Pide el detalle por escrito:
        cuántas páginas, qué secciones, qué funcionalidades (formulario, WhatsApp, reservas,
        pagos) y qué queda fuera. Si dos cotizaciones no detallan lo mismo, no las puedes comparar.
      </p>

      <h2>3. ¿Quién escribe los textos y pone las fotos?</h2>
      <p>
        Es la causa número uno de proyectos atrasados. Muchas cotizaciones baratas asumen que tú
        entregas todo el contenido. Si no tienes tiempo para escribirlo, o no sabes cómo escribir
        para vender, pregunta si la agencia lo hace y cuánto cuesta.
      </p>

      <h2>4. ¿En qué plataforma se construye y por qué?</h2>
      <p>
        WordPress, Shopify, Webflow, código a medida... No hay una plataforma mejor para todos,
        pero sí una correcta para tu caso. Desconfía de quien no sepa explicarte por qué eligió
        esa, y de las plataformas propias de la agencia que solo ella puede editar.
      </p>

      <h2>5. ¿Podré editar el sitio yo mismo?</h2>
      <p>
        Cambiar un precio, subir una foto o publicar una noticia no debería requerir pagarle a
        alguien cada vez. Pregunta si el sitio tiene un administrador fácil de usar y si incluye
        capacitación.
      </p>

      <h2>6. ¿Incluye SEO básico?</h2>
      <p>
        Un sitio que nadie encuentra en Google es un folleto caro. Como mínimo debería incluir
        títulos y descripciones optimizados, buena velocidad de carga, sitemap y conexión con
        Google Search Console y Google Analytics. Si no lo incluye, que te lo digan claro.
      </p>

      <h2>7. ¿Se ve bien y carga rápido en celular?</h2>
      <p>
        La mayoría de tus visitas llegan desde el teléfono. Pide ejemplos de sitios que hayan
        hecho y revísalos tú mismo en tu celular. Puedes pasarlos por{' '}
        <a href="https://pagespeed.web.dev" target="_blank" rel="noreferrer">PageSpeed Insights</a>,
        la herramienta gratuita de Google, para ver qué tan rápido cargan.
      </p>

      <h2>8. ¿Cuántas rondas de cambios incluye?</h2>
      <p>
        Siempre habrá ajustes. Lo importante es saber cuántas revisiones están incluidas y cuánto
        cuesta lo que venga después. Así evitas discusiones a mitad de proyecto.
      </p>

      <h2>9. ¿Qué pasa después de publicar?</h2>
      <p>
        Un sitio necesita actualizaciones, seguridad y respaldos. Pregunta si hay mantención, si
        es mensual o por hora, cuánto cuesta y qué tan rápido responden si algo falla. También
        conviene preguntar por la política de privacidad y los formularios, sobre todo con la
        nueva Ley 21.719 de protección de datos personales en camino.
      </p>

      <h2>10. ¿Cuáles son los plazos y la forma de pago?</h2>
      <p>
        Pide un cronograma con etapas y fechas, y que los pagos estén asociados a avances (por
        ejemplo, un anticipo, un pago al aprobar el diseño y el saldo al publicar). Y todo por
        escrito: un correo con el detalle ya es mejor que un acuerdo de palabra.
      </p>

      <h2>Señales de alerta al cotizar una página web</h2>
      <ul>
        <li><strong>Te dan un precio sin hacerte ninguna pregunta</strong> sobre tu negocio o tus objetivos.</li>
        <li><strong>"Dominio y hosting gratis incluidos":</strong> casi siempre significa que quedan a nombre de ellos.</li>
        <li><strong>No te entregan accesos</strong> ni claves al terminar el proyecto.</li>
        <li><strong>No muestran trabajos anteriores</strong> o no puedes visitarlos en vivo.</li>
        <li><strong>No hay nada por escrito:</strong> ni detalle, ni plazos, ni condiciones.</li>
      </ul>

      <h2>Antes de cotizar: ten claro cuánto cuesta</h2>
      <p>
        Con estas preguntas puedes comparar cotizaciones de igual a igual. Si todavía no sabes en
        qué rango de precio deberías estar, revisa{' '}
        <a href="/blog/cuanto-cuesta-una-pagina-web-chile">cuánto cuesta una página web en Chile</a>,
        donde desglosamos los precios por tipo de sitio.
      </p>

      <h2>Preguntas frecuentes</h2>
      <h3>¿Qué preguntar antes de contratar una página web?</h3>
      <p>
        Lo esencial: a nombre de quién quedan el dominio y el hosting, qué incluye exactamente la
        cotización, quién hace los textos y las fotos, en qué plataforma se construye, si podrás
        editarlo tú, si incluye SEO básico, cuántas rondas de cambios hay, qué pasa después de
        publicar, y los plazos y forma de pago.
      </p>
      <h3>¿Qué pasa si mi dominio quedó a nombre de la agencia?</h3>
      <p>
        Para traspasarlo a tu nombre necesitas que el titular actual (la agencia) haga la
        transferencia. Si responde, es un trámite simple. Si no responde, la vía que queda es un
        proceso ante NIC Chile que toma tiempo y tiene costo. Por eso conviene que el dominio
        quede a tu nombre desde el principio.
      </p>
      <h3>¿Cómo sé a nombre de quién está mi dominio .cl?</h3>
      <p>
        Puedes buscar tu dominio en el buscador Whois de nic.cl. Ahí aparece el nombre del
        titular. Si figura la agencia o una persona que no es de tu empresa, pide el traspaso
        cuanto antes.
      </p>
    </Article>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Post />);
