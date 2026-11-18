'use client'

import Link from 'next/link'
import { Laptop, Eye, Code, ArrowRight } from 'lucide-react'
import { TiltBox } from '@/components/tilt-box'
import { usePortfolio } from '@/hooks/use-portfolio'

export function WorkSection() {
  const { portfolio } = usePortfolio()
  const featuredProjects = portfolio.projects
    .filter((p) => p.category !== 'android')
    .slice(0, 6)

  return (
    <section
      id="work"
      className="min-h-screen bg-gradient-to-b from-[#000031] to-[#00002c] px-6 py-14 md:px-[9%]"
    >
      <h2 className="flex items-center justify-center gap-2.5 p-2 text-center text-3xl font-extrabold text-white sm:text-[35px]">
        <Laptop className="h-8 w-8 stroke-[2.5] text-white" />
        <span>
          Projects <span className="text-[#ffe600]">Made</span>
        </span>
      </h2>

      <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <TiltBox key={project.id} maxTilt={10}>
            <div className="group relative h-[300px] overflow-hidden rounded-lg bg-white shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)]">
              <img
                src={project.image || '/assets/images/projects/portfolio1.png'}
                alt={project.name}
                draggable={false}
                className="h-full w-full object-cover"
              />

              {/* Hover Slide-up Overlay */}
              <div className="absolute left-0 top-[85%] flex h-full w-full flex-col bg-white/95 transition-all duration-300 group-hover:top-[22%]">
                <div className="flex h-[45px] w-full shrink-0 items-center justify-between bg-[#ffd900] px-4">
                  <h3 className="truncate text-[18px] font-bold text-[#111]">
                    {project.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <p className="line-clamp-3 text-[14.5px] leading-relaxed text-[#222] normal-case">
                    {project.desc}
                  </p>

                  <div className="mb-12 flex items-center justify-between gap-3 pt-2">
                    <a
                      href={project.links.view || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#0c0c0c] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#310ae0]"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </a>
                    <a
                      href={project.links.code || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#0c0c0c] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#310ae0]"
                    >
                      <span>Code</span>
                      <Code className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </TiltBox>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-lg border-2 border-white px-7 py-3.5 font-['Nunito',sans-serif] text-[17px] font-bold text-white shadow-[0px_5px_10px_rgba(65,84,241,0.4)] transition-all duration-300 hover:bg-white hover:text-black"
        >
          <span>View All</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  )
}
