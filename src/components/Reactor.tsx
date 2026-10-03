import { motion, useReducedMotion } from 'framer-motion';

const HEART = 'M50 88C14 62 8 38 22 24c10-10 22-6 28 4 6-10 18-14 28-4 14 14 8 38-28 64z';

// Heart-shaped arc reactor. `power` (0-100) fills it like liquid and speeds up the rings.
export function Reactor({ power = 100, size = 180 }: { power?: number; size?: number }) {
  const still = useReducedMotion();
  const spin = (s: number, dir = 1) =>
    still ? {} : { animate: { rotate: 360 * dir }, transition: { duration: s, repeat: Infinity, ease: 'linear' as const } };
  return (
    <div style={{ width: size, height: size }} aria-hidden="true">
      <motion.svg
        viewBox="0 0 100 100" width="100%" height="100%"
        animate={still ? undefined : { scale: [1, 1.04, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: `drop-shadow(0 0 ${6 + power * 0.22}px rgba(95,243,255,${0.3 + power * 0.006}))`, overflow: 'visible' }}
      >
        <defs><clipPath id="heart"><path d={HEART} /></clipPath></defs>
        <motion.g style={{ transformOrigin: '50px 50px' }} {...spin(28 - power * 0.2)}>
          <circle cx="50" cy="50" r="49" fill="none" stroke="#f0c05a" strokeWidth=".7" strokeDasharray="1.5 4" />
        </motion.g>
        <motion.g style={{ transformOrigin: '50px 50px' }} {...spin(40 - power * 0.3, -1)}>
          <circle cx="50" cy="50" r="45" fill="none" stroke="#5ff3ff" strokeWidth=".9" strokeDasharray="16 7 3 7" opacity=".7" />
        </motion.g>
        <path d={HEART} fill="#071a20" />
        <g clipPath="url(#heart)">
          <motion.rect x="0" width="100" height="100" fill="#5ff3ff" opacity=".85"
            animate={{ y: 90 - 70 * (power / 100) }} transition={{ duration: 0.25 }} />
        </g>
        <path d={HEART} fill="none" stroke="#a6f0cf" strokeWidth="1.6" />
        <circle cx="50" cy="48" r="7" fill="#eaffff" opacity={0.35 + power * 0.006} />
      </motion.svg>
    </div>
  );
}
