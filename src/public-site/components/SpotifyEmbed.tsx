interface SpotifyEmbedProps {
  embedUrl: string
  stageName?: string
  spotifyArtistUrl?: string
}

export default function SpotifyEmbed({
  embedUrl,
  stageName,
  spotifyArtistUrl,
}: SpotifyEmbedProps) {
  const hasEmbed = embedUrl.trim().length > 0
  const hasSpotifyLink = Boolean(spotifyArtistUrl?.trim())

  return (
    <div className="relative space-y-3 overflow-hidden rounded-2xl border border-brand-borderStrong bg-[linear-gradient(160deg,rgba(10,10,10,0.96),rgba(6,6,6,0.98))] p-4 shadow-panel backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,164,92,0.15),transparent_40%)]" />

      <div className="relative z-[1] space-y-1 px-1">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-beige">
          Featured Spotify
        </p>
        <h3 className="font-heading text-2xl text-brand-cream">
          {stageName ? `Listen to ${stageName}` : 'Listen on Spotify'}
        </h3>
        <p className="text-sm text-brand-cream/80">
          Browse the sound before booking the artist.
        </p>
      </div>

      {hasEmbed ? (
        <div className="relative z-[1] overflow-hidden rounded-2xl border border-brand-borderStrong bg-black/65">
          <iframe
            src={embedUrl}
            title={`${stageName ?? 'Artist'} Spotify embed`}
            width="100%"
            height="352"
            style={{ borderRadius: '18px' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full"
          />
        </div>
      ) : (
        <div className="relative z-[1] flex h-[220px] items-center justify-center rounded-2xl border border-brand-borderStrong bg-black/45 text-center">
          <p className="px-4 text-sm font-medium text-brand-cream/78">
            Spotify profile coming soon.
          </p>
        </div>
      )}

      {hasSpotifyLink && (
        <a
          href={spotifyArtistUrl}
          target="_blank"
          rel="noreferrer"
          className="luxury-button-ghost mt-1 w-full sm:w-auto"
        >
          Open in Spotify
        </a>
      )}
    </div>
  )
}
