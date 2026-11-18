'use client'

import { GraduationCap } from 'lucide-react'
import { usePortfolio } from '@/hooks/use-portfolio'

export function EducationSection() {
  const { portfolio } = usePortfolio()
  const { education = [], personal } = portfolio

  return (
    <section id="education" className="min-h-[80vh] bg-[#e5ecfb] px-6 py-14 md:px-[9%]">
      <h2 className="flex items-center justify-center gap-2.5 text-center text-3xl font-extrabold text-[#202020] sm:text-[35px]">
        <GraduationCap className="h-9 w-9 stroke-[2.5] text-[#202020]" />
        <span>
          My <span className="text-[#7303a7]">Education</span>
        </span>
      </h2>

      <p className="mt-2 text-center font-['Nunito',sans-serif] text-[15px] font-semibold text-[#222]">
        {personal.educationQuote}
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-6">
        {education.map((item) => (
          <div
            key={item.id}
            className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-[#fcfcfc] shadow-[0.2rem_0.5rem_1rem_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[1rem_0.5rem_1.2rem_rgba(0,0,0,0.3)] sm:flex-row"
          >
            <div className="h-52 w-full sm:h-auto sm:w-64 sm:shrink-0">
              <img
                src={item.image || '/assets/images/educat/college.jpg'}
                alt={item.institution}
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center p-5 text-left">
              <h3 className="text-xl font-semibold text-[#012970] sm:text-[23px]">
                {item.degree}
              </h3>
              <p className="mt-1.5 text-[15px] text-[#333]">{item.institution}</p>
              <h4 className="mt-3 font-['Nunito',sans-serif] text-[18px] font-bold text-[#226d00]">
                {item.duration}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
