import { motion } from 'framer-motion'
import { CalendarDays, Mail, MessageCircleMore } from 'lucide-react'
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'

const WHATSAPP_NUMBER = '00000000000'

const whatsappMessage =
  'Hello Ward Agency, I want to book an artist for an event.\nArtist:\nDate:\nLocation:\nEvent type:\nBudget:'

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  whatsappMessage,
)}`

interface BookingFormState {
  fullName: string
  email: string
  artist: string
  date: string
  location: string
  eventType: string
  budget: string
  details: string
}

const initialFormState: BookingFormState = {
  fullName: '',
  email: '',
  artist: '',
  date: '',
  location: '',
  eventType: '',
  budget: '',
  details: '',
}

export default function BookingCTASection() {
  const formSectionRef = useRef<HTMLDivElement | null>(null)
  const [formState, setFormState] = useState<BookingFormState>(initialFormState)

  const handleStartBooking = () => {
    formSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setFormState((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const mailSubject = 'Ward Agency Booking Request'
    const mailBody =
      `Hello Ward Agency,\n\n` +
      `I want to book an artist for an event.\n\n` +
      `Name: ${formState.fullName || 'N/A'}\n` +
      `Email: ${formState.email || 'N/A'}\n` +
      `Artist: ${formState.artist || 'N/A'}\n` +
      `Date: ${formState.date || 'N/A'}\n` +
      `Location: ${formState.location || 'N/A'}\n` +
      `Event type: ${formState.eventType || 'N/A'}\n` +
      `Budget: ${formState.budget || 'N/A'}\n\n` +
      `Additional details:\n${formState.details || 'N/A'}`

    window.location.href = `mailto:bookings@wardagency.com?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(mailBody)}`
  }

  return (
    <section id="booking" className="relative space-y-7 overflow-hidden">
      <div className="pointer-events-none absolute -left-20 top-8 h-48 w-48 rounded-full bg-brand-gold/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-brand-beige/15 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-brand-borderStrong bg-[linear-gradient(160deg,rgba(11,11,11,0.96),rgba(7,7,7,0.99))] px-6 py-10 shadow-glow backdrop-blur-2xl sm:px-10 sm:py-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(201,164,92,0.22),transparent_42%)]" />
        <div className="relative space-y-5">
          <p className="section-kicker">Booking</p>
          <h2 className="max-w-3xl font-heading text-4xl leading-[1.05] text-brand-cream sm:text-5xl lg:text-6xl">
            Ready to Book the Right Sound?
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-brand-cream/82 sm:text-lg">
            Tell us about your event, preferred artist, location and date. Ward
            Agency will help you create the perfect music experience.
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleStartBooking}
              className="luxury-button gap-2"
            >
              <CalendarDays size={16} />
              Start Booking Request
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="luxury-button-ghost gap-2"
            >
              <MessageCircleMore size={16} />
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        id="booking-form"
        ref={formSectionRef}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="rounded-3xl border border-brand-border/90 bg-[linear-gradient(160deg,rgba(10,10,10,0.96),rgba(6,6,6,0.99))] p-5 shadow-panel backdrop-blur-xl sm:p-7"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-brand-beige">
          Quick Request Form
        </p>
        <p className="mt-2 text-sm text-brand-cream/76">
          No portal needed yet. Submit this form to open your email with a
          prefilled booking request.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.14em] text-brand-beige">
                Full Name
              </span>
              <input
                name="fullName"
                value={formState.fullName}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-xl border border-brand-border/90 bg-brand-bg/80 px-3.5 py-2.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong"
                placeholder="Your name"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.14em] text-brand-beige">
                Email
              </span>
              <input
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                type="email"
                className="w-full rounded-xl border border-brand-border/90 bg-brand-bg/80 px-3.5 py-2.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong"
                placeholder="you@email.com"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.14em] text-brand-beige">
                Preferred Artist
              </span>
              <input
                name="artist"
                value={formState.artist}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-xl border border-brand-border/90 bg-brand-bg/80 px-3.5 py-2.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong"
                placeholder="Artist name"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.14em] text-brand-beige">
                Date
              </span>
              <input
                name="date"
                value={formState.date}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-xl border border-brand-border/90 bg-brand-bg/80 px-3.5 py-2.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong"
                placeholder="DD/MM/YYYY"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.14em] text-brand-beige">
                Location
              </span>
              <input
                name="location"
                value={formState.location}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-xl border border-brand-border/90 bg-brand-bg/80 px-3.5 py-2.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong"
                placeholder="City / Venue"
              />
            </label>

            <label className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.14em] text-brand-beige">
                Event Type
              </span>
              <input
                name="eventType"
                value={formState.eventType}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-xl border border-brand-border/90 bg-brand-bg/80 px-3.5 py-2.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong"
                placeholder="Club, Private, Festival..."
              />
            </label>

            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-xs uppercase tracking-[0.14em] text-brand-beige">
                Budget
              </span>
              <input
                name="budget"
                value={formState.budget}
                onChange={handleInputChange}
                type="text"
                className="w-full rounded-xl border border-brand-border/90 bg-brand-bg/80 px-3.5 py-2.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong"
                placeholder="Estimated budget range"
              />
            </label>
          </div>

          <label className="space-y-1.5">
            <span className="text-xs uppercase tracking-[0.14em] text-brand-beige">
              Additional Details
            </span>
            <textarea
              name="details"
              value={formState.details}
              onChange={handleInputChange}
              rows={4}
              className="w-full resize-y rounded-xl border border-brand-border/90 bg-brand-bg/80 px-3.5 py-2.5 text-sm text-brand-cream outline-none transition placeholder:text-brand-darkMuted focus:border-brand-borderStrong"
              placeholder="Share details about your vision and audience."
            />
          </label>

          <button
            type="submit"
            className="luxury-button gap-2"
          >
            <Mail size={16} />
            Send Request by Email
          </button>
        </form>
      </motion.div>
    </section>
  )
}
