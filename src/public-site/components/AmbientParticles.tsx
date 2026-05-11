import { motion } from 'framer-motion'

const orbs = [
  {
    top: '8%',
    left: '10%',
    size: 220,
    duration: 20,
    delay: 0,
    opacity: 0.22,
    glow: 'gold',
  },
  {
    top: '18%',
    left: '82%',
    size: 180,
    duration: 23,
    delay: 1.2,
    opacity: 0.16,
    glow: 'beige',
  },
  {
    top: '64%',
    left: '14%',
    size: 240,
    duration: 24,
    delay: 0.6,
    opacity: 0.15,
    glow: 'blue',
  },
  {
    top: '72%',
    left: '78%',
    size: 190,
    duration: 21,
    delay: 1.8,
    opacity: 0.16,
    glow: 'purple',
  },
]

const particles = Array.from({ length: 16 }, (_, index) => ({
  id: `particle-${index}`,
  top: `${8 + ((index * 13) % 84)}%`,
  left: `${6 + ((index * 17) % 88)}%`,
  delay: index * 0.27,
  duration: 7 + (index % 5),
  scale: 0.6 + (index % 4) * 0.12,
}))

export default function AmbientParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {orbs.map((orb, index) => (
        <motion.span
          key={`orb-${index}`}
          className={`absolute rounded-full blur-3xl ${
            orb.glow === 'blue'
              ? 'bg-[radial-gradient(circle,rgba(88,131,204,0.28)_0%,rgba(88,131,204,0.08)_45%,rgba(88,131,204,0)_72%)]'
              : orb.glow === 'purple'
                ? 'bg-[radial-gradient(circle,rgba(112,92,199,0.26)_0%,rgba(112,92,199,0.08)_45%,rgba(112,92,199,0)_72%)]'
                : orb.glow === 'beige'
                  ? 'bg-[radial-gradient(circle,rgba(216,195,165,0.34)_0%,rgba(216,195,165,0.08)_45%,rgba(216,195,165,0)_72%)]'
                  : 'bg-[radial-gradient(circle,rgba(201,164,92,0.42)_0%,rgba(201,164,92,0.08)_45%,rgba(201,164,92,0)_72%)]'
          }`}
          style={{
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            opacity: orb.opacity,
          }}
          animate={{
            x: [0, 24, -14, 0],
            y: [0, -18, 12, 0],
            scale: [1, 1.06, 0.95, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="ambient-vignette absolute inset-0" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-brand-beige/35 shadow-[0_0_14px_rgba(216,195,165,0.25)]"
          style={{
            top: particle.top,
            left: particle.left,
            scale: particle.scale,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.18, 0.52, 0.18],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
