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
2. Subir el **contenido** de `dist/` a `public_html`: `index.html`, `assets/`, `.htaccess`,
   `robots.txt`, `sitemap.xml`, `llms.txt`, favicon, documentos PDF/DOC/DOCX/ZIP y demás
   archivos públicos generados. No subir la carpeta `dist` como subcarpeta.
3. Subir primero assets y documentos; reemplazar después `index.html` y los archivos
   de rastreo. Reemplazar únicamente archivos correspondientes a esta aplicación.
4. **No borrar** otros sitios, subdirectorios, `.well-known`, archivos de validación,
   configuración de Hostinger, uploads, documentos existentes ni los assets del build
   anterior durante la transición. No subir `.env`, fuentes, `.git` o `node_modules`.
5. Antes de reemplazar `.htaccess`, comprobar si ya existe en `public_html` y comparar
   sus reglas. Integrar el fallback SPA después de reglas específicas existentes;
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
7. Para rollback, restaurar desde la copia previa `index.html`, assets, documentos,
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

## Prerender/SSG: siguiente tarea

Esta fase mantiene el render del cliente. **Los metadatos de rutas requieren JavaScript**;
no se presenta este trabajo como prerender ni como HTML completo rastreable sin JS.
Se evaluó usar un navegador headless sobre `vite preview` para guardar el HTML de las
seis rutas: evita migrar de framework, pero capturar el DOM actual también captura
animaciones, contenido inicialmente oculto, horarios dinámicos y la integración de
PayPal. El código actual usa `createRoot`, no hidratación; cambiar ese contrato merece
una fase separada para evitar parpadeos y diferencias de hidratación.

Siguiente tarea propuesta: separar contenido estático de integraciones del navegador,
evaluar renderToString + StaticRouter con un entry SSR de Vite o un prerender headless,
generar seis HTML con metadatos/schema desde las mismas fuentes y verificar contenido
sin JS, hidratación, React Router, FAQ, formularios y compra. Asegurar reglas Apache
que sirvan los HTML de ruta sin introducir redirecciones/canonical inconsistentes.

Referencias: [Vite static deploy](https://vite.dev/guide/static-deploy),
[Vite SSR](https://vite.dev/guide/ssr),
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
