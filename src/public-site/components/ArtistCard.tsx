import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { Play } from 'lucide-react'
import { useMemo, useState, type PointerEvent } from 'react'
import type { Artist } from '../../types/artist'

interface ArtistCardProps {
  artist: Artist
  onSelect: (artist: Artist, options?: { focusSpotify?: boolean }) => void
}

export default function ArtistCard({ artist, onSelect }: ArtistCardProps) {
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(30)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const smoothPointerX = useSpring(pointerX, { stiffness: 190, damping: 22, mass: 0.5 })
  const smoothPointerY = useSpring(pointerY, { stiffness: 190, damping: 22, mass: 0.5 })
  const smoothTiltX = useSpring(tiltX, { stiffness: 160, damping: 20, mass: 0.55 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 160, damping: 20, mass: 0.55 })

  const [isHovering, setIsHovering] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  const initials = useMemo(() => {
    const source = artist.stageName.trim() || artist.name.trim() || 'Artist'
    const words = source.split(/\s+/).slice(0, 2)
    return words.map((word) => word.charAt(0).toUpperCase()).join('')
  }, [artist.name, artist.stageName])

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    pointerX.set(x)
    pointerY.set(y)
    tiltX.set(((50 - y) / 50) * 3.6)
    tiltY.set(((x - 50) / 50) * 4.2)
  }

  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${smoothPointerX}% ${smoothPointerY}%, rgba(245,240,232,0.14), rgba(201,164,92,0.12) 30%, rgba(0,0,0,0) 70%)`

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        y: -8,
        boxShadow:
          '0 0 0 1px rgba(201,164,92,0.55), 0 26px 52px rgba(0,0,0,0.58), 0 0 44px rgba(201,164,92,0.2)',
      }}
      style={{
        transformPerspective: 1200,
        rotateX: smoothTiltX,
        rotateY: smoothTiltY,
        transformStyle: 'preserve-3d',
        backgroundColor: 'rgba(9,9,9,0.9)',
        borderColor: 'rgba(216,195,165,0.24)',
      }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      onClick={() => onSelect(artist)}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        tiltX.set(0)
        tiltY.set(0)
      }}
      onFocus={() => setIsHovering(true)}
      onBlur={() => {
        setIsHovering(false)
        tiltX.set(0)
        tiltY.set(0)
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${artist.stageName} profile`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(artist)
        }
      }}
      className="group relative h-[34rem] w-full cursor-pointer overflow-hidden rounded-2xl border text-left shadow-panel backdrop-blur-xl"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ x: '-165%', opacity: 0 }}
        animate={
          isHovering
            ? {
                x: '220%',
                opacity: [0, 0.32, 0],
                transition: { duration: 1.05, ease: [0.19, 1, 0.22, 1] },
              }
            : { x: '-165%', opacity: 0 }
        }
        className="pointer-events-none absolute inset-y-0 z-10 w-24 bg-gradient-to-r from-transparent via-brand-cream/35 to-transparent blur-[2px]"
      />

      <div className="relative h-[65%] overflow-hidden">
        {!imageFailed ? (
          <img
            src={artist.coverImage}
            alt={artist.stageName}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition duration-[1300ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_25%_20%,rgba(201,164,92,0.24),transparent_42%),radial-gradient(circle_at_80%_85%,rgba(94,86,182,0.14),transparent_45%),linear-gradient(to_bottom,#050505,#0c0c0c)]">
            <span className="text-4xl font-heading text-brand-cream/90">{initials}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#02020266] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_16%,rgba(201,164,92,0.25),transparent_42%)] opacity-70" />

        <div className="absolute inset-x-4 bottom-4 space-y-2">
          <span className="inline-flex rounded-full border border-brand-borderStrong bg-brand-gold/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.13em] text-brand-cream">
            {artist.category}
          </span>
          <h3 className="font-heading text-3xl leading-tight text-brand-cream">
            {artist.stageName}
          </h3>
          <p className="text-xs uppercase tracking-[0.18em] text-brand-beige/90">
            {artist.name}
          </p>
        </div>
      </div>

      <div className="relative flex h-[35%] flex-col justify-between p-5">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {artist.genres.slice(0, 4).map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-brand-border bg-brand-bg/75 px-3 py-1 text-[11px] font-medium text-brand-beige"
              >
                {genre}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-brand-cream/78">{artist.shortBio}</p>
        </div>

        <div className="flex gap-2 pt-3">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onSelect(artist)
            }}
            className="luxury-button-ghost flex-1 !px-4 !py-2.5 !text-sm group-hover:shadow-[0_0_26px_rgba(201,164,92,0.2)]"
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onSelect(artist, { focusSpotify: true })
            }}
            className="luxury-button flex-1 gap-1.5 !px-4 !py-2.5 !text-sm"
          >
            <Play size={14} />
            Listen on Spotify
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition duration-300 group-hover:ring-brand-borderStrong" />
      <div className="pointer-events-none absolute -bottom-16 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-brand-gold/20 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />
    </motion.article>
  )
}
