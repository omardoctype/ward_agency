export type BookingStatus =
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'

export interface BookingReservation {
  id: string
  artistId: string
  clientId: string
  eventTitle: string
  eventType: string
  eventDateIso: string
  location: string
  budget?: number
  currency?: string
  notes?: string
  status: BookingStatus
  createdAtIso: string
  updatedAtIso: string
}

// TODO: Future booking/reservation CRUD.
