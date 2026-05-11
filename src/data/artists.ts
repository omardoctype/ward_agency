import type { Artist } from '../types/artist'

// Artist photos are loaded from /public/artists.
// Replace these paths only with official/client-approved images (no random hotlinks).
export const artists: Artist[] = [
  {
    id: 'wail-bouri',
    name: 'Wail Bouri',
    stageName: 'Wail Bouri',
    category: 'DJ / Producer',
    genres: ['Afro House', 'Arabic Fusion', 'Oriental House', 'Melodic House'],
    location: 'Tunisia / International',
    shortBio:
      'Tunisian DJ and producer known for energetic Afro House sets and a fusion of African and Arabic sounds.',
    fullBio:
      'Wail Bouri is a Tunisian DJ and music producer recognized for high-energy performances, Afro House rhythms, Arabic-influenced melodies, and immersive club moments. His sound blends dancefloor energy with Oriental textures, making him suitable for clubs, festivals, private events, and destination nightlife experiences.',
    // Card/profile photo:
    // /public/artists/wail-bouri-card.jpg
    image: '/artists/wail-bouri-card.jpg',
    // Cover/hero photo:
    // /public/artists/wail-bouri-cover.jpg
    coverImage: '/artists/wail-bouri-cover.jpg',
    spotifyArtistUrl: 'https://open.spotify.com/artist/5TLbziOMShkHTpAvetjb9O',
    spotifyEmbedUrl:
      'https://open.spotify.com/embed/artist/5TLbziOMShkHTpAvetjb9O?utm_source=generator',
    instagramUrl: 'https://www.instagram.com/wail_bouri/',
    bookingEmail: 'bookings@wardagency.com',
    highlights: [
      'Tunisian DJ and music producer',
      'Afro House and Arabic fusion identity',
      'High-energy live DJ sets',
      'Available for clubs, festivals, private events and destination experiences',
    ],
    upcomingEvents: [],
  },
  {
    id: 'al-shami',
    name: 'Al Shami',
    stageName: 'Al Shami',
    category: 'Artist / Performer',
    genres: [
      'Arabic Pop',
      'Levant Pop',
      'Live Performance',
      'Modern Arabic Sound',
    ],
    location: 'Middle East / International',
    shortBio:
      'Arabic artist and performer known for emotional songs, modern Arabic sound, and strong audience connection.',
    fullBio:
      'Al Shami is an Arabic music artist whose work connects emotional storytelling with a modern sound. His music and live presence are suitable for concerts, festivals, special appearances, brand activations, and premium entertainment events.',
    // Card/profile photo:
    // /public/artists/al-shami-card.jpg
    image: '/artists/al-shami-card.jpg',
    // Cover/hero photo:
    // /public/artists/al-shami-cover.jpg
    coverImage: '/artists/al-shami-cover.jpg',
    spotifyArtistUrl: 'https://open.spotify.com/artist/597R32EkdYgLMf1tQcHF8k',
    spotifyEmbedUrl:
      'https://open.spotify.com/embed/artist/597R32EkdYgLMf1tQcHF8k?utm_source=generator',
    instagramUrl: 'https://www.instagram.com/alshami.music/',
    bookingEmail: 'bookings@wardagency.com',
    highlights: [
      'Modern Arabic music artist',
      'Strong emotional performance identity',
      'Large audience presence across social platforms',
      'Suitable for concerts, premium events and brand collaborations',
    ],
    upcomingEvents: [],
  },
]
