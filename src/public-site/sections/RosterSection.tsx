import { AnimatePresence, motion } from 'framer-motion'
import { Music2, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Artist } from '../../types/artist'
import ArtistCard from '../components/ArtistCard'

interface RosterSectionProps {
  artists: Artist[]
  onSelectArtist: (artist: Artist, options?: { focusSpotify?: boolean }) => void
}

const genreFilters = [
  'All',
  'Afro House',
  'Arabic Fusion',
  'Oriental House',
  'Arabic Pop',
  'Live Performance',
] as const

export default function RosterSection({
  artists,
  onSelectArtist,
}: RosterSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeGenre, setActiveGenre] =
    useState<(typeof genreFilters)[number]>('All')

  const filteredArtists = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return artists.filter((artist) => {
      const searchableText = [
        artist.name,
        artist.stageName,
        artist.category,
        ...artist.genres,
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch =
        normalizedSearch.length === 0 || searchableText.includes(normalizedSearch)

      const matchesGenre =
        activeGenre === 'All' ||
        artist.genres.some((genre) =>
          genre.toLowerCase().includes(activeGenre.toLowerCase()),
        )

      return matchesSearch && matchesGenre
    })
  }, [activeGenre, artists, searchTerm])

  const curatedArtistsText = `${artists.length} curated artists`

  return (
    <section id="roster" className="space-y-5 py-12 sm:space-y-6 sm:py-14 lg:space-y-8 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-2.5 sm:space-y-3"
      >
        <p className="section-kicker">Artist Roster</p>
        <h2 className="font-heading text-4xl leading-tight text-brand-cream sm:text-5xl">
          Choose the Artist
        </h2>
        <p className="text-base leading-relaxed text-brand-cream/80 sm:text-lg">
          Explore Ward Agency&apos;s selected artists and discover their sound
          before sending a booking request.
        </p>
      </motion.div>

      <div className="relative space-y-2.5 overflow-hidden rounded-2xl border border-brand-border bg-[linear-gradient(150deg,rgba(10,10,10,0.96),rgba(6,6,6,0.98))] p-3 shadow-panel backdrop-blur-xl sm:space-y-3 sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_95%_0%,rgba(201,164,92,0.14),transparent_38%)]" />
        <label className="relative block">
          <Search
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-beige"
          />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            type="text"
            placeholder="Search by name, category, or genre..."
            className="h-9 w-full rounded-full border border-brand-border bg-black/90 pl-9 pr-3.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong sm:h-10 sm:pl-10 sm:pr-4"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-brand-beige/90">
            <SlidersHorizontal size={13} />
            Genre Filter
          </div>
          <p className="hidden text-xs text-brand-beige sm:block">
            {curatedArtistsText}
          </p>
          <p className="text-[11px] text-brand-muted sm:text-xs">
            {filteredArtists.length} result{filteredArtists.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {genreFilters.map((genre) => {
            const isActive = activeGenre === genre

            return (
              <button
                key={genre}
                type="button"
                onClick={() => setActiveGenre(genre)}
                className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition sm:px-3.5 sm:text-[11px] ${
                  isActive
                    ? 'border-brand-borderStrong bg-brand-gold/25 text-brand-cream'
                    : 'border-brand-border bg-black/70 text-brand-muted hover:border-brand-borderStrong hover:text-brand-beige'
                }`}
              >
                {genre}
              </button>
            )
          })}
        </div>
      </div>

      {filteredArtists.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-brand-border/90 bg-brand-soft/90 p-10 text-center shadow-panel backdrop-blur-xl"
        >
          <div className="mx-auto inline-flex rounded-2xl border border-brand-border/75 bg-brand-bg/75 p-3 text-brand-gold">
            <Music2 size={20} />
          </div>
          <p className="mt-4 font-heading text-2xl text-brand-cream">
            No artists found
          </p>
          <p className="mt-2 text-sm text-brand-muted">
            Try another search term or switch to a different genre filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('')
              setActiveGenre('All')
            }}
            className="luxury-button mt-5"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          layout
          className={`grid grid-cols-1 gap-5 sm:gap-6 lg:gap-8 ${
            filteredArtists.length === 1 ? 'sm:grid-cols-1' : 'sm:grid-cols-2'
          } ${
            filteredArtists.length === 2 ? 'lg:mx-auto lg:max-w-[980px]' : ''
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.42,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                exit={{ opacity: 0, y: 14, scale: 0.97 }}
                className={`w-full ${filteredArtists.length === 2 ? 'lg:mx-auto lg:max-w-[460px]' : ''}`}
              >
                <ArtistCard artist={artist} onSelect={onSelectArtist} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
