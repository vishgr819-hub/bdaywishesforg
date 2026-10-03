import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import { Bars } from '../components/Bars';
import { Dialogue } from '../components/Dialogue';

export function Decrypt({ onNext }: { onNext: () => void }) {
  const [v, setV] = useState('');
  const [msg, setMsg] = useState('');
  const [ok, setOk] = useState(false);
  const [tries, setTries] = useState(0);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (v.trim().toLowerCase() === config.password.toLowerCase()) {
      setOk(true); setMsg(`ACCESS GRANTED. Welcome back, ${config.name}.`); setTimeout(onNext, 1700);
    } else {
      setTries(t => t + 1); setMsg('ACCESS DENIED. Nice try. But I’m afraid that’s not very birthday-human of you.');
    }
  };
  return (
    <form onSubmit={submit} className="panel" style={{ width: '100%' }}>
      <small>Stark security system</small>
      <h2>{ok ? '🔓 Unlocked' : '🔒 Classified birthday files'}</h2>
      <motion.input key={tries} animate={{ x: tries ? [0, -9, 9, -6, 6, 0] : 0 }} transition={{ duration: 0.4 }}
        value={v} onChange={e => setV(e.target.value)} placeholder="Password" aria-label="Password" autoComplete="off" autoCapitalize="off" disabled={ok} />
      <p className={ok ? 'ok' : 'bad'} role="status">{msg || `Hint: ${config.passwordHint}`}</p>
      <button className="btn" type="submit" disabled={ok}>Decrypt</button>
    </form>
  );
}

const NAMES = ['Subject profile', 'System analysis', 'Incident report', 'Stark’s personal note'];

export function FileList({ opened, onOpen, onNote }: { opened: number[]; onOpen: (n: number) => void; onNote: () => void }) {
  const [view, setView] = useState<number | null>(null);
  const ready = [0, 1, 2].every(n => opened.includes(n));

  if (view !== null) {
    const { profile, analysis, incident } = config;
    return (
      <>
        <small>File 00{view + 1}</small>
        <h2>{NAMES[view]}</h2>
        {view === 0 && (<>
          <div className="panel"><p>Name: {config.name}<br />Known aliases: {profile.nickname}</p></div>
          <Bars stats={profile.stats} />
          <Dialogue lines={['Analysis complete.', 'Results are… concerning.', 'But you’re adorable, so I’ll allow it.']} />
        </>)}
        {view === 1 && (<><Bars stats={analysis} /><Dialogue lines={['Diagnostics finished.', 'I have questions.']} /></>)}
        {view === 2 && (
          <div className="panel report">
            <small>Incident report #047</small>
            <p><b>Mission:</b> {incident.mission}</p>
            <p><b>Damage:</b> {incident.damage}</p>
            <p><b>Casualties:</b> {incident.casualties}</p>
            <p><b>Regrets:</b> 0</p>
            <p><b>Would we do it again?</b> Absolutely.</p>
          </div>
        )}
        <button className="btn" onClick={() => setView(null)}>Back to files</button>
      </>
    );
  }
  return (
    <>
      <h2>Classified birthday files</h2>
      <div className="files">
        {NAMES.slice(0, 3).map((n, i) => (
          <button key={n} className="btn file" onClick={() => { onOpen(i); setView(i); }}>
            <small>File 00{i + 1}</small>{n}{opened.includes(i) ? ' ✓' : ''}
          </button>
        ))}
        <button className="btn file" disabled={!ready} onClick={onNote}>
          <small>File 004</small>{ready ? NAMES[3] : 'Locked 🔒'}
        </button>
      </div>
      <p className="jarvis">{ready ? '“File 004 was not on my list.”' : '“Open the first three. In any order.”'}</p>
    </>
  );
}

// File 004: deliberately almost no motion. Slow fade-ins, nothing else.
export function Note({ onNext }: { onNext: () => void }) {
  const paras = config.personalMessage.trim().split(/\n\s*\n/);
  const intro = ['This file wasn’t supposed to be here.', 'It’s not really a Stark Labs file.', 'It’s just something I wanted you to know...'];
  const all = [...intro, ...paras];
  return (
    <div className="note">
      <div className="ember" />
      {all.map((t, i) => (
        <motion.p key={i} className={i < intro.length ? 'intro' : 'msg'} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 + i * 2.6 }}>{t}</motion.p>
      ))}
      <motion.button className="btn quiet" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1.5 + all.length * 2.6 }} onClick={onNext}>
        Continue
      </motion.button>
    </div>
  );
}
