export interface ClientContact {
  name: string
  email?: string
  phone?: string
  role?: string
}

export interface ClientProfile {
  id: string
  companyName?: string
  displayName: string
  country?: string
  city?: string
  contacts: ClientContact[]
  notes?: string
  createdAtIso: string
  updatedAtIso: string
}

// TODO: Future client management.
