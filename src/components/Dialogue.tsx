import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Types JARVIS lines one after another, then calls onDone.
export function Dialogue({ lines, onDone, speed = 26 }: { lines: string[]; onDone?: () => void; speed?: number }) {
  const still = useReducedMotion();
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState('');

  useEffect(() => {
    if (i >= lines.length) { onDone?.(); return; }
    if (still) { setTxt(lines[i]); const t = setTimeout(() => setI(n => n + 1), 500); return () => clearTimeout(t); }
    let k = 0, next: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      k++; setTxt(lines[i].slice(0, k));
      if (k >= lines[i].length) { clearInterval(id); next = setTimeout(() => setI(n => n + 1), 850); }
    }, speed);
    return () => { clearInterval(id); clearTimeout(next); };
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="jarvis" aria-live="polite">
      {lines.slice(0, i).map(l => <p key={l}>“{l}”</p>)}
      {i < lines.length && <p>“{txt}<span className="caret" />”</p>}
    </div>
  );
}
