# Invitación de Valentina · 22 años

Web local en Next.js, TypeScript y App Router, preparada para publicar después en Vercel.

## Datos reales incorporados

- Nombre: Valentina.
- Edad: 22 años.
- Fecha: sábado 10 de octubre de 2026.
- Hora: 12:00 (mediodía), America/Santiago.
- Dirección: Camino Las Flores, Parcela 21, Padre Hurtado, Chile.

El mapa integrado y el botón “Cómo llegar” abren una búsqueda en Google Maps con la dirección exacta proporcionada. No se han inventado coordenadas de la parcela. Si tienes un enlace del pin exacto, reemplaza `mapsUrl` en la configuración.

## Abrir localmente

Desde esta carpeta:

```sh
npm install
npm run dev
```

Abre http://127.0.0.1:3000. Para comprobar la versión de producción:

```sh
npm run build
npm run start
```

El servidor de desarrollo y el de producción usan el mismo puerto; detén uno antes de iniciar el otro.

## Cambiar contenido

Todo el contenido configurable está en `src/config/event.ts`:

- `dateTime`: formato ISO con offset explícito. La fecha real ya está configurada.
- `rsvpUrl`: enlace de WhatsApp o formulario. Al configurarlo, aparecen el botón activo y un QR real del mismo enlace.
- `rsvpDeadline`: fecha ISO límite de confirmación, opcional.
- `albumUrl`: enlace del álbum. Si está vacío, el botón indica “Álbum próximamente”.
- `musicSrc`: ruta local del audio; por ejemplo `/audio/cancion.mp3`. Copia el archivo en `public/audio`. La música solo comienza al pulsar reproducir.
- `photos`: rutas de imágenes, descripciones alternativas y posiciones del recorte. Guarda las fotos en `public/images`.
- `hashtag`: se propone `#Valentina22`; se puede cambiar.
- `giftMessage`, `giftIdeas` y `giftDetails`: ideas de regalo editables.
- `mapsEmbedUrl`: mapa visible con búsqueda de la dirección.

La confirmación abre WhatsApp al +56 9 9563 0607 con un mensaje preparado y genera un QR del mismo enlace. La persona pulsa enviar en WhatsApp; el mensaje no pide su nombre. Álbum y música siguen pendientes.

## Imágenes provisionales

No se han recibido fotografías personales de Valentina. Hay 16 fotografías decorativas generadas, cada una utilizada en un único espacio: cumpleaños, piscina, accesorios, flores y detalles coquette. No representan fotografías reales del lugar ni pertenencias de Valentina. Las copas dibujadas de fecha y despedida se sustituyeron por fotografía.

Se eliminó el dress code y se indica llevar ropa cómoda y traje de baño. Los textos son breves y concretos.

## Publicar después en Vercel

No se realizó ningún despliegue. Cuando esté listo el contenido, importa este proyecto en Vercel y selecciona Next.js. Usa `npm run build`; no es necesario configurar servicios externos ni variables de entorno para la versión actual.

## Diseño y accesibilidad

Una sola columna de 440 px en escritorio y a todo el ancho en móvil. Paleta crema y rosa, fuentes DM Serif Display para títulos, Bodoni Moda para cifras, Birthstone para frases grandes, La Belle Aurore para párrafos manuscritos y Manrope para datos secundarios, alojadas por Next.js. Portada con textura floral SVG, acuarelas irregulares, collage central de cinco fotos, collage inclinado y Polaroid sobre pinceladas. Contador en tiempo real, enlace de ubicación, copia del hashtag, revelado suave y respeto de movimiento reducido. No hay reproducción automática de audio.

## Animaciones GSAP y Three.js

- GSAP y ScrollTrigger: apertura de la portada, aparición de títulos y textos, entrada escalonada de fotos, desplazamiento suave de collages, reflejo sobre las fotos y balanceo de copas y lazos.
- Three.js: corazones volumétricos rosa, perlas y destellos en los bordes, con respuesta suave al cursor. El lienzo decorativo no intercepta clics.
- Botón circular inferior: pausa o activa los efectos. La pausa devuelve todo el contenido a su estado visible y libera el lienzo 3D.
- Las animaciones se desactivan por defecto cuando el dispositivo pide movimiento reducido. Las bibliotecas se cargan bajo demanda únicamente al activarse los efectos.
- Menos partículas y resolución limitada en móvil. Los efectos flotantes fuera de pantalla se pausan y la escena 3D se detiene al ocultar la pestaña. Si WebGL no está disponible, se conserva la invitación y las animaciones GSAP.

La implementación está en `src/components/invitation-effects.tsx` y `src/components/celebration-scene.ts`.
