import { negocio, nav } from '../contenido.js';
import { igUrl } from '../lib/wa.js';

export default function Pie() {
  return (
    <footer className="pie">
      <div className="pie__in envoltura">
        <div>
          <h2>Tu espacio, tu esencia, tu luz</h2>
          <nav className="pie__nav" aria-label="Secciones del sitio">
            <ul>{nav.map((n) => <li key={n.ruta}><a href={'#' + n.ruta}>{n.texto}</a></li>)}</ul>
          </nav>
        </div>
        <ul className="pie__lineas">
          <li><a href={igUrl()} target="_blank" rel="noopener">Instagram @{negocio.instagram}</a></li>
          <li>Teléfono: {negocio.telefono}</li>
          <li>Dirección: {negocio.direccion}</li>
        </ul>
        <p className="pie__imprenta">{negocio.nombre}, {negocio.ciudad}</p>
      </div>
    </footer>
  );
}
