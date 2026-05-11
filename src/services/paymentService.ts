import type { PaymentRecord } from '../types/payment'

export const paymentService = {
  async listPayments(): Promise<PaymentRecord[]> {
    return []
  },
}

// TODO: Future payment status tracking.
