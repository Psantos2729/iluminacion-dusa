import { useState } from 'react';
import { negocio, productos } from '../contenido.js';
import BotonWA from '../componentes/BotonWA.jsx';
import { ruta as pub } from '../lib/ruta.js';
import Reveal from '../componentes/Reveal.jsx';
import Brillo from '../componentes/Brillo.jsx';
import FoldText from '../reactbits/FoldText/FoldText.jsx';
import '../reactbits/FoldText/FoldText.css';
import ElectricLogo from '../reactbits/ElectricLogo/ElectricLogo.jsx';
import '../reactbits/ElectricLogo/ElectricLogo.css';

/* Silueta de foco (stand-in del logo, que aún no llega): ElectricLogo traza los bordes de esta forma. */
const FOCO = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path d="M32 4a19 19 0 0 0-11 34.5V45h22v-6.5A19 19 0 0 0 32 4z" fill="#fff"/><rect x="21" y="48" width="22" height="4" fill="#fff"/><rect x="23" y="55" width="18" height="4" fill="#fff"/></svg>'
)}`;

export default function Inicio() {
  const [on, setOn] = useState(false);
  return (
    <>
      <Brillo>
        <section className={`heroe envoltura ${on ? 'is-on' : ''}`} aria-labelledby="h1">
          <div className="heroe__foco" aria-hidden="true">
            <ElectricLogo src={FOCO} color="#FFE2A8" glowColor="#F2A93B" scale={0.8} intensity={on ? 1.2 : 0.35} glow={on ? 1.2 : 0.4} interactive={on} theme="dark" />
          </div>
          <button type="button" className="interruptor" aria-pressed={on} onClick={() => setOn(!on)}>
            <span className="interruptor__pista" aria-hidden="true"><span /></span>{on ? 'Apagar la luz' : 'Prender la luz'}
          </button>
          <h1 id="h1" className="heroe__t">
            <span><FoldText text="Tu espacio," fontSize="clamp(2.1rem, 8.4vw, 9.5rem)" fontWeight={500} /></span>
            <span><FoldText text="tu esencia, tu" fontSize="clamp(2.1rem, 8.4vw, 9.5rem)" fontWeight={500} />{' '}<FoldText text="luz." fontSize="clamp(2.1rem, 8.4vw, 9.5rem)" fontWeight={500} color="#F2A93B" style={{ fontStyle: 'italic' }} /></span>
          </h1>
          <div className="heroe__pie">
            <p className="t-lead">{negocio.nombre}: lámparas, ventiladores, espejos LED y alumbrado público LED. Cuéntanos qué necesitas y te cotizamos.</p>
            <BotonWA />
          </div>
        </section>
      </Brillo>

      <section className="seccion envoltura" aria-labelledby="h-lista">
        <h2 id="h-lista" className="t-head lista-t">Lo que encuentras<br />en DUSA</h2>
        <ol className="lista">
          {productos.map((p, i) => (
            <Reveal as="li" key={p.nombre} i={i % 4} className="lista__fila">
              <span className="lista__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="lista__nombre">{p.nombre}</span>
              <span className="lista__texto nota">{p.texto}</span>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="seccion envoltura dueto" aria-labelledby="h-cancha">
        <figure className="foto dueto__foto">
          <img src={pub('fotos/cancha.webp')} alt="Cancha de fútbol de noche iluminada por cuatro reflectores" width="1200" height="1164" loading="lazy" />
        </figure>
        <div className="dueto__texto">
          <h2 id="h-cancha" className="t-head">De la sala<br />a la cancha</h2>
          <p className="t-lead">También iluminamos exteriores: reflectores, alumbrado público y luminarias solares de la línea Lithium Lighting.</p>
          <a className="enlace" href="#/industrial">Ver alumbrado industrial</a>
        </div>
      </section>

      <section className="campo-acento banda" aria-labelledby="h-ofertas">
        <div className="envoltura banda__in">
          <h2 id="h-ofertas" className="t-head">Ofertas especiales<br />en Instagram</h2>
          <p className="t-lead">Publicamos promociones, como lámparas de pared con plafón gratis. Escríbenos y te decimos cuáles siguen vigentes.</p>
          <BotonWA className="btn btn--oscuro">Preguntar por ofertas</BotonWA>
        </div>
      </section>
    </>
  );
}
