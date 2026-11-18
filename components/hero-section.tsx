'use client'

import { useState, useEffect } from 'react'
import { ArrowDownCircle } from 'lucide-react'
import {
  LinkedInIcon,
  GitHubIcon,
  TwitterIcon,
  TelegramIcon,
  InstagramIcon,
  DevIcon,
} from '@/components/social-icons'
import { ParticlesCanvas } from '@/components/particles-canvas'
import { TiltBox } from '@/components/tilt-box'
import { usePortfolio } from '@/hooks/use-portfolio'

export function HeroSection() {
  const { portfolio } = usePortfolio()
  const { personal, socials } = portfolio

  const [displayText, setDisplayText] = useState(
    () => personal.typingStrings?.[0] || 'Frontend Development'
  )
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const words =
      personal.typingStrings && personal.typingStrings.length > 0
        ? personal.typingStrings
        : ['Frontend Development', 'Backend Development', 'Web Designing', 'Web Development']

    const currentWord = words[wordIndex % words.length]
    const speed = isDeleting ? 35 : 70

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 900)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      } else {
        setDisplayText(
          currentWord.substring(0, displayText.length + (isDeleting ? -1 : 1))
        )
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, wordIndex, personal.typingStrings])

  const socialItems = [
    {
      name: 'LinkedIn',
      href: socials.linkedin,
      icon: LinkedInIcon,
      hoverClass: 'hover:bg-[#007bb6]',
    },
    {
      name: 'GitHub',
      href: socials.github,
      icon: GitHubIcon,
      hoverClass: 'hover:bg-[#0e0e0e]',
    },
    {
      name: 'Twitter',
      href: socials.twitter,
      icon: TwitterIcon,
      hoverClass: 'hover:bg-[#00aced]',
    },
    {
      name: 'Telegram',
      href: socials.telegram,
      icon: TelegramIcon,
      hoverClass: 'hover:bg-[#0088cc]',
    },
    {
      name: 'Instagram',
      href: socials.instagram,
      icon: InstagramIcon,
      hoverClass: 'hover:bg-[#ee00da]',
    },
    {
      name: 'Dev',
      href: socials.dev,
      icon: DevIcon,
      hoverClass: 'hover:bg-[#070707]',
    },
  ].filter((item) => Boolean(item.href))

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-wrap items-center justify-between gap-8 overflow-hidden bg-[#f7f7f7] px-6 pt-24 pb-12 md:px-[9%]"
    >
      <ParticlesCanvas />

      {/* Left Content */}
      <div className="relative z-10 flex-1 basis-[360px] pt-4">
        <h2 className="leading-[1.2] text-[#002057]">
          <span className="block text-xl font-semibold text-[#002057] sm:text-2xl mb-1">
            Hi There,
          </span>
          <span className="text-4xl font-extrabold sm:text-5xl lg:text-[50px]">
            I&apos;m {personal.firstName}{' '}
            <span className="text-[#ff7b00]">{personal.lastName}</span>
          </span>
        </h2>

        <p className="py-4 text-xl font-semibold text-black sm:text-[25px] capitalize">
          I Am Into{' '}
          <span className="text-[#940808] font-bold">
            {displayText}
            <span className="ml-0.5 inline-block animate-pulse text-[#940808]">|</span>
          </span>
        </p>

        <div className="mt-3">
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-full bg-[#2506ad] px-8 py-3.5 font-['Nunito',sans-serif] text-[17px] font-bold tracking-wider text-white shadow-[0px_5px_18px_rgba(48,68,247,0.6)] transition-all duration-300 hover:bg-[#1a047e]"
          >
            <span>About Me</span>
            <ArrowDownCircle className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Social Icons */}
        <div className="mt-10">
          <ul className="flex flex-wrap items-center gap-2.5 list-none p-0">
            {socialItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-[#09011b] text-[#00d9ff] transition-all duration-200 hover:text-white ${item.hoverClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Right Avatar Image */}
      <div className="relative z-10 flex flex-1 basis-[340px] items-center justify-center">
        <TiltBox className="w-[72%] max-w-[390px]">
          <img
            src={personal.heroImage || '/assets/images/hero.png'}
            alt={`${personal.firstName} ${personal.lastName} Avatar`}
            draggable={false}
            className="h-auto w-full cursor-pointer rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
          />
        </TiltBox>
      </div>
    </section>
  )
}
