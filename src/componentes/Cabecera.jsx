import { negocio, nav } from '../contenido.js';
import BotonWA from './BotonWA.jsx';

export default function Cabecera({ ruta }) {
  return (
    <header className="cabecera">
      <div className="cabecera__in envoltura">
        <a className="marca" href="#/"><span className="marca__foco" aria-hidden="true" />{negocio.nombre}</a>
        <nav className="nav" aria-label="Principal">
          <ul>{nav.map((n) => <li key={n.ruta}><a href={'#' + n.ruta} aria-current={ruta === n.ruta ? 'page' : undefined}>{n.texto}</a></li>)}</ul>
        </nav>
        <BotonWA className="btn btn--chico">Cotizar</BotonWA>
      </div>
    </header>
  );
}
