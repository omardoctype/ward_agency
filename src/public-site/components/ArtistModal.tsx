import { motion } from 'framer-motion'
import {
  AtSign,
  CalendarDays,
  Clapperboard,
  Mail,
  MapPin,
  Play,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Artist } from '../../types/artist'
import SpotifyEmbed from './SpotifyEmbed'

interface ArtistModalProps {
  artist: Artist
  onClose: () => void
  focusSpotify?: boolean
}

const modalTransition = {
  duration: 0.42,
  ease: [0.16, 1, 0.3, 1] as const,
}

const soundIdentityByArtist: Record<string, string> = {
  'wail-bouri':
    'Afro House energy, Arabic melodic textures, Oriental grooves and club-driven transitions.',
  'al-shami':
    'Modern Arabic pop, emotional melodies, live performance energy and strong audience connection.',
}

export default function ArtistModal({
  artist,
  onClose,
  focusSpotify,
}: ArtistModalProps) {
  const spotifySectionRef = useRef<HTMLDivElement | null>(null)
  const [isSpotifyFocused, setIsSpotifyFocused] = useState(false)
  const [failedCoverImage, setFailedCoverImage] = useState<string | null>(null)
  const [failedProfileImage, setFailedProfileImage] = useState<string | null>(null)

  const artistInitials = (artist.stageName || artist.name || 'Artist')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
  const isCoverImageFailed = failedCoverImage === artist.coverImage
  const isProfileImageFailed = failedProfileImage === artist.image

  const focusSpotifySection = () => {
    spotifySectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
    setIsSpotifyFocused(true)
    window.setTimeout(() => setIsSpotifyFocused(false), 2200)
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  useEffect(() => {
    if (!focusSpotify) {
      return
    }

    const timeout = window.setTimeout(() => {
      focusSpotifySection()
    }, 230)

    return () => window.clearTimeout(timeout)
  }, [artist.id, focusSpotify])

  const soundIdentity =
    soundIdentityByArtist[artist.id] ??
    'A curated blend of rhythm, emotional storytelling and premium crowd connection.'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-0 backdrop-blur-lg sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 26, scale: 0.98 }}
        transition={modalTransition}
        onClick={(event) => event.stopPropagation()}
        className="relative h-screen w-full overflow-y-auto border border-brand-borderStrong bg-[linear-gradient(165deg,#050505,#090909_46%,#060606)] pb-6 shadow-[0_34px_90px_rgba(0,0,0,0.82),0_0_56px_rgba(201,164,92,0.15)] backdrop-blur-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-6xl sm:rounded-[2rem] sm:pb-0"
      >
        <div className="pointer-events-none absolute -left-24 top-40 h-64 w-64 rounded-full bg-brand-gold/12 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-[rgba(95,90,188,0.14)] blur-[130px]" />

        <div className="relative h-64 overflow-hidden sm:h-72 lg:h-80">
          {!isCoverImageFailed ? (
            <img
              src={artist.coverImage}
              alt={`${artist.stageName} cover`}
              onError={() => setFailedCoverImage(artist.coverImage)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_22%_16%,rgba(201,164,92,0.22),transparent_45%),radial-gradient(circle_at_84%_82%,rgba(94,86,182,0.13),transparent_45%),linear-gradient(to_bottom,#050505,#0c0c0c)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(201,164,92,0.28),transparent_45%)]" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex rounded-full border border-brand-borderStrong bg-black/72 p-2.5 text-brand-cream shadow-[0_10px_24px_rgba(0,0,0,0.45)] transition hover:border-brand-gold hover:text-brand-beige"
            aria-label="Close artist profile"
          >
            <X size={18} />
          </button>

          <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-5">
            <div className="flex items-end gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-2xl border border-brand-borderStrong bg-black/70 p-1.5 backdrop-blur-md sm:h-24 sm:w-24">
                {!isProfileImageFailed ? (
                  <img
                    src={artist.image}
                    alt={`${artist.stageName} profile`}
                    onError={() => setFailedProfileImage(artist.image)}
                    className="h-full w-full rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-[radial-gradient(circle_at_28%_20%,rgba(201,164,92,0.26),transparent_48%),linear-gradient(to_bottom,#090909,#101010)]">
                    <span className="font-heading text-xl text-brand-cream/95">
                      {artistInitials}
                    </span>
                  </div>
                )}
              </div>
              <div className="min-w-0 pb-1">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-beige/90">
                  Artist Press Kit
                </p>
                <h2 className="truncate font-heading text-4xl text-brand-cream sm:text-5xl">
                  {artist.stageName}
                </h2>
                <p className="truncate text-sm text-brand-cream/70">Real Name: {artist.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-[1] space-y-6 p-5 sm:space-y-7 sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-3xl border border-brand-borderStrong bg-[linear-gradient(160deg,rgba(11,11,11,0.96),rgba(6,6,6,0.98))] p-4 shadow-panel backdrop-blur-2xl">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-brand-beige">
                  VIP Artist Profile
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-brand-borderStrong bg-brand-gold/22 px-3 py-1 text-xs font-semibold text-brand-cream">
                    {artist.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-brand-border bg-black/40 px-3 py-1 text-xs text-brand-muted">
                    <MapPin size={13} className="text-brand-gold" />
                    {artist.location}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {artist.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-brand-border bg-brand-surface/85 px-3 py-1 text-xs text-brand-beige"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-2.5">
                  <a href={`mailto:${artist.bookingEmail}`} className="luxury-button gap-2">
                    <Mail size={15} />
                    Book this Artist
                  </a>
                  <a
                    href={artist.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="luxury-button-ghost gap-2"
                  >
                    <AtSign size={15} />
                    Open Instagram
                  </a>
                  <button
                    type="button"
                    onClick={focusSpotifySection}
                    className="luxury-button-ghost gap-2"
                  >
                    <Play size={15} />
                    Listen on Spotify
                  </button>
                </div>

                {(artist.tiktokUrl || artist.youtubeUrl) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {artist.tiktokUrl && (
                      <a
                        href={artist.tiktokUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-black/35 px-3 py-1.5 text-xs text-brand-cream transition hover:border-brand-gold hover:text-brand-beige"
                      >
                        <Clapperboard size={13} />
                        TikTok
                      </a>
                    )}
                    {artist.youtubeUrl && (
                      <a
                        href={artist.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-black/35 px-3 py-1.5 text-xs text-brand-cream transition hover:border-brand-gold hover:text-brand-beige"
                      >
                        <Play size={13} />
                        YouTube
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.46, delay: 0.08 }}
                className="glass-card rounded-3xl border border-brand-border/90 p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-brand-beige">
                  Biography
                </p>
                <p className="mt-3 text-sm leading-relaxed text-brand-cream/82 sm:text-[15px]">
                  {artist.fullBio}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.46, delay: 0.13 }}
                className="glass-card rounded-3xl border border-brand-border/90 p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-brand-beige">
                  Sound Identity
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {artist.genres.map((genre) => (
                    <span
                      key={`identity-${genre}`}
                      className="rounded-full border border-brand-border bg-brand-surface/75 px-3 py-1 text-xs text-brand-beige"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-cream/82">
                  {soundIdentity}
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.46, delay: 0.18 }}
                className="glass-card rounded-3xl border border-brand-border/90 p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-brand-beige">
                  Highlights
                </p>
                <div className="mt-3 space-y-2">
                  {artist.highlights.map((highlight) => (
                    <p
                      key={highlight}
                      className="rounded-xl border border-brand-border/80 bg-black/45 px-3 py-2 text-sm text-brand-cream/90"
                    >
                      <span className="mr-2 text-brand-gold">+</span>
                      {highlight}
                    </p>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.46, delay: 0.23 }}
                className="glass-card rounded-3xl border border-brand-border/90 p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-brand-beige">
                  Upcoming Events
                </p>
                {artist.upcomingEvents.length > 0 ? (
                  <div className="mt-3 space-y-3">
                    {artist.upcomingEvents.map((event) => (
                      <div
                        key={`${artist.id}-${event.title}-${event.date}`}
                        className="rounded-xl border border-brand-border/80 bg-black/35 p-3"
                      >
                        <p className="text-sm font-semibold text-brand-cream">{event.title}</p>
                        <p className="mt-1 inline-flex items-center gap-2 text-xs text-brand-muted">
                          <CalendarDays size={13} className="text-brand-gold" />
                          {event.date}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-2 text-xs text-brand-muted">
                          <MapPin size={13} className="text-brand-gold" />
                          {event.location}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl border border-brand-border/80 bg-black/45 p-3">
                    <p className="text-sm text-brand-cream/80">
                      Upcoming events will be announced soon.
                    </p>
                  </div>
                )}
              </motion.section>

              <motion.section
                ref={spotifySectionRef}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  boxShadow: isSpotifyFocused
                    ? '0 0 0 1px rgba(201,164,92,0.68), 0 0 42px rgba(201,164,92,0.28)'
                    : '0 0 0 1px rgba(216,195,165,0.24), 0 0 0 rgba(201,164,92,0)',
                }}
                transition={{ duration: 0.42, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-3xl border border-brand-borderStrong p-3"
              >
                <p className="px-2 pb-2 text-xs uppercase tracking-[0.2em] text-brand-beige">
                  Spotify Player
                </p>
                <SpotifyEmbed
                  embedUrl={artist.spotifyEmbedUrl}
                  stageName={artist.stageName}
                  spotifyArtistUrl={artist.spotifyArtistUrl}
                />
              </motion.section>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
