import React from 'react'
import ReactDOM from 'react-dom/client'
import { Article } from './article-layout.jsx'

const meta = {
  title: 'Cómo aparecer en Google Maps en Chile (y por qué tu competencia sale antes que tú)',
  category: 'SEO',
  author: 'Somos Bro',
  dateISO: '2026-10-27',
  dateLabel: '27 de octubre, 2026',
  readTime: '7 min',
  // Portada: sube la foto a public/assets/blog/ y descomenta:
  // heroImage: '/assets/blog/aparecer-en-google-maps-santiago.jpg',
  // heroAlt: 'Persona buscando un negocio cercano en Google Maps desde su celular en una calle de Santiago',
  ctaTitle: '¿Tu competencia aparece en Google Maps y tú no?',
  ctaText: 'Revisamos tu perfil de empresa, tus reseñas y tu sitio, y te decimos qué te está dejando fuera del mapa. SEO local para pymes y profesionales en Santiago y todo Chile.',
};

function Post() {
  return (
    <Article meta={meta}>
      <p>
        Alguien busca «dentista en Colina», «abogado de familia en Providencia» o «veterinaria
        cerca de mí». Antes de cualquier sitio web, Google le muestra un mapa con tres negocios,
        su dirección, sus estrellas y un botón para llamar. Esos tres se llevan la mayoría de las
        llamadas. El resto, aunque sea mejor, prácticamente no existe para ese cliente.
      </p>
      <p>
        Si tu negocio atiende a clientes de una zona, ese mapa es probablemente la vitrina más
        importante que tienes en internet. Y a diferencia de los avisos, no se compra.
      </p>

      <div className="key-takeaway">
        <p>
          <strong>En resumen:</strong> crear tu ficha en Google Maps es <strong>gratis</strong> y
          toma minutos. Aparecer entre los primeros es otra historia: Google ordena los negocios
          según <strong>relevancia, distancia y prominencia</strong>, y{' '}
          <strong>no se puede pagar</strong> por subir en esos resultados. Se gana con una ficha
          bien construida, reseñas constantes y un sitio web que la respalde.
        </p>
      </div>

      <h2>Estar en Google Maps no es lo mismo que aparecer</h2>
      <p>
        Muchos negocios creen que el trabajo termina al crear su Perfil de Empresa en Google (lo
        que antes se llamaba Google My Business). Lo crean, ponen la dirección, suben el logo y
        esperan. Pero tener una ficha solo significa que Google sabe que existes. Que te muestre
        a ti y no a los otros veinte negocios del mismo rubro en tu comuna es lo que se gana con
        trabajo.
      </p>

      <h2>Cómo decide Google a quién mostrar</h2>
      <p>
        Google lo explica en su{' '}
        <a href="https://support.google.com/business/answer/7091?hl=es-ES" target="_blank" rel="noreferrer">centro de ayuda</a>:
        los resultados locales se basan principalmente en tres factores.
      </p>
      <ul>
        <li><strong>Relevancia:</strong> qué tan bien coincide tu perfil con lo que la persona busca.</li>
        <li><strong>Distancia:</strong> qué tan cerca estás de quien busca o de la ubicación que mencionó.</li>
        <li><strong>Prominencia:</strong> qué tan conocido es tu negocio, considerando, entre otras cosas, cuántos sitios te mencionan y cuántas reseñas tienes.</li>
      </ul>
      <p>
        La distancia no la controlas. Las otras dos, sí. Y ahí está la diferencia entre el
        negocio que aparece y el que no. Google además es claro en algo:{' '}
        <strong>no se puede solicitar ni pagar por un mejor posicionamiento local</strong>.
      </p>

      <h2>Lo que mueve la aguja</h2>

      <h3>Una ficha completa, y bien elegida</h3>
      <p>
        La categoría principal de tu perfil es una de las decisiones que más pesa, y una de las
        que más se elige mal. Un estudio jurídico que se registra como «abogado» cuando su fuerte
        es derecho de familia, o una clínica dental como «clínica» a secas, compiten en la liga
        equivocada desde el primer día. Lo mismo con servicios, horarios, área de atención y
        fotos: cada campo vacío es información que Google no tiene para recomendarte.
      </p>

      <h3>Reseñas: cantidad, frecuencia y respuesta</h3>
      <p>
        Las reseñas pesan para Google y pesan todavía más para tus clientes. Según la encuesta
        de consumidores 2026 de BrightLocal,{' '}
        <a href="https://www.pinmeto.com/news/brightlocal-local-consumer-review-survey-2026/" target="_blank" rel="noreferrer">resumida por PinMeTo</a>,
        el <strong>74%</strong> de las personas busca reseñas de los últimos tres meses y el{' '}
        <strong>80%</strong> prefiere negocios que responden todas sus reseñas. Cuarenta reseñas
        de hace tres años valen menos de lo que crees. Lo que funciona es un flujo constante, y
        eso requiere un sistema, no pedir el favor una vez.
      </p>

      <h3>Que tus datos coincidan en todas partes</h3>
      <p>
        Nombre, dirección y teléfono deberían ser idénticos en tu ficha, tu sitio web, tu
        Instagram y los directorios donde apareces. Cuando hay versiones distintas, Google duda
        de cuál es la correcta, y la duda juega en contra.
      </p>

      <h3>Un sitio web que respalde tu ficha</h3>
      <p>
        Tu ficha y tu sitio trabajan juntos. Un sitio con una página clara por cada servicio, que
        diga dónde atiendes y que cargue rápido en el celular, le da a Google razones para
        confiar en tu ficha. Una web de una sola página que dice «atendemos en todo Santiago» no
        ayuda mucho. Si sospechas que tu sitio tiene problemas, revisa{' '}
        <a href="/blog/por-que-mi-pagina-web-no-aparece-en-google">por qué una página web no aparece en Google</a>.
      </p>

      <h2>Los errores que vemos una y otra vez</h2>
      <ul>
        <li><strong>Meter palabras clave en el nombre del negocio</strong> («Abogados Familia Divorcio Santiago Centro»). Va contra las normas de Google y puede terminar en la suspensión de la ficha.</li>
        <li><strong>Comprar reseñas o pedirlas todas el mismo día.</strong> Las reseñas falsas están prohibidas y Google las elimina. El patrón también se nota.</li>
        <li><strong>Fichas duplicadas</strong> creadas por distintas personas a lo largo de los años, que se reparten las reseñas y confunden a Google.</li>
        <li><strong>No responder reseñas</strong>, ni las buenas ni, sobre todo, las malas.</li>
        <li><strong>No ser dueño de tu propia ficha.</strong> La creó un ex empleado o la agencia anterior con su correo, y hoy nadie tiene acceso. Recuperarla puede tomar semanas. Igual que con tu dominio, tu ficha siempre debe estar a tu nombre.</li>
      </ul>

      <h2>¿Y si no tienes local a la calle?</h2>
      <p>
        Abogados que atienden online, servicios a domicilio o consultoras sin oficina abierta al
        público también pueden aparecer en Google Maps. Se configuran como negocio con área de
        servicio, ocultando la dirección. Pero tiene sus reglas: configurarlo mal es una de las
        causas más comunes de fichas suspendidas o que nunca terminan de verificarse.
      </p>

      <h2>Google Maps también alimenta las respuestas con IA</h2>
      <p>
        Cuando alguien le pide a Gemini, a ChatGPT o a los resúmenes con IA de Google que le
        recomiende un negocio cerca, la respuesta se arma con lo que está publicado: fichas,
        reseñas, sitios web, menciones. Un perfil sólido no solo te ayuda en el mapa. También
        aumenta tus probabilidades de ser el negocio que la IA nombra.
      </p>

      <h2>¿Lo hago yo o lo delego?</h2>
      <p>
        Crear la ficha lo puedes hacer tú en una tarde. Lo que cuesta es lo que viene después:
        elegir bien categorías y servicios, construir un flujo de reseñas, alinear tu sitio con
        tu ficha, publicar con constancia y saber leer qué está haciendo tu competencia para salir
        antes que tú. Es trabajo continuo, y en la mayoría de las pymes se queda en la lista de
        pendientes.
      </p>
      <p>
        Si quieres saber dónde estás parado, parte por nuestro{' '}
        <a href="/servicios/diagnostico-digital-pymes">diagnóstico digital</a>. En el Diagnóstico
        Esencial revisamos tu sitio, tu SEO y tus redes, y en 48 horas te entregamos un informe
        con lo que te está frenando y qué arreglar primero, por <strong>$89.000 + IVA</strong>. Si
        tu negocio ya tiene tráfico y quieres compararte con tu competencia, la Auditoría
        Estratégica incluye ese análisis. En ambos casos, si después trabajas con nosotros, el
        monto se abona a tu proyecto.
      </p>

      <h2>Preguntas frecuentes</h2>
      <h3>¿Cuánto cuesta aparecer en Google Maps?</h3>
      <p>
        Crear y mantener tu Perfil de Empresa en Google es gratis. Lo que tiene costo es el trabajo
        para posicionarlo: optimización, reseñas, contenido y sitio web. Aparte existen los
        anuncios locales de Google Ads, que se pagan mientras están activos.
      </p>
      <h3>¿Cuánto se demora en aparecer mi negocio en Google Maps?</h3>
      <p>
        La verificación de la ficha puede tomar desde unos días hasta algunas semanas. Aparecer
        entre los primeros resultados para búsquedas con competencia normalmente toma meses, y
        depende de tu rubro, tu ubicación y lo que esté haciendo tu competencia.
      </p>
      <h3>¿Puedo aparecer en Google Maps si no tengo local físico?</h3>
      <p>
        Sí. Los negocios que atienden a domicilio o en una zona determinada pueden configurarse
        como negocio con área de servicio y ocultar su dirección. Tienen que cumplir las normas de
        Google para evitar que la ficha sea suspendida.
      </p>
      <h3>¿Puedo pagarle a Google para salir primero en el mapa?</h3>
      <p>
        No en los resultados orgánicos. Google indica que no se puede solicitar ni pagar por un
        mejor posicionamiento local. Lo único pagado son los anuncios, que aparecen marcados como
        patrocinados.
      </p>
    </Article>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Post />);
