import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Reactor } from '../components/Reactor';
import { Dialogue } from '../components/Dialogue';

const SYS = ['STARK INDUSTRIES // PRIVATE SYSTEM', '> Initializing...', '> Checking reactor...', '> Checking armor...', '> Checking birthday protocols...'];

export function Boot({ onNext }: { onNext: () => void }) {
  const [n, setN] = useState(0);
  const [talked, setTalked] = useState(false);
  useEffect(() => {
    if (n > SYS.length) return;
    const t = setTimeout(() => setN(v => v + 1), 480);
    return () => clearTimeout(t);
  }, [n]);

  return (
    <>
      <Reactor power={12} size={110} />
      <div className="term">
        {SYS.slice(0, n).map(l => <div key={l}>{l}</div>)}
        {n > SYS.length && <div className="warn">⚠ BIRTHDAY PROTOCOL DETECTED</div>}
      </div>
      {n > SYS.length && <Dialogue lines={['Oh. It’s you.', 'Happy birthday, by the way.', 'But we have a small problem.']} onDone={() => setTalked(true)} />}
      {talked && <motion.button className="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onNext}>Start mission</motion.button>}
    </>
  );
}
