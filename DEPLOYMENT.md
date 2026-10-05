# Preparación y aplicación manual en Hostinger

## Preparar el build

Usar Node 22 o 24 y el lockfile npm versionado: `npm ci`, `npm run build`,
`npm run lint`, `npm test` y `git diff --check`.
Copiar `.env.example` a `.env` y completar los valores localmente antes del build.
Nunca subir ninguno de estos archivos de entorno a `public_html`.
Las variables `VITE_*` se incorporan al navegador: solo admiten configuración pública,
nunca credenciales privadas de PayPal ni claves Supabase service-role.
Los secretos de backend deben configurarse en el proveedor del backend.
Cualquier secreto previamente expuesto en Git debe rotarse manualmente; quitar `.env`
del seguimiento no lo elimina del historial. El archivo local se conserva.

## Aplicación manual en Hostinger

1. Hacer una copia completa del contenido actual de `public_html`, incluidos archivos
   ocultos y `.htaccess`, fuera de la raíz pública. Conservar la copia del último build
   y su configuración. No iniciar el reemplazo sin este respaldo.
2. Subir el **contenido** de `dist/` a `public_html`: `index.html`, `spa.html`, las cinco carpetas de rutas, `assets/`, `.htaccess`,
   `robots.txt`, `sitemap.xml`, `llms.txt`, favicon, documentos PDF/DOC/DOCX/ZIP y demás
   archivos públicos generados. No subir la carpeta `dist` como subcarpeta.
3. Subir primero assets y documentos; reemplazar después los seis HTML de ruta, `spa.html` y los archivos
   de rastreo. Reemplazar únicamente archivos correspondientes a esta aplicación.
4. **No borrar** otros sitios, subdirectorios, `.well-known`, archivos de validación,
   configuración de Hostinger, uploads, documentos existentes ni los assets del build
   anterior durante la transición. No subir `.env`, fuentes, `.git` o `node_modules`.
5. Antes de reemplazar `.htaccess`, comprobar si ya existe en `public_html` y comparar
   sus reglas. Integrar la prioridad de HTML estático y el fallback SPA después de reglas específicas existentes;
   conservar HTTPS, redirecciones, caché, seguridad y reglas de otras aplicaciones.
   La propuesta requiere Apache 2.4, `mod_rewrite` y permiso de overrides. Si no hay
   archivo previo, instalar el generado. Activar la visualización de archivos ocultos
   en el administrador/cliente de archivos para no omitirlo.
6. Abrir directamente y recargar `/`, `/quienes-somos`, `/servicios`, `/documentos`,
   `/faq` y `/contacto`. Probar navegación, búsquedas de servicios, FAQ, modal de compra
   y vistas previas. Comprobar títulos, canonical y FAQPage únicamente en `/faq`.
   Revisar los archivos de rastreo, imágenes y documentos y que un asset inexistente
   devuelva 404. Formspree y PayPal requieren una prueba autorizada separada de envío
   y pago reales; no realizar operaciones reales como parte de una prueba de humo.
7. Para rollback, restaurar desde la copia previa todos los HTML y carpetas de rutas, assets, documentos,
   archivos de rastreo y el `.htaccess` original como un conjunto. Limpiar caché de
   Hostinger/CDN si corresponde y repetir las comprobaciones de rutas y archivos.

`_redirects` se conserva para otros hosts; Apache usa `.htaccess`.
El postbuild copia explícitamente ambos y los tres archivos de rastreo a `dist`.
No se ha desplegado ni cambiado la configuración de producción desde esta rama.

## SEO y rastreo por IA

Las seis rutas comparten una gestión reusable de metadatos, sin duplicación al
navegar. LegalService y WebSite conservan los datos originales. FAQPage utiliza
exactamente las preguntas y respuestas visibles de `/faq` y se retira al salir.
El sitemap ya contiene las seis rutas reales y ninguna fecha lastmod inventada.
robots.txt y llms.txt mantienen los bots permitidos y las URLs actuales.
Los permisos de robots permiten rastreo, pero no garantizan indexación ni citas por IA.

## Prerender/SSG implementado

El build compila el cliente con Vite, compila un entry SSR temporal en
.prerender/ y ejecuta scripts/prerender.mjs. React renderToString y StaticRouter
generan seis páginas sin navegador ni servidor en producción. El generador bloquea
fetch y conexiones HTTP/TCP: una petición durante el render falla el build.
No se agregaron dependencias ni se cambió de framework.

src/seo/routes.ts sigue siendo la fuente de títulos/descripciones. El HTML y el
cliente comparten src/seo/metadata.ts. El schema empresarial original se conserva
en la plantilla; FAQPage se genera solamente para /faq. El build comprueba cuerpos
y títulos distintos, metadatos únicos, canonical, schema, imágenes y contenido
visible. Los tests verifican SSR sin navegador e hidratación de las seis páginas.

El cliente usa hydrateRoot y continúa con BrowserRouter. Un contexto mantiene el
primer render igual al HTML: las animaciones de entrada dejan el contenido visible
inicialmente; animaciones posteriores, hover, carrusel y modales continúan.
El año del build se transmite al cliente y se actualiza tras hidratar; los horarios
se calculan en un efecto con zona America/Guatemala. PayPal se carga después de
hidratar y Supabase se importa dentro del evento de aprobación de pago.
FAQ y Servicios incluyen una alternativa noscript desde sus mismos datos para
mostrar respuestas y catálogo sin JS. Con JS mantienen sus controles originales.
Búsqueda, formulario, mapa, compra y descarga requieren el cliente y sus proveedores.

Estructura final:

```text
dist/
  index.html
  quienes-somos/index.html
  servicios/index.html
  documentos/index.html
  faq/index.html
  contacto/index.html
  spa.html
  assets/
  .htaccess
  robots.txt
  sitemap.xml
  llms.txt
  _redirects
  [favicon, imágenes públicas y documentos existentes]
```

Apache 2.4 sirve primero los HTML de rutas conocidas, preserva archivos reales y
entrega spa.html para rutas desconocidas sin extensión. React muestra su 404 con
noindex; la respuesta conserva HTTP 200 (soft 404), limitación del fallback estático.
Recursos inexistentes con extensión deben responder 404. Accesos explícitos a
/servicios/index.html, etc., redirigen al canonical. Vite preview incorpora
middleware equivalente para comprobar la prioridad de rutas. Las reglas reales
deben verificarse manualmente en Hostinger: no se utilizó Apache local ni se aplicó
este build a producción.

Subir únicamente dist/: .prerender/ contiene código de servidor temporal y no se
despliega. Recompilar al cambiar contenido/configuración; no hay SSR en vivo.
Después de comprobar producción y dejar pasar cachés/sesiones anteriores, pueden
retirarse solamente assets con hashes antiguos que ningún HTML vigente referencie.
Conservar el respaldo para rollback. No borrar documentos, uploads, .well-known,
reglas del hosting ni carpetas ajenas. Si el respaldo no tenía las cinco carpetas
de rutas o spa.html, retirarlas al hacer rollback para evitar prioridad del HTML nuevo.

Referencias: [Vite SSR](https://vite.dev/guide/ssr),
[React hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot),
[Apache rewrite flags](https://httpd.apache.org/docs/2.4/rewrite/flags.html).

## Imágenes y preparación de medición

`lawyer-portrait.png` y `licenciado.png` eran idénticos byte a byte (1.029.017 bytes).
Ambos componentes ahora usan `licenciado.png`, sin recomprimir ni alterar calidad.
El retrato de inicio permanece eager porque está en el primer viewport. El de Quiénes
Somos conserva lazy y el carrusel debajo del bloque inicial usa lazy. Se conservaron
las demás imágenes, incluidos logo y fotografías; una conversión WebP/AVIF con
comparación visual queda para una fase posterior (logo PNG: 284.078 bytes).

No se instala Analytics ni se envían datos nuevos. Los elementos usan `data-event`:
`whatsapp_click`, `phone_click`, `contact_submit` (intento), `document_purchase_start`
y `document_download` (clic). Las consultas específicas llevan `data-intent="service_inquiry"`
y `data-service`. Los documentos llevan `data-document` con su identificador público.
El evento DOM `site:conversion` marca `contact_submit_success` solo tras respuesta
exitosa y `document_purchase_verified` solo tras verificación del backend. No incluye
nombre, correo, mensaje, ID de orden ni URL firmada. La compra inicial no cuenta como
venta; el clic de descarga no demuestra descarga completada. Un integrador futuro
puede escuchar estos eventos/atributos sin modificar los flujos actuales.
