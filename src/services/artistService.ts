import { artists } from '../data/artists'
import type { Artist } from '../types/artist'

export const artistService = {
  getPublicRoster(): Artist[] {
    return artists
  },

  getArtistById(id: string): Artist | undefined {
    return artists.find((artist) => artist.id === id)
  },
}

// TODO: Future artist CRUD.
