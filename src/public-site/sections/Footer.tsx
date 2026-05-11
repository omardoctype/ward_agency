import { AtSign, Mail, PhoneCall } from 'lucide-react'
import logo from '../../assets/logo.png'

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t border-brand-border/80 bg-black/88">
      <div className="pointer-events-none absolute -left-16 top-0 h-36 w-36 rounded-full bg-brand-gold/20 blur-[90px]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 overflow-hidden rounded-full border border-brand-border/70 bg-brand-surface/60 p-2">
              <img src={logo} alt="Ward Agency logo" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <p className="font-heading text-2xl text-brand-cream">Ward Agency</p>
              <p className="text-sm text-brand-cream/72">
                Premium DJ and Artist Management
              </p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-brand-cream/74">
            Building exceptional nightlife, destination events, and curated
            entertainment concepts through carefully selected talent.
          </p>
        </div>

        <div className="space-y-2 text-sm text-brand-cream/76">
          <a
            href="mailto:bookings@wardagency.com"
            className="inline-flex items-center gap-2 transition hover:text-brand-beige"
          >
            <Mail size={14} />
            bookings@wardagency.com
          </a>
          <a
            href="tel:+21600000000"
            className="block inline-flex items-center gap-2 transition hover:text-brand-beige"
          >
            <PhoneCall size={14} />
            +216 00 000 000
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-brand-beige"
          >
            <AtSign size={14} />
            @wardagency
          </a>
          <a href="#booking" className="luxury-button mt-2 !inline-flex !px-5 !py-2.5 text-xs uppercase tracking-[0.16em]">
            Start Booking
          </a>
          <p className="pt-2 text-xs tracking-wide text-brand-muted/80">
            Ward Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
