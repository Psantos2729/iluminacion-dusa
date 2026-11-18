import { useEffect, useState } from 'react';
import GlowCursor from '../reactbits/GlowCursor/GlowCursor.jsx';
import '../reactbits/GlowCursor/GlowCursor.css';

/* Estela de luz ámbar que sigue al cursor. Solo con mouse (no en táctil) y sin "reducir movimiento". */
export default function Brillo({ children, className = '' }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const f = () => setOn(q.matches);
    f(); q.addEventListener('change', f);
    return () => q.removeEventListener('change', f);
  }, []);
  return (
    <GlowCursor color="#F2A93B" secondaryColor="#FFD58A" intensity={1} glow={1} trailWidth={3} quality="medium" clickBurst={false} enabled={on} className={`brillo ${className}`}>
      {children}
    </GlowCursor>
  );
}
