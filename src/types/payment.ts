export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded'

export interface PaymentRecord {
  id: string
  invoiceId: string
  amount: number
  currency: string
  method?: 'bank_transfer' | 'card' | 'cash' | 'other'
  status: PaymentStatus
  reference?: string
  paidAtIso?: string
  createdAtIso: string
  updatedAtIso: string
}

// TODO: Future payment status tracking.
