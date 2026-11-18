# Fotos del cliente y su Instagram: qué se puede y qué no

Probado y verificado en noviembre de 2026. Meta cambia sus reglas seguido.

## Lo que probamos
- Un perfil público de Instagram abierto SIN sesión muestra la biografía, los seguidores y los nombres de las
  historias destacadas, pero tapa las publicaciones con un aviso para registrarse o iniciar sesión. Eso significa que
  el navegador no puede "leer" las fotos de un perfil, y no se debe intentar saltar ese aviso.
- Útil de ese vistazo: biografía (dirección, WhatsApp, enlace), nombres de destacadas (suelen ser los servicios) y el
  tono de los textos. Todo se confirma con el cliente.

## Orden recomendado
1. **El cliente descarga y te manda sus fotos.** Más fácil: Instagram, Centro de cuentas, "Descargar tu información",
   elegir fotos y videos. Llega un ZIP al correo (el enlace dura unos 4 días). Mejor: pídele solo 10 a 15 fotos
   que él elija, por WhatsApp o Drive, con permiso de uso. Soltarlas en `fotos-originales/` y correr
   `scripts/preparar_fotos.py`.
2. **Incrustar publicaciones concretas (oficial).** oEmbed sin token desde junio de 2026:
   `https://graph.facebook.com/v25.0/instagram_oembed?url=URL_DEL_POST`. Devuelve código `html`, no imágenes. Sirve
   para "Síguenos en Instagram", no para la galería 3D.
3. **API oficial con permiso del cliente (avanzado).** La API de Instagram con Instagram Login lee las fotos de una
   cuenta profesional. En modo desarrollo solo funciona con cuentas con rol en tu app de Meta (testers), así que
   para clientes reales exige App Review y verificación del negocio. Solo vale la pena si ofreces un servicio
   recurrente de "feed automático".

## Lo que NO
- Scraping masivo, proxies o saltarse el aviso de login. Las condiciones de Instagram prohíben la recolección
  automatizada sin autorización, aunque el perfil sea público, y cada foto sigue siendo de su autor.
- Demos con fotos del Instagram del cliente sin que él lo sepa.

## Qué puede automatizar Claude (y qué no)
- Sí: procesar la carpeta de fotos (descartar duplicadas, pasar a .webp, paleta, tema, proporción), llenar
  `contenido.js`, elegir el tema, armar la web, revisarla en móvil y escritorio.
- Sí, si el cliente te manda el ZIP de Instagram: extraer las fotos de la carpeta de publicaciones y la
  biografía/archivos de perfil del ZIP y correr el mismo flujo.
- No: bajar solo las fotos de un perfil ajeno.
