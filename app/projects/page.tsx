'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Laptop, Eye, Code, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { TiltBox } from '@/components/tilt-box'
import { usePortfolio } from '@/hooks/use-portfolio'

const CATEGORIES = [
  { key: 'all', label: 'All Projects' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'mern', label: 'MERN Stack' },
  { key: 'ai', label: 'AI Project' },
  { key: 'webdev', label: 'Web Dev' },
] as const

export default function ProjectsPage() {
  const { portfolio } = usePortfolio()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredProjects =
    selectedCategory === 'all'
      ? portfolio.projects
      : portfolio.projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#010136] font-['Poppins',sans-serif] text-white">
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#010136] to-[#00003a] px-6 pt-28 pb-16 md:px-[9%]">
        <h2 className="flex items-center justify-center gap-2.5 text-center text-3xl font-extrabold text-white sm:text-[35px]">
          <Laptop className="h-8 w-8 stroke-[2.5] text-white" />
          <span>
            Projects <span className="text-[#ffe600]">Made</span>
          </span>
        </h2>

        {/* Category Filter Buttons */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`cursor-pointer rounded-[3px] border border-white px-5 py-2.5 text-sm font-medium transition ${
                  active
                    ? 'bg-white text-black font-semibold'
                    : 'bg-transparent text-white hover:bg-white hover:text-black'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <TiltBox key={project.id} maxTilt={10}>
              <div className="group relative h-[300px] overflow-hidden rounded-lg bg-white text-black shadow-[0_0.7rem_1rem_rgba(0,0,0,0.3)]">
                <img
                  src={project.image || '/assets/images/projects/portfolio1.png'}
                  alt={project.name}
                  draggable={false}
                  className="h-full w-full object-cover"
                />

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

        {/* Back to Home Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-lg border-2 border-white px-7 py-3.5 font-['Nunito',sans-serif] text-[17px] font-semibold text-white shadow-[0px_2px_4px_rgba(48,68,247,0.3)] transition-all duration-300 hover:bg-white hover:text-black"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
