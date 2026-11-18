import { useEffect, useState } from 'react';
import { negocio } from './contenido.js';
import Cabecera from './componentes/Cabecera.jsx';
import Pie from './componentes/Pie.jsx';
import Inicio from './paginas/Inicio.jsx';
import Productos from './paginas/Productos.jsx';
import Contacto from './paginas/Contacto.jsx';
import Industrial from './paginas/Industrial.jsx';

const paginas = {
  '/': [Inicio, `${negocio.nombre} | ${negocio.tipo}`],
  '/productos': [Productos, `Productos | ${negocio.nombre}`],
  '/industrial': [Industrial, `Alumbrado industrial | ${negocio.nombre}`],
  '/contacto': [Contacto, `Contacto | ${negocio.nombre}`]
};
const leer = () => { const r = window.location.hash.replace(/^#/, '') || '/'; return paginas[r] ? r : '/'; };

export default function App() {
  const [ruta, setRuta] = useState(leer);
  useEffect(() => {
    const f = () => { setRuta(leer()); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  const [Pagina, titulo] = paginas[ruta];
  useEffect(() => { document.title = titulo; }, [titulo]);
  return (
    <>
      <a className="salto" href="#principal" onClick={(e) => { e.preventDefault(); document.getElementById('principal').focus(); }}>Saltar al contenido</a>
      <Cabecera ruta={ruta} />
      <main id="principal" tabIndex={-1}><Pagina /></main>
      <Pie />
    </>
  );
}
