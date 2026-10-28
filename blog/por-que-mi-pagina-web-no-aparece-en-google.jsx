import React from 'react'
import ReactDOM from 'react-dom/client'
import { Article } from './article-layout.jsx'

const meta = {
  title: '¿Por qué mi página web no aparece en Google? 9 causas que casi nadie revisa',
  category: 'SEO',
  author: 'Somos Bro',
  dateISO: '2026-10-27',
  dateLabel: '27 de octubre, 2026',
  readTime: '7 min',
  heroImage: '/assets/blog/pagina-web-no-aparece-en-google-chile.jpg',
  heroAlt: 'Dueña de una tienda online de ropa preocupada frente a su notebook porque su página web no aparece en Google',
  ctaTitle: '¿Tu sitio no aparece en Google? Te decimos por qué.',
  ctaText: 'Revisamos tu sitio, encontramos qué lo está frenando y te entregamos un plan priorizado. Diagnóstico digital para pymes y empresas en Santiago y todo Chile.',
};

function Post() {
  return (
    <Article meta={meta}>
      <p>
        Pagaste por tu página web, quedó bonita, la compartiste por WhatsApp. Pero cuando buscas
        en Google lo que vendes, aparece tu competencia, aparecen directorios, aparece hasta una
        empresa de otra ciudad. Tú no. Si te está pasando, no estás solo: según un estudio de{' '}
        <a href="https://ahrefs.com/es/blog/search-traffic-study/" target="_blank" rel="noreferrer">Ahrefs</a>{' '}
        sobre cerca de 14.000 millones de páginas, el <strong>96,55% no recibe ni una sola visita
        desde Google</strong>.
      </p>
      <p>
        La buena noticia es que casi nunca es mala suerte. Hay causas concretas, y la mayoría
        tiene solución. La mala es que rara vez hay una sola.
      </p>

      <div className="key-takeaway">
        <p>
          <strong>En resumen:</strong> si tu sitio no aparece en Google, puede ser porque Google{' '}
          <strong>no lo ha encontrado</strong>, porque <strong>algo le impide leerlo</strong> o
          porque lo leyó y <strong>decidió que otros responden mejor</strong> lo que la gente busca.
          Son problemas distintos con soluciones distintas, y arreglar el equivocado puede costarte
          meses.
        </p>
      </div>

      <h2>Primero: ¿no apareces, o apareces en la página 5?</h2>
      <p>
        No es lo mismo. Google funciona en tres etapas, según su propia{' '}
        <a href="https://developers.google.com/search/docs/fundamentals/how-search-works?hl=es" target="_blank" rel="noreferrer">documentación oficial</a>:
        primero <strong>rastrea</strong> (encuentra tu página), después la <strong>indexa</strong>{' '}
        (la entiende y la guarda) y recién ahí puede <strong>mostrarla</strong> cuando alguien busca
        algo relacionado.
      </p>
      <p>
        Hay una prueba que puedes hacer ahora mismo: escribe en Google{' '}
        <strong>site:tudominio.cl</strong> (con tu dominio real). Si no aparece nada, Google no
        tiene tu sitio indexado y el problema es técnico. Si aparecen tus páginas pero no sales
        cuando buscas tu servicio, Google te conoce, pero no te considera la mejor respuesta.
        Ese es un problema de posicionamiento, y es el más común.
      </p>

      <h2>Las 9 causas más comunes</h2>

      <h3>1. Google todavía no sabe que existes</h3>
      <p>
        Un sitio nuevo, sin enlaces desde otros sitios y sin estar registrado en Google Search
        Console, puede pasar semanas sin ser descubierto. Muchos sitios se entregan sin que nadie
        haga este paso, y el cliente nunca se entera.
      </p>

      <h3>2. Tu sitio le dice a Google que no entre</h3>
      <p>
        Durante el desarrollo es normal bloquear el sitio para que Google no indexe una versión a
        medio terminar. El problema es cuando ese bloqueo queda activo después del lanzamiento. Es
        una línea de código o una casilla marcada en WordPress, invisible para ti, y basta para
        que Google ignore todo tu sitio.
      </p>

      <h3>3. Google no puede leer tu contenido</h3>
      <p>
        Hay sitios que se ven perfectos en tu pantalla, pero que Google recibe casi vacíos:
        textos dentro de imágenes, páginas construidas completamente con JavaScript o plantillas
        mal configuradas. Es algo que tuvimos que resolver en nuestro propio sitio: lo que tú ves
        y lo que ve Google no siempre es lo mismo.
      </p>

      <h3>4. Tu sitio no responde lo que la gente busca</h3>
      <p>
        Tu home dice «soluciones integrales con excelencia y compromiso». Tu cliente busca
        «abogado de familia en Maipú» o «dentista en Colina». Si tus textos no hablan como habla
        tu cliente, Google no tiene cómo conectarte con esa búsqueda.
      </p>

      <h3>5. Compites por palabras imposibles</h3>
      <p>
        Querer aparecer primero buscando «abogado» o «agencia de marketing» es competir contra
        directorios, medios y empresas con diez años de ventaja. Las pymes que crecen en Google
        eligen bien sus batallas: búsquedas más específicas, con menos competencia y más
        intención de compra.
      </p>

      <h3>6. Es lento o se ve mal en el celular</h3>
      <p>
        Google evalúa tu sitio principalmente en su versión móvil. Si en el teléfono carga lento,
        los botones quedan pegados o hay que hacer zoom para leer, estás en desventaja frente a
        un competidor que sí lo resolvió.
      </p>

      <h3>7. Tu competencia tiene más autoridad</h3>
      <p>
        Google confía más en los sitios que otros mencionan: enlaces desde medios, directorios
        del rubro, asociaciones, clientes. Si tu competencia lleva años construyendo esa
        reputación y tú partiste ayer, no basta con tener una web más bonita.
      </p>

      <h3>8. Contenido delgado o duplicado</h3>
      <p>
        Tres páginas de servicio con el mismo texto cambiando una palabra, descripciones copiadas
        del proveedor o un sitio de una sola página que intenta hablar de todo. Para Google, eso
        es poco contenido útil y no tiene razones para mostrarlo.
      </p>

      <h3>9. Te vendieron SEO que no era SEO</h3>
      <p>
        «Te dejamos primero en Google en 30 días.» Si alguien te prometió eso, desconfía. Google
        es explícito: no garantiza que rastreará, indexará ni mostrará ninguna página, y{' '}
        <strong>no acepta pagos para mejorar el posicionamiento</strong>. Nadie puede garantizarte
        el primer lugar. Lo que sí se puede es hacer bien el trabajo que aumenta tus
        probabilidades.
      </p>

      <h2>Por qué «arreglar una cosa» casi nunca funciona</h2>
      <p>
        En los sitios que revisamos, rara vez hay una sola causa. Lo normal son tres o cuatro
        problemas juntos: un error técnico que nadie vio, textos que no responden lo que la gente
        busca y una competencia que avanzó mientras tanto. Si arreglas solo lo que se ve, el
        resto sigue frenándote, y como el SEO tarda en mostrar resultados, puedes perder meses
        antes de darte cuenta de que el problema estaba en otro lado.
      </p>
      <p>
        Por eso el orden importa: primero se diagnostica, después se prioriza y recién ahí se
        invierte.
      </p>

      <h2>Lo que puedes revisar tú hoy</h2>
      <ul>
        <li><strong>La prueba site:</strong> busca site:tudominio.cl y mira cuántas páginas aparecen.</li>
        <li><strong>Tu sitio en el celular:</strong> ábrelo con datos móviles, no con el wifi de la oficina, y pregúntate si un cliente se quedaría.</li>
        <li><strong>Tu servicio + tu comuna:</strong> busca lo que vendes como lo buscaría tu cliente y anota quién aparece primero. Esa es tu competencia real en Google, aunque no sea la que tú crees.</li>
      </ul>
      <p>
        Estas tres pruebas te dicen <em>si</em> tienes un problema. Para saber <em>cuál</em>, hay
        que mirar Search Console, la velocidad real del sitio, el código que recibe Google y lo que
        está haciendo tu competencia. Eso ya requiere herramientas y experiencia.
      </p>

      <h2>¿Y aparecer en ChatGPT o en las respuestas con IA?</h2>
      <p>
        Cada vez más personas preguntan a ChatGPT, Gemini o a los resúmenes con IA de Google en
        vez de revisar diez resultados. Esas herramientas recomiendan negocios a partir de lo que
        encuentran publicado en la web. Si Google no puede leer bien tu sitio, lo más probable es
        que la IA tampoco. Resolver lo básico del SEO es también el primer paso para aparecer ahí.
      </p>

      <h2>Cuándo pedir ayuda</h2>
      <p>
        Si hiciste las pruebas y algo no cuadra, el siguiente paso no es rehacer tu sitio ni
        contratar un plan mensual de SEO a ciegas. Es saber exactamente qué está pasando.
      </p>
      <p>
        Para eso existe nuestro{' '}
        <a href="/servicios/diagnostico-digital-pymes">diagnóstico digital</a>: revisamos tu sitio,
        tu SEO y tus redes, y en 48 horas te entregamos un informe con lo que está frenando tu
        posicionamiento y qué arreglar primero. Cuesta <strong>$89.000 + IVA</strong> y, si después
        decides trabajar con nosotros, ese monto se abona a tu proyecto.
      </p>
      <p>
        Y si tu negocio depende de clientes de tu zona, también te conviene leer{' '}
        <a href="/blog/como-aparecer-en-google-maps-chile">cómo aparecer en Google Maps en Chile</a>.
      </p>

      <h2>Preguntas frecuentes</h2>
      <h3>¿Cuánto se demora Google en mostrar mi página web?</h3>
      <p>
        Indexar un sitio nuevo puede tomar desde algunos días hasta varias semanas. Posicionarlo
        para búsquedas con competencia es otra cosa: normalmente toma meses de trabajo constante,
        y depende de tu rubro, tu competencia y el estado inicial del sitio.
      </p>
      <h3>¿Puedo pagarle a Google para aparecer primero?</h3>
      <p>
        En los resultados orgánicos, no: Google no acepta pagos para mejorar el posicionamiento.
        Lo que sí puedes pagar es Google Ads, que muestra tu sitio como anuncio mientras pagas.
        Apenas dejas de pagar, desapareces.
      </p>
      <h3>¿Por qué aparezco cuando busco mi nombre, pero no cuando busco mi servicio?</h3>
      <p>
        Porque buscar tu nombre es fácil: casi nadie más compite por él. Aparecer cuando alguien
        busca tu servicio significa que Google te considera mejor respuesta que tu competencia, y
        eso depende del contenido, la parte técnica y la autoridad de tu sitio.
      </p>
    </Article>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Post />);
