import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  Clapperboard,
  Disc3,
  Handshake,
  ListMusic,
  Palette,
} from 'lucide-react'

const services = [
  {
    title: 'DJ Booking',
    description:
      'Book curated DJs for clubs, private events, festivals and brand activations.',
    icon: Disc3,
  },
  {
    title: 'Artist Management',
    description:
      'Career direction, opportunities, communication, image and professional growth.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Event Experiences',
    description:
      'Music-driven experiences with strong atmosphere, sound and visual identity.',
    icon: Clapperboard,
  },
  {
    title: 'Brand Collaborations',
    description:
      'Connect artists with brands, campaigns, launches and cultural activations.',
    icon: Handshake,
  },
  {
    title: 'Playlist Curation',
    description:
      'Create custom music directions and playlists for events, venues and campaigns.',
    icon: ListMusic,
  },
  {
    title: 'Creative Direction',
    description:
      'Visual identity, content direction, social media image and audience positioning.',
    icon: Palette,
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="relative space-y-8 lg:space-y-10">
      <div className="pointer-events-none absolute -left-20 top-20 h-56 w-56 rounded-full bg-brand-gold/12 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 bottom-6 h-56 w-56 rounded-full bg-[rgba(94,86,182,0.14)] blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.6 }}
        className="relative z-[1] max-w-3xl space-y-3"
      >
        <p className="section-kicker">What We Do</p>
        <h2 className="font-heading text-4xl leading-tight text-brand-cream sm:text-5xl">
          Professional services designed for premium music experiences.
        </h2>
        <p className="text-base leading-relaxed text-brand-cream/80 sm:text-lg">
          Ward Agency supports artists, venues, brands, and event creators with
          strategic booking, direction, and world-class entertainment execution.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}
        className="relative z-[1] grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {services.map((service, index) => {
          const Icon = service.icon

          return (
            <motion.article
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -6,
                boxShadow:
                  '0 0 0 1px rgba(201,164,92,0.55), 0 24px 48px rgba(0,0,0,0.6), 0 0 40px rgba(201,164,92,0.2)',
              }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
              className="group relative overflow-hidden rounded-3xl border border-brand-border bg-[linear-gradient(160deg,rgba(12,12,12,0.94),rgba(6,6,6,0.98))] p-5 shadow-panel backdrop-blur-2xl sm:p-6"
            >
              <div className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/75 to-transparent opacity-80" />
              <div className="pointer-events-none absolute -right-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-brand-gold/25 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition duration-300 group-hover:ring-brand-gold/50" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,164,92,0.16),transparent_38%)]" />
              <div className="relative space-y-4">
                <p className="text-xs font-semibold tracking-[0.24em] text-brand-beige/70">
                  {`0${index + 1}`}
                </p>
                <span className="inline-flex rounded-2xl border border-brand-borderStrong bg-black/70 p-3 text-brand-gold">
                  <Icon size={20} />
                </span>
                <h3 className="font-heading text-2xl text-brand-cream">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-cream/78 sm:text-base">
                  {service.description}
                </p>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}
