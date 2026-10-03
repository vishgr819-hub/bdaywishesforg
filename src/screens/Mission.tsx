import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Reactor } from '../components/Reactor';
import { Dialogue } from '../components/Dialogue';

export function Briefing({ onNext }: { onNext: () => void }) {
  const [talked, setTalked] = useState(false);
  return (
    <>
      <Dialogue lines={['The suit is offline.', 'The reactor is at 3%.', 'And somehow, this is your responsibility.', 'Good luck, birthday human.']} onDone={() => setTalked(true)} />
      <div className="panel">
        <small>Mission objective</small>
        <h2>Power the arc reactor</h2>
        <p>Required power: 100%</p>
      </div>
      {talked && <motion.button className="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onNext}>Power up</motion.button>}
    </>
  );
}

export function Game({ onNext }: { onNext: () => void }) {
  const [p, setP] = useState(3);
  const [msg, setMsg] = useState('Press and hold the reactor to charge it.');
  const hold = useRef(false);
  const seen = useRef(new Set<number>());

  useEffect(() => {
    const id = setInterval(() => { if (hold.current) setP(v => Math.min(100, v + 1.1)); }, 40);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const say = (m: number, t: string) => { if (p >= m && !seen.current.has(m)) { seen.current.add(m); setMsg(t); } };
    say(50, '“Halfway there.”');
    say(80, '“Okay, don’t get distracted.”');
    if (p >= 100 && !seen.current.has(100)) {
      seen.current.add(100); hold.current = false;
      setMsg('“Cute. You actually did it.”');
      confetti({ particleCount: 70, spread: 100, origin: { y: 0.45 }, colors: ['#5ff3ff', '#a6f0cf', '#f0c05a'] });
      setTimeout(onNext, 2600);
    }
  }, [p]); // eslint-disable-line react-hooks/exhaustive-deps

  const on = (v: boolean) => () => { hold.current = v && p < 100; };
  const key = (v: boolean) => (e: React.KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); hold.current = v && p < 100; } };

  return (
    <>
      <div className="readout">{String(Math.round(p)).padStart(2, '0')}<small>%</small></div>
      <button className="reactor-btn" aria-label="Hold to charge the arc reactor"
        onPointerDown={on(true)} onPointerUp={on(false)} onPointerLeave={on(false)} onPointerCancel={on(false)}
        onKeyDown={key(true)} onKeyUp={key(false)} onContextMenu={e => e.preventDefault()}>
        <Reactor power={p} size={260} />
      </button>
      <p className="jarvis">{msg}</p>
      {p >= 100 && <h2>Full power</h2>}
    </>
  );
}
