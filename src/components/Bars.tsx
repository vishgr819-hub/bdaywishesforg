import { motion } from 'framer-motion';
import type { Stat } from '../config';

export function Bars({ stats }: { stats: Stat[] }) {
  return (
    <div className="bars">
      {stats.map(([label, v], i) => (
        <div className="bar-row" key={label}>
          <span>{label}</span>
          <div className="track" role="img" aria-label={`${label}: ${v} percent`}>
            <motion.i initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1, delay: 0.25 + i * 0.12, ease: 'easeOut' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
