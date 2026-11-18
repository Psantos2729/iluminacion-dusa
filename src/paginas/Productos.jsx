import { productos } from '../contenido.js';
import BotonWA from '../componentes/BotonWA.jsx';

export default function Productos() {
  return (
    <>
      <section className="envoltura encabezado">
        <h1 className="t-display">Productos</h1>
        <p className="t-lead">Estas son las líneas que mostramos en Instagram. Precios y existencias se confirman al cotizar.</p>
      </section>
      <section className="envoltura seccion">
        <ul className="productos">
          {productos.map((p) => (
            <li key={p.nombre}>
              <article className="producto">
                <h2 className="t-lead">{p.nombre}</h2>
                <p className="nota">{p.texto}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section className="envoltura seccion centro">
        <h2 className="t-head">¿No ves lo que buscas?</h2>
        <p className="t-lead">Dinos qué espacio quieres iluminar.</p>
        <BotonWA />
      </section>
    </>
  );
}
