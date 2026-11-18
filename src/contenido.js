/* Todo lo que cambia por cliente vive aquí. "Pendiente" = dato que el cliente aún no dio. */
export const negocio = {
  nombre: 'Iluminación DUSA',
  tipo: 'Tienda de iluminación',
  tipoSchema: 'LocalBusiness',
  zona: 'zona pendiente',
  ciudad: 'Guatemala',
  direccion: 'Pendiente',
  telefono: 'Pendiente',
  whatsapp: '',                       // vacío = los botones llevan al mensaje directo de Instagram
  instagram: 'iluminaciondusa',
  mensajeWA: 'Hola, quiero cotizar iluminación',
  url: 'https://psantos2729.github.io/iluminacion-dusa',
  descripcion: 'Iluminación DUSA: lámparas de pared, de techo y para riel, ventiladores, espejos LED y alumbrado público LED. Pide tu cotización por Instagram.',
  ogImagen: 'og.svg',
  horario: {},
  horarioTexto: 'Horario pendiente.'
};

export const nav = [
  { texto: 'Inicio', ruta: '/' },
  { texto: 'Productos', ruta: '/productos' },
  { texto: 'Industrial', ruta: '/industrial' },
  { texto: 'Contacto', ruta: '/contacto' }
];

/* Categorías vistas en las publicaciones del Instagram del negocio. Sin precios ni modelos inventados. */
export const productos = [
  { nombre: 'Lámparas de pared', texto: 'Aplique para pasillos, salas y recámaras.' },
  { nombre: 'Plafones', texto: 'Luz de techo para cada cuarto de la casa.' },
  { nombre: 'Lámparas para riel', texto: 'Focos tipo spot que se mueven a lo largo del riel, en blanco y negro.' },
  { nombre: 'Lámparas decorativas', texto: 'De techo, con varios brazos y tulipas de vidrio.' },
  { nombre: 'Ventiladores de techo', texto: 'Con luz, en varios acabados de madera y metal.' },
  { nombre: 'Espejos LED con cristal', texto: 'Redondos y rectangulares, con luz integrada.' },
  { nombre: 'Alumbrado público LED', texto: 'Luminarias tipo cobra de la marca Lithium Lighting, hasta 50,000 horas de vida.' },
  { nombre: 'Cobra solar', texto: 'Luminaria solar de 90 W para exteriores.' }
];

/* Catálogo Lithium Lighting (PDF del cliente). Datos tal como aparecen: potencia, lúmenes y código. */
export const industrial = {
  marca: 'Lithium Lighting',
  familias: [
    { id: 'reflector', nombre: 'Reflectores', ficha: 'Luz LED 6,000 K · IP65 · 100-277 V',
      modelos: [
        { w: 20, lm: 2000, cod: '60055B-DL' }, { w: 30, lm: 3000, cod: '60055C-DL' }, { w: 50, lm: 5000, cod: '60055D-DL' },
        { w: 100, lm: 10000, cod: '60055F-DL' }, { w: 150, lm: 15000, cod: '60055G-DL' }, { w: 200, lm: 20000, cod: '60055H-DL' },
        { w: 250, lm: 22500, cod: '60055K-DL' }, { w: 300, lm: 30000, cod: '60055J-DL' }, { w: 400, lm: 40000, cod: '60055I-DL' }
      ] },
    { id: 'ufo', nombre: 'High bay UFO', ficha: 'Luz LED 6,000 K · IP65 · 100-277 V',
      modelos: [
        { w: 100, lm: 12000, cod: '60056A' }, { w: 150, lm: 18000, cod: '60056D' }, { w: 200, lm: 24000, cod: '60056B' }, { w: 250, lm: 30000, cod: '60056E' }
      ] },
    { id: 'cobra', nombre: 'Alumbrado público cobra', ficha: '6,000 K · IP65 · 100-277 V',
      modelos: [
        { w: 50, lm: 4000, cod: '60066A' }, { w: 100, lm: 10000, cod: '60066B-2' }, { w: 150, lm: 15000, cod: '60066C-2' }, { w: 200, lm: 20000, cod: '60066D-2' }
      ] },
    { id: 'solar', nombre: 'Cobra solar', ficha: '6,000 K · IP65 · 50,000 horas de vida · carga 6 h, descarga 12 h',
      modelos: [
        { w: 90, lm: 14400, cod: '60086E' }, { w: 120, lm: 19200, cod: '60086G' }, { w: 150, lm: 24000, cod: '60086L' }
      ] }
  ],
  tambien: ['Paneles LED 1x2, 2x2 y 2x4', 'Lámpara de emergencia', 'Lámpara lineal y para polvo y humedad', 'Lámpara para gasolinera, wall pack y estadio', 'Bombillas LED (A60, PAR, MR16, tubo y más)']
};

export const pendientes = ['teléfono / WhatsApp', 'dirección y zona', 'horario de atención', 'fotos de producto sin texto encima'];
