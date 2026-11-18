'use client'

import { User, ChevronRight } from 'lucide-react'
import { TiltBox } from '@/components/tilt-box'
import { usePortfolio } from '@/hooks/use-portfolio'

export function AboutSection() {
  const { portfolio } = usePortfolio()
  const { personal } = portfolio

  return (
    <section id="about" className="min-h-screen bg-white px-6 py-14 md:px-[9%]">
      <h2 className="flex items-center justify-center gap-2.5 text-center text-3xl font-extrabold text-[#202020] sm:text-[35px]">
        <User className="h-8 w-8 stroke-[2.5] text-[#202020]" />
        <span>
          About <span className="text-[#7303a7]">Me</span>
        </span>
      </h2>

      <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:items-start md:p-10">
        {/* Profile Image */}
        <div className="flex flex-1 basis-[320px] justify-center">
          <TiltBox className="w-[260px] sm:w-[300px]">
            <img
              src={personal.aboutImage || '/assets/images/profile2.jpg'}
              alt={`${personal.firstName} ${personal.lastName}`}
              draggable={false}
              className="h-auto w-full cursor-pointer rounded-[5%] shadow-[0_5px_10px_rgba(0,0,0,0.6)] mix-blend-luminosity transition-all duration-300 hover:mix-blend-normal"
            />
          </TiltBox>
        </div>

        {/* Content */}
        <div className="flex-1 basis-[420px] p-2 md:p-6">
          <h3 className="text-2xl font-bold text-[#1b1b1b]">
            I&apos;m {personal.firstName}
          </h3>
          <span className="mt-1 inline-block text-sm font-semibold text-[#020133]">
            {personal.role}
          </span>

          <p className="mt-4 font-['Nunito',sans-serif] text-[15.5px] font-semibold leading-relaxed text-[#222] normal-case">
            {personal.bio}
          </p>

          <div className="mt-5 flex flex-wrap gap-6 font-['Nunito',sans-serif] text-[15.5px] font-semibold">
            <div className="space-y-2">
              {personal.phone && (
                <p className="normal-case">
                  <span className="text-[#011aff]">Phone : </span>
                  {personal.phone}
                </p>
              )}
              <p className="normal-case">
                <span className="text-[#011aff]">Email : </span>
                {personal.email}
              </p>
              <p className="normal-case">
                <span className="text-[#011aff]">Place : </span>
                {personal.place}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <a
              href={personal.resumeUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-[#2506ad] px-7 py-3.5 font-['Nunito',sans-serif] text-[18px] font-semibold tracking-wider text-white shadow-[0px_5px_10px_rgba(48,68,247,0.6)] transition-all duration-300 hover:bg-[#1a047e]"
            >
              <span>Resume</span>
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
