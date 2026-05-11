export interface Artist {
  id: string
  name: string
  stageName: string
  category: string
  genres: string[]
  location: string
  shortBio: string
  fullBio: string
  image: string
  coverImage: string
  spotifyArtistUrl: string
  spotifyEmbedUrl: string
  instagramUrl: string
  tiktokUrl?: string
  youtubeUrl?: string
  bookingEmail: string
  highlights: string[]
  upcomingEvents: {
    title: string
    date: string
    location: string
  }[]
}
