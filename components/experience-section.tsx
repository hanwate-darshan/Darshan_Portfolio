'use client'

import Link from 'next/link'
import { Briefcase, ArrowRight } from 'lucide-react'
import { usePortfolio } from '@/hooks/use-portfolio'

export function ExperienceSection() {
  const { portfolio } = usePortfolio()
  const experiences = portfolio.experience.slice(0, 6)

  return (
    <section id="experience" className="min-h-screen bg-[#f7f7f7] px-6 py-14 md:px-[9%]">
      <h2 className="flex items-center justify-center gap-2.5 text-center text-3xl font-extrabold text-[#202020] sm:text-[35px]">
        <Briefcase className="h-8 w-8 stroke-[2.5] text-[#202020]" />
        <span>Experience</span>
      </h2>

      {/* Alternating Vertical Timeline */}
      <div className="relative mx-auto mt-10 max-w-5xl">
        {/* Vertical Line */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-[22px] w-[6px] bg-[#020133] md:left-1/2 md:-ml-[3px]"
        />

        <div className="space-y-6">
          {experiences.map((item, idx) => {
            const isLeft = idx % 2 === 0
            return (
              <div
                key={item.id}
                className={`relative flex w-full items-start ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                {/* Circle Icon on Timeline */}
                <div
                  className="
                    absolute left-[8px] top-4 z-10 flex h-8 w-8 items-center justify-center
                    rounded-full border-4 border-[#ff9f55] bg-white text-[#02094b]
                    md:left-1/2 md:-ml-4
                  "
                >
                  <Briefcase className="h-3.5 w-3.5" />
                </div>

                {/* Card Container */}
                <div
                  className={`w-full pl-16 md:w-1/2 ${
                    isLeft ? 'md:pl-0 md:pr-10' : 'md:pl-10'
                  }`}
                >
                  <div className="relative rounded-md bg-[#f68c09] p-5 text-[#02094b] shadow-md">
                    {/* Arrow Pointer */}
                    <span
                      aria-hidden="true"
                      className={`hidden md:block absolute top-5 h-0 w-0 border-y-[10px] border-y-transparent ${
                        isLeft
                          ? '-right-[10px] border-l-[10px] border-l-[#f68c09]'
                          : '-left-[10px] border-r-[10px] border-r-[#f68c09]'
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="block md:hidden absolute top-5 -left-[10px] h-0 w-0 border-y-[10px] border-y-transparent border-r-[10px] border-r-[#f68c09]"
                    />

                    <div className="text-[19px] font-bold text-[#020133]">
                      <h2>{item.company}</h2>
                    </div>
                    <div className="mt-1.5">
                      <h3 className="text-[15.5px] font-semibold text-[#111]">
                        {item.role}
                      </h3>
                      <p className="mt-0.5 text-[13px] font-medium text-[#222] normal-case">
                        {item.duration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/experience"
          className="group inline-flex items-center gap-2 rounded-lg bg-[#2506ad] px-7 py-3.5 font-['Nunito',sans-serif] text-[17px] font-semibold text-white shadow-[0px_5px_10px_rgba(48,68,247,0.6)] transition-all duration-300 hover:bg-[#1a047e]"
        >
          <span>View All</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  )
}
