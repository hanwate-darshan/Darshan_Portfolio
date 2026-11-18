'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Hexagon } from 'lucide-react'
import { usePortfolio } from '@/hooks/use-portfolio'

const NAV_ITEMS = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Skills', href: '#skills', sectionId: 'skills' },
  { label: 'Work', href: '#work', sectionId: 'work' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

interface NavbarProps {
  onOpenCustomizer?: () => void
}

export function Navbar({ onOpenCustomizer }: NavbarProps) {
  const { portfolio } = usePortfolio()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isHomePage) {
      if (pathname.startsWith('/projects')) setActiveSection('work')
      else if (pathname.startsWith('/experience')) setActiveSection('experience')
      return
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.sectionId)
        if (el) {
          const top = el.offsetTop - 200
          const height = el.offsetHeight
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(item.sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage, pathname])

  useEffect(() => {
    const baseTitle = `Portfolio | ${portfolio.personal.firstName} ${portfolio.personal.lastName}`
    document.title = baseTitle

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        document.title = baseTitle
      } else {
        document.title = 'Come Back To Portfolio 🙏'
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [portfolio.personal.firstName, portfolio.personal.lastName])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[65px] items-center justify-between bg-white px-6 shadow-[0_1px_4px_rgba(146,161,176,0.3)] md:px-[10%]">
      {/* Logo */}
      <Link
        href="/"
        className="group flex items-center gap-2 text-[19px] font-extrabold text-[#0e2431] transition-colors hover:text-[#fc8c05]"
      >
        <span className="relative flex items-center justify-center">
          <Hexagon className="h-6 w-6 stroke-[2.2]" />
          <span className="absolute text-[8px] font-black">JS</span>
        </span>
        <span>{portfolio.personal.logoText}</span>
      </Link>

      {/* Desktop Navigation */}
      <nav aria-label="Main Navigation" className="hidden md:flex md:items-center md:gap-7">
        <ul className="flex items-center gap-6 list-none">
          {NAV_ITEMS.map((item) => {
            if (item.sectionId === 'resume') {
              const resumeUrl = portfolio.personal.resumeUrl
              if (!resumeUrl) return null
              return (
                <li key={item.sectionId}>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pb-1.5 text-[15.7px] font-semibold tracking-[0.04rem] transition-all duration-200 text-[#0e2431] hover:border-b-[2px] hover:border-[#011aff] hover:text-[#011aff]"
                  >
                    {item.label}
                  </a>
                </li>
              )
            }
            const isActive = activeSection === item.sectionId
            const targetHref = isHomePage ? item.href : `/${item.href}`
            return (
              <li key={item.sectionId}>
                <Link
                  href={targetHref}
                  onClick={() => setActiveSection(item.sectionId)}
                  className={`pb-1.5 text-[15.7px] font-semibold tracking-[0.04rem] transition-all duration-200 ${
                    isActive
                      ? 'border-b-[2px] border-[#011aff] text-[#011aff]'
                      : 'text-[#0e2431] hover:border-b-[2px] hover:border-[#011aff] hover:text-[#011aff]'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

      </nav>

      {/* Mobile Hamburger Button */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          aria-label="Toggle Menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-[#18023f] p-1 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Slide-in Drawer */}
      <div
        className={`fixed top-[65px] right-0 h-[calc(100vh-65px)] w-3/4 max-w-xs bg-[#0e0f31] p-4 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-3">
          {NAV_ITEMS.map((item) => {
            if (item.sectionId === 'resume') {
              const resumeUrl = portfolio.personal.resumeUrl
              if (!resumeUrl) return null
              return (
                <li key={item.sectionId}>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-md px-4 py-3 text-left text-[18px] font-semibold text-white transition-all hover:border-b-4 hover:border-[#011aff] hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                </li>
              )
            }
            const isActive = activeSection === item.sectionId
            const targetHref = isHomePage ? item.href : `/${item.href}`
            return (
              <li key={item.sectionId}>
                <Link
                  href={targetHref}
                  onClick={() => {
                    setActiveSection(item.sectionId)
                    setMobileMenuOpen(false)
                  }}
                  className={`block rounded-md px-4 py-3 text-left text-[18px] font-semibold text-white transition-all ${
                    isActive
                      ? 'border-b-4 border-[#011aff] bg-white/5'
                      : 'hover:border-b-4 hover:border-[#011aff] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
