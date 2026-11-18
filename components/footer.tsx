'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Heart,
  ChevronUp,
} from 'lucide-react'
import {
  LinkedInIcon,
  GitHubIcon,
  TwitterIcon,
  TelegramIcon,
  InstagramIcon,
} from '@/components/social-icons'
import { usePortfolio } from '@/hooks/use-portfolio'

export function Footer() {
  const { portfolio } = usePortfolio()
  const { personal, socials } = portfolio
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="bg-[#00012b] px-6 pt-10 pb-6 text-white md:px-[9%]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Portfolio Bio */}
          <div>
            <h3 className="pb-3 text-2xl font-normal text-white">
              {personal.firstName}&apos;s Portfolio
            </h3>
            <p className="text-[15px] leading-relaxed text-[#ccc] normal-case">
              {personal.footerBio}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="pb-3 text-2xl font-normal text-white capitalize">
              Quick Links
            </h3>
            <ul className="space-y-1.5 list-none">
              {[
                { label: 'Home', href: '/#home' },
                { label: 'About', href: '/#about' },
                { label: 'Skills', href: '/#skills' },
                { label: 'Work', href: '/#work' },
                { label: 'Experience', href: '/#experience' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-[15px] text-[#eee] transition-colors hover:text-[#ffae00]"
                  >
                    <ChevronRight className="h-4 w-4 rounded-full bg-white/10 p-0.5 text-[#ffae00]" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="pb-3 text-2xl font-normal text-white capitalize">
              Contact Info
            </h3>
            <div className="space-y-2.5 text-[15px] text-[#ccc]">
              <p className="flex items-center gap-2.5 normal-case">
                <Phone className="h-4 w-4 text-[#ffae00]" />
                <span>{personal.phone}</span>
              </p>
              <p className="flex items-center gap-2.5 normal-case">
                <Mail className="h-4 w-4 text-[#ffae00]" />
                <span>{personal.email}</span>
              </p>
              <p className="flex items-center gap-2.5 normal-case">
                <MapPin className="h-4 w-4 text-[#ffae00]" />
                <span>{personal.place}</span>
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6e6e6] text-[#02094b] transition hover:scale-95 hover:border hover:border-[#b4b2b2] hover:bg-transparent hover:text-[#ffae00]"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              )}
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6e6e6] text-[#02094b] transition hover:scale-95 hover:border hover:border-[#b4b2b2] hover:bg-transparent hover:text-[#ffae00]"
                >
                  <GitHubIcon className="h-4 w-4" />
                </a>
              )}
              {personal.email && (
                <a
                  href={`mailto:${personal.email}`}
                  aria-label="Email"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6e6e6] text-[#02094b] transition hover:scale-95 hover:border hover:border-[#b4b2b2] hover:bg-transparent hover:text-[#ffae00]"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6e6e6] text-[#02094b] transition hover:scale-95 hover:border hover:border-[#b4b2b2] hover:bg-transparent hover:text-[#ffae00]"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
              )}
              {socials.telegram && (
                <a
                  href={socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6e6e6] text-[#02094b] transition hover:scale-95 hover:border hover:border-[#b4b2b2] hover:bg-transparent hover:text-[#ffae00]"
                >
                  <TelegramIcon className="h-4 w-4" />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6e6e6] text-[#02094b] transition hover:scale-95 hover:border hover:border-[#b4b2b2] hover:bg-transparent hover:text-[#ffae00]"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-4 text-center font-['Nunito',sans-serif] text-[15px] font-semibold text-white">
          Designed With{' '}
          <Heart className="mx-1 inline h-4 w-4 animate-pulse fill-[#e90606] text-[#e90606]" />{' '}
          By{' '}
          <a
            href={socials.linkedin || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffae00] hover:underline"
          >
            {personal.firstName} {personal.lastName}
          </a>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#ffae00] text-[#0d002c] shadow-lg transition-all duration-500 ${
          showScrollTop ? 'bottom-8 opacity-100' : '-top-20 opacity-0 pointer-events-none'
        }`}
      >
        <ChevronUp className="h-6 w-6 stroke-[2.5]" />
      </button>
    </>
  )
}
