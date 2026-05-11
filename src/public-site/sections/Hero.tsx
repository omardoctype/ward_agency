import { motion } from 'framer-motion'
import logo from '../../assets/logo.png'

const floatingBadges = [
  {
    label: 'Spotify Playlists',
    delay: 0.2,
    position: 'left-2 top-24 sm:left-8 sm:top-32',
  },
  {
    label: 'Live Events',
    delay: 0.45,
    position: 'right-2 top-36 sm:right-10 sm:top-44',
  },
  {
    label: 'Premium Booking',
    delay: 0.7,
    position: 'left-8 bottom-20 sm:left-24 sm:bottom-24',
  },
]

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-16 pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 34, 0], y: [0, -24, 0], opacity: [0.32, 0.52, 0.32] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.32)_0%,rgba(201,164,92,0)_70%)] blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0], opacity: [0.26, 0.44, 0.26] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute -right-14 top-6 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(216,195,165,0.26)_0%,rgba(216,195,165,0)_72%)] blur-3xl"
        />
        <motion.div
          animate={{ rotate: [14, 18, 14], opacity: [0.24, 0.38, 0.24] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="hero-beam absolute -left-20 top-1/2 h-[380px] w-[210px] -translate-y-1/2"
        />
        <motion.div
          animate={{ rotate: [-18, -14, -18], opacity: [0.16, 0.3, 0.16] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="hero-beam hero-beam-right absolute -right-20 top-1/2 h-[360px] w-[210px] -translate-y-1/2"
        />
        <div className="hero-noise absolute inset-0 opacity-70" />
      </div>

      {floatingBadges.map((badge) => (
        <motion.p
          key={badge.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.55, delay: 1 + badge.delay },
            y: { duration: 5.4, repeat: Infinity, ease: 'easeInOut', delay: badge.delay },
          }}
          className={`pointer-events-none absolute ${badge.position} z-[2] rounded-full border border-brand-border/80 bg-black/55 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-brand-beige backdrop-blur-lg sm:px-4 sm:py-2 sm:text-xs`}
        >
          {badge.label}
        </motion.p>
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06 }}
          className="mb-4 rounded-full border border-brand-border/80 bg-black/45 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-beige sm:mb-5"
        >
          Curated Worldwide
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 rounded-3xl border border-brand-border/80 bg-brand-glassStrong p-4 shadow-glow backdrop-blur-2xl sm:mb-8 sm:p-5"
        >
          <div className="relative overflow-hidden rounded-2xl border border-brand-border/70 bg-brand-soft p-3 sm:p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(201,164,92,0.2),transparent_55%)]" />
            <img
              src={logo}
              alt="Ward Agency logo"
              className="relative h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[2.75rem] font-semibold tracking-[0.14em] text-brand-cream sm:text-6xl md:text-7xl"
        >
          WARD AGENCY
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-4 h-px w-36 origin-center bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.32 }}
          className="mt-5 text-[11px] font-medium uppercase tracking-[0.23em] text-brand-beige sm:text-sm"
        >
          DJ Management | Artist Booking | Music Experiences
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.45 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg"
        >
          Discover unique artists, explore their sound, and book unforgettable live
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row"
        >
          <a href="#roster" className="luxury-button w-full sm:w-auto">
            Explore DJs
          </a>
          <a href="#booking" className="luxury-button-ghost w-full sm:w-auto">
            Book an Artist
          </a>
        </motion.div>
      </div>
    </section>
  )
}
