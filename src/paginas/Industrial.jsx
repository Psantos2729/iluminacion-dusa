import { useState } from 'react';
import { industrial, negocio } from '../contenido.js';
import BotonWA from '../componentes/BotonWA.jsx';
import { ruta as pub } from '../lib/ruta.js';
import { useContador } from '../hooks/useContador.js';

const fmt = (n) => n.toLocaleString('es-GT');

function Explorador({ familia }) {
  const [i, setI] = useState(0);
  const m = familia.modelos[Math.min(i, familia.modelos.length - 1)];
  const max = Math.max(...familia.modelos.map((x) => x.lm));
  const lm = useContador(m.lm);
  return (
    <div className="expl">
      <div className="expl__chips" role="group" aria-label={`Potencia de ${familia.nombre}`}>
        {familia.modelos.map((x, k) => (
          <button key={x.cod} type="button" className="chip" aria-pressed={k === i} onClick={() => setI(k)}>{x.w} W</button>
        ))}
      </div>
      <div className="expl__vista">
        <p className="expl__lm" aria-live="polite"><span className="expl__num">{fmt(lm)}</span> lúmenes</p>
        <div className="expl__barra" aria-hidden="true"><span style={{ transform: `scaleX(${m.lm / max})` }} /></div>
        <p className="nota t-small">{familia.nombre} {m.w} W · código {m.cod}</p>
      </div>
    </div>
  );
}

export default function Industrial() {
  const [fam, setFam] = useState(industrial.familias[0].id);
  const f = industrial.familias.find((x) => x.id === fam);
  return (
    <>
      <section className="envoltura encabezado">
        <h1 className="t-display">Alumbrado<br />industrial</h1>
        <p className="t-lead">Línea {industrial.marca} para bodegas, calles, canchas y exteriores. Elige la familia y la potencia para ver sus lúmenes.</p>
      </section>

      <figure className="envoltura foto-ancha">
        <div className="foto"><img src={pub('fotos/estadio.webp')} alt="Estadio de noche con reflectores encendidos sobre la cancha" width="1591" height="1061" /></div>
        <figcaption className="pie-foto">Reflectores para canchas y estadios, de la línea {industrial.marca}.</figcaption>
      </figure>

      <section className="envoltura seccion" aria-labelledby="h-expl">
        <h2 id="h-expl" className="sr-only">Explorador de modelos</h2>
        <div className="fams" role="tablist" aria-label="Familias">
          {industrial.familias.map((x) => (
            <button key={x.id} type="button" role="tab" className="fam" aria-selected={x.id === fam} onClick={() => setFam(x.id)}>{x.nombre}</button>
          ))}
        </div>
        <div role="tabpanel" className="panel">
          <p className="nota">{f.ficha}</p>
          <Explorador key={f.id} familia={f} />
        </div>
      </section>

      <section className="envoltura seccion" aria-labelledby="h-mas">
        <h2 id="h-mas" className="t-head">También en el catálogo</h2>
        <ul className="mas">{industrial.tambien.map((t) => <li key={t} className="t-lead">{t}</li>)}</ul>
        <p className="nota t-small">Datos del catálogo {industrial.marca}. Disponibilidad y precios de {negocio.nombre} se confirman al cotizar.</p>
      </section>

      <section className="envoltura seccion centro">
        <h2 className="t-head">Cotiza tu proyecto</h2>
        <p className="t-lead">Dinos el modelo y la cantidad.</p>
        <BotonWA texto="Hola, quiero cotizar alumbrado industrial" />
      </section>
    </>
  );
}
