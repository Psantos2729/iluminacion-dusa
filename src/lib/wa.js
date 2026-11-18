import { negocio } from '../contenido.js';
/* Si hay WhatsApp, abre WhatsApp con el mensaje; si no, el mensaje directo de Instagram. */
export const waUrl = (texto) => negocio.whatsapp
  ? `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(texto || negocio.mensajeWA)}`
  : `https://ig.me/m/${negocio.instagram}`;
export const igUrl = () => `https://www.instagram.com/${negocio.instagram}/`;
