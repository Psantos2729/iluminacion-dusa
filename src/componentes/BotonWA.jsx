import { waUrl } from '../lib/wa.js';
import { negocio } from '../contenido.js';
export default function BotonWA({ children, texto, className = 'btn', ...r }) {
  return <a className={className} href={waUrl(texto)} target="_blank" rel="noopener" {...r}>{children || (negocio.whatsapp ? 'Cotizar por WhatsApp' : 'Cotizar por Instagram')}</a>;
}
