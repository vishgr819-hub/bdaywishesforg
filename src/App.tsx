import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Boot } from './screens/Boot';
import { Briefing, Game } from './screens/Mission';
import { Decrypt, FileList, Note } from './screens/Files';
import { FinalProtocol, Reveal } from './screens/Finale';

type Stage = 'boot' | 'brief' | 'game' | 'decrypt' | 'files' | 'note' | 'final' | 'reveal';

export default function App() {
  const [stage, setStage] = useState<Stage>('boot');
  const [opened, setOpened] = useState<number[]>([]);
  const go = (s: Stage) => () => setStage(s);

  return (
    <div className="app" data-stage={stage}>
      <div className="frame" />
      <AnimatePresence mode="wait">
        <motion.main key={stage} className="stage"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: stage === 'note' || stage === 'reveal' ? 1.8 : 0.45 }}>
          {stage === 'boot' && <Boot onNext={go('brief')} />}
          {stage === 'brief' && <Briefing onNext={go('game')} />}
          {stage === 'game' && <Game onNext={go('decrypt')} />}
          {stage === 'decrypt' && <Decrypt onNext={go('files')} />}
          {stage === 'files' && <FileList opened={opened} onOpen={n => setOpened(o => (o.includes(n) ? o : [...o, n]))} onNote={go('note')} />}
          {stage === 'note' && <Note onNext={go('final')} />}
          {stage === 'final' && <FinalProtocol onNext={go('reveal')} />}
          {stage === 'reveal' && <Reveal />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
