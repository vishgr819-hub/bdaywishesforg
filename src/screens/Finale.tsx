import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { config } from '../config';
import { Reactor } from '../components/Reactor';
import { Dialogue } from '../components/Dialogue';

export function FinalProtocol({ onNext }: { onNext: () => void }) {
  const [talked, setTalked] = useState(false);
  return (
    <>
      <small>Arc reactor // power 100%</small>
      <Reactor power={100} size={230} />
      <Dialogue lines={['All systems operational.', 'Birthday mission complete.', 'One final protocol remains.']} onDone={() => setTalked(true)} />
      {talked && <motion.button className="btn gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onNext}>Initiate birthday protocol</motion.button>}
    </>
  );
}

const Helmet = () => (
  <svg viewBox="0 0 100 110" width="120" aria-hidden="true">
    <path d="M15 50C15 20 35 8 50 8s35 12 35 42v22c0 14-12 30-35 30S15 86 15 72z" fill="#c0102f" />
    <path d="M26 44h48l-5 30c-2 8-10 14-19 14s-17-6-19-14z" fill="#f0c05a" />
    <path d="M31 54l15 4-2 7-14-3zM69 54l-15 4 2 7 14-3z" fill="#5ff3ff" />
  </svg>
);

export function Reveal() {
  const still = useReducedMotion();
  const [phase, setPhase] = useState<'dark' | 'thump' | 'show'>('dark');

  useEffect(() => {
    let off = false;
    const w = (ms: number) => new Promise(r => setTimeout(r, still ? 60 : ms));
    const fire = () => confetti({ particleCount: 90, spread: 90, origin: { y: 0.3 }, colors: ['#f0c05a', '#c0102f', '#5ff3ff', '#ff9fb2', '#a6f0cf'] });
    (async () => {
      await w(1300); if (off) return; setPhase('thump');
      await w(4300); if (off) return; setPhase('show'); fire();
      for (let i = 0; i < 4 && !off; i++) { await w(800); fire(); }
    })();
    return () => { off = true; };
  }, [still]);

  if (phase === 'dark') return <div style={{ height: 200 }} />;
  if (phase === 'thump') return (
    <motion.div style={{ width: 70 }}
      animate={{ scale: [0.8, 1.25, 0.8, 0.8, 1.5, 0.8, 0.8, 3, 0.4], opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0] }}
      transition={{ duration: 4.2, times: [0, 0.1, 0.2, 0.42, 0.52, 0.62, 0.8, 0.92, 1] }}>
      <Reactor power={100} size={70} />
    </motion.div>
  );
  return (
    <>
      <motion.div initial={{ scale: 0, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 11 }}><Helmet /></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Happy birthday, {config.name} ❤️</motion.h1>
      <motion.div className="final-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        {config.finalMessage.split('\n').map(l => <p key={l}>{l}</p>)}
        <p className="sig">— JARVIS<br /><i>and one very biased human</i></p>
      </motion.div>
      <motion.a className="btn gold" href={config.giftUrl} target="_blank" rel="noreferrer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        Open your gift 🎁
      </motion.a>
    </>
  );
}
