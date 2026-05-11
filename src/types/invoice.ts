export type InvoiceStatus = 'draft' | 'issued' | 'partially_paid' | 'paid' | 'void'

export interface InvoiceLineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export interface Invoice {
  id: string
  bookingId: string
  clientId: string
  currency: string
  issueDateIso: string
  dueDateIso: string
  status: InvoiceStatus
  lineItems: InvoiceLineItem[]
  subtotal: number
  taxAmount: number
  totalAmount: number
  createdAtIso: string
  updatedAtIso: string
}

// TODO: Future invoice/facture generation.
