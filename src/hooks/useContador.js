import { useEffect, useRef, useState } from 'react';

/* Número que sube hasta `meta` con requestAnimationFrame (sin librerías). Respeta prefers-reduced-motion. */
export function useContador(meta, ms = 600) {
  const [v, setV] = useState(meta);
  const desde = useRef(meta);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(meta); desde.current = meta; return; }
    const a = desde.current, t0 = performance.now();
    let id;
    const paso = (t) => {
      const p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3);
      const x = Math.round(a + (meta - a) * e);
      setV(x); desde.current = x;
      if (p < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [meta, ms]);
  return v;
}
