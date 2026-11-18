import { negocio, pendientes } from '../contenido.js';
import BotonWA from '../componentes/BotonWA.jsx';
import { igUrl } from '../lib/wa.js';

export default function Contacto() {
  return (
    <>
      <section className="envoltura encabezado">
        <h1 className="t-display">Contacto</h1>
        <p className="t-lead">Hoy la forma más rápida de llegar a nosotros es el mensaje directo de Instagram.</p>
        <div className="acciones">
          <BotonWA />
          <a className="enlace" href={igUrl()} target="_blank" rel="noopener">Ver @{negocio.instagram}</a>
        </div>
      </section>
      <section className="envoltura seccion">
        <h2 className="t-head">Datos del negocio</h2>
        <dl className="datos">
          <div><dt>Teléfono / WhatsApp</dt><dd>{negocio.telefono}</dd></div>
          <div><dt>Dirección</dt><dd>{negocio.direccion}</dd></div>
          <div><dt>Horario</dt><dd>{negocio.horarioTexto}</dd></div>
        </dl>
        <p className="nota t-small pendiente">Pendiente del cliente: {pendientes.join(', ')}.</p>
      </section>
    </>
  );
}
