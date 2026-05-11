import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'

const navLinks = [
  { label: 'Roster', href: '#roster' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`relative z-10 mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-7xl rounded-2xl border px-4 py-3 shadow-panel backdrop-blur-2xl transition-all duration-300 sm:mt-4 sm:w-[calc(100%-3rem)] sm:px-6 ${
          isScrolled
            ? 'border-brand-borderStrong bg-black/90 shadow-glow'
            : 'border-brand-border/90 bg-black/82'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-brand-border/70 bg-brand-surface/60 p-2">
              <img src={logo} alt="Ward Agency logo" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <p className="font-heading text-lg tracking-wide text-brand-cream">Ward Agency</p>
              <p className="text-xs text-brand-muted">DJ Management</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-muted transition-colors duration-300 hover:text-brand-cream"
              >
                {link.label}
              </a>
            ))}
            <a href="#booking" className="luxury-button">
              Book an Artist
            </a>
          </nav>

          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex rounded-xl border border-brand-border/70 bg-black/75 p-2 text-brand-beige transition hover:border-brand-gold hover:text-brand-cream md:hidden"
          >
            <motion.span
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.32 }}
              className="inline-flex"
            >
              {isOpen ? <X size={19} /> : <Menu size={19} />}
            </motion.span>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden"
            >
              <div className="relative mt-3 overflow-hidden rounded-2xl border border-brand-border/80 bg-black/92 p-3 backdrop-blur-xl">
                <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-gold/20 blur-2xl" />
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-brand-muted transition hover:bg-brand-glass hover:text-brand-cream"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#booking"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 inline-flex w-full justify-center rounded-full border border-brand-gold/50 bg-brand-gold/20 px-5 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-gold/30"
                >
                  Book an Artist
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            aria-label="Close mobile menu backdrop"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-0 bg-black/45 backdrop-blur-[2px] md:hidden"
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}
