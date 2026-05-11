import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import ArtistModal from '../components/ArtistModal'
import AmbientParticles from '../components/AmbientParticles'
import Navbar from '../components/Navbar'
import BookingCTASection from '../sections/BookingCTASection'
import Footer from '../sections/Footer'
import Hero from '../sections/Hero'
import RosterSection from '../sections/RosterSection'
import ServicesSection from '../sections/ServicesSection'
import { artistService } from '../../services/artistService'
import type { Artist } from '../../types/artist'

interface SelectedArtistState {
  artist: Artist
  focusSpotify?: boolean
}

export default function PublicHomePage() {
  const rosterArtists = artistService.getPublicRoster()
  const [selectedArtist, setSelectedArtist] = useState<SelectedArtistState | null>(null)

  const handleSelectArtist = (
    artist: Artist,
    options?: { focusSpotify?: boolean },
  ) => {
    setSelectedArtist({
      artist,
      focusSpotify: options?.focusSpotify,
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-bg text-brand-cream">
      <AmbientParticles />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-hero-gradient" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-85 [background:radial-gradient(circle_at_20%_100%,rgba(201,164,92,0.24),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(216,195,165,0.14),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40 [background:radial-gradient(circle_at_92%_14%,rgba(96,88,190,0.14),transparent_34%),radial-gradient(circle_at_12%_78%,rgba(86,138,188,0.1),transparent_32%)]" />
      <div className="grain pointer-events-none fixed inset-0 -z-10" />
      <motion.div
        initial={{ opacity: 0.72 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-0 z-30 bg-brand-bg"
      />

      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-4 pb-24 sm:px-6 lg:gap-32 lg:px-8"
      >
        <Hero />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <RosterSection artists={rosterArtists} onSelectArtist={handleSelectArtist} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <ServicesSection />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <BookingCTASection />
        </motion.div>
      </motion.main>

      <Footer />

      <AnimatePresence>
        {selectedArtist && (
          <ArtistModal
            artist={selectedArtist.artist}
            focusSpotify={selectedArtist.focusSpotify}
            onClose={() => setSelectedArtist(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
