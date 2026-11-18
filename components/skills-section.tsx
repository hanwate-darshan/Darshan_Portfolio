'use client'

import { useState } from 'react'
import {
  Laptop,
  Code2,
  Server,
  Database,
  Sparkles,
  Cloud,
  ShieldCheck,
  CreditCard,
  Wrench,
  Terminal,
  Cpu,
  Layers,
  Bot,
  BrainCircuit,
  Workflow,
  GitFork,
  BookOpenCheck,
  Network,
  Boxes,
  KeyRound,
  Lock,
  Shield,
  Gauge,
  GitMerge,
  HardDrive,
  CloudLightning,
  Compass,
  Binary,
  LayoutGrid,
  Share2,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { TiltBox } from '@/components/tilt-box'
import { usePortfolio } from '@/hooks/use-portfolio'
import type { SkillCategory } from '@/lib/portfolio-types'

const DEFAULT_TECHNICAL_SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'Redux Toolkit',
      'Context API',
    ],
  },
  {
    category: 'Backend',
    skills: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'Microservices Architecture',
      'BullMQ (Job Queue)',
      'Socket.io',
      'Mongoose',
    ],
  },
  {
    category: 'Databases & Caching',
    skills: [
      'MongoDB',
      'MongoDB Atlas',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Qdrant',
      'Vector DB',
    ],
  },
  {
    category: 'AI Development',
    skills: [
      'LLM API Integration',
      'LangChain',
      'LangGraph',
      'RAG (Retrieval-Augmented Generation)',
      'Vector DB (Qdrant)',
      'Multi-Agent AI',
      'AI Tool Calling',
    ],
  },
  {
    category: 'DevOps & Cloud',
    skills: [
      'Docker',
      'Docker Compose',
      'CI/CD Pipelines',
      'AWS CLI',
      'AWS EC2',
      'AWS S3',
      'AWS CloudFront',
      'Vercel',
      'Render',
    ],
  },
  {
    category: 'Authentication & Security',
    skills: [
      'JWT',
      'bcrypt',
      'Firebase Authentication',
      'Google OAuth',
      'Helmet',
      'Rate Limiting',
    ],
  },
  {
    category: 'Payment Integration',
    skills: ['Razorpay', 'Stripe'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Postman', 'MongoDB Compass', 'AWS CLI'],
  },
  {
    category: 'Programming Languages',
    skills: ['C++', 'Java', 'SQL', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'System Design & Core Concepts',
    skills: [
      'System Design (HLD & LLD)',
      'Microservices Architecture',
      'Data Structures & Algorithms (DSA)',
      'Object-Oriented Programming (OOP)',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
  },
]

const CATEGORY_META: Record<
  string,
  {
    icon: LucideIcon
    color: string
    activeGradient: string
    accentBorder: string
    badgeBg: string
  }
> = {
  Frontend: {
    icon: Code2,
    color: 'from-blue-400 to-cyan-300',
    activeGradient: 'from-blue-600 to-cyan-500 text-white shadow-cyan-500/25',
    accentBorder: 'border-cyan-400/40',
    badgeBg: 'bg-blue-500/20 text-cyan-200 border-blue-400/30',
  },
  Backend: {
    icon: Server,
    color: 'from-emerald-400 to-teal-300',
    activeGradient: 'from-emerald-600 to-teal-500 text-white shadow-emerald-500/25',
    accentBorder: 'border-emerald-400/40',
    badgeBg: 'bg-emerald-500/20 text-teal-200 border-emerald-400/30',
  },
  'Databases & Caching': {
    icon: Database,
    color: 'from-amber-400 to-orange-300',
    activeGradient: 'from-amber-600 to-orange-500 text-white shadow-amber-500/25',
    accentBorder: 'border-amber-400/40',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
  },
  Databases: {
    icon: Database,
    color: 'from-amber-400 to-orange-300',
    activeGradient: 'from-amber-600 to-orange-500 text-white shadow-amber-500/25',
    accentBorder: 'border-amber-400/40',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/30',
  },
  'AI Development': {
    icon: Sparkles,
    color: 'from-fuchsia-400 to-pink-300',
    activeGradient: 'from-fuchsia-600 to-pink-500 text-white shadow-fuchsia-500/25',
    accentBorder: 'border-pink-400/40',
    badgeBg: 'bg-pink-500/20 text-pink-200 border-pink-400/30',
  },
  'DevOps & Cloud': {
    icon: Cloud,
    color: 'from-sky-400 to-indigo-300',
    activeGradient: 'from-sky-600 to-indigo-500 text-white shadow-sky-500/25',
    accentBorder: 'border-sky-400/40',
    badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-400/30',
  },
  'Authentication & Security': {
    icon: ShieldCheck,
    color: 'from-rose-400 to-red-300',
    activeGradient: 'from-rose-600 to-red-500 text-white shadow-rose-500/25',
    accentBorder: 'border-rose-400/40',
    badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
  },
  'Payment Integration': {
    icon: CreditCard,
    color: 'from-green-400 to-emerald-300',
    activeGradient: 'from-green-600 to-emerald-500 text-white shadow-green-500/25',
    accentBorder: 'border-green-400/40',
    badgeBg: 'bg-green-500/20 text-green-200 border-green-400/30',
  },
  Tools: {
    icon: Wrench,
    color: 'from-violet-400 to-purple-300',
    activeGradient: 'from-violet-600 to-purple-500 text-white shadow-purple-500/25',
    accentBorder: 'border-purple-400/40',
    badgeBg: 'bg-purple-500/20 text-purple-200 border-purple-400/30',
  },
  'Programming Languages': {
    icon: Terminal,
    color: 'from-yellow-400 to-amber-300',
    activeGradient: 'from-yellow-500 to-amber-500 text-white shadow-yellow-500/25',
    accentBorder: 'border-yellow-400/40',
    badgeBg: 'bg-yellow-500/20 text-yellow-200 border-yellow-400/30',
  },
  'System Design & Core Concepts': {
    icon: Cpu,
    color: 'from-indigo-400 to-purple-300',
    activeGradient: 'from-indigo-600 to-purple-500 text-white shadow-indigo-500/25',
    accentBorder: 'border-indigo-400/40',
    badgeBg: 'bg-indigo-500/20 text-indigo-200 border-indigo-400/30',
  },
}

// Brand icon mapping with Devicon & high-quality CDN URLs
const SKILL_ICONS: Record<string, string> = {
  HTML5: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  CSS3: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  ReactJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  TailwindCSS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'Redux Toolkit': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
  Redux: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  NodeJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'Express.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  ExpressJS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  'Socket.io': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
  MongoDB: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'MongoDB Atlas': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  'MongoDB Compass': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  Mongoose: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg',
  Redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'Docker Compose': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  AWS: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'AWS CLI': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'AWS EC2': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'AWS S3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  'AWS CloudFront': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  Vercel: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  'Git VCS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  GitHub: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  Postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
  'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  SQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  Postgres: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'Firebase Authentication': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg',
  Firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg',
  'Google OAuth': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg',
  Stripe: 'https://img.icons8.com/color/48/000000/stripe.png',
  Razorpay: 'https://img.icons8.com/color/48/000000/razorpay.png',
}

// Fallback Lucide icons for specific concepts or tools
const SKILL_FALLBACK_ICONS: Record<string, LucideIcon> = {
  'Context API': Share2,
  'REST APIs': Network,
  'Microservices Architecture': Boxes,
  'BullMQ (Job Queue)': Layers,
  Mongoose: Database,
  Qdrant: Database,
  'Vector DB': Database,
  'Vector DB (Qdrant)': Database,
  'LLM API Integration': Bot,
  LangChain: Sparkles,
  LangGraph: Workflow,
  'RAG (Retrieval-Augmented Generation)': BookOpenCheck,
  'Multi-Agent AI': Bot,
  'AI Tool Calling': BrainCircuit,
  'CI/CD Pipelines': GitMerge,
  Render: Cloud,
  JWT: KeyRound,
  bcrypt: Lock,
  Helmet: Shield,
  'Rate Limiting': Gauge,
  'System Design (HLD & LLD)': LayoutGrid,
  'Data Structures & Algorithms (DSA)': Binary,
  'Object-Oriented Programming (OOP)': Boxes,
  DBMS: Database,
  'Operating Systems': Terminal,
  'Computer Networks': Network,
}

interface SkillCardProps {
  skill: string
}

function SkillCard({ skill }: SkillCardProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const iconUrl = SKILL_ICONS[skill]
  const FallbackIcon = SKILL_FALLBACK_ICONS[skill] || Code2

  return (
    <TiltBox maxTilt={10} className="h-full">
      <div className="group relative flex h-full min-h-[130px] flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-[rgba(0,0,22,0.7)] p-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#ffe600]/60 hover:bg-[#000016] hover:shadow-[0_8px_20px_rgba(255,230,0,0.2)]">
        {/* Icon Container */}
        <div className="flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover:scale-110">
          {iconUrl && !imgFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={iconUrl}
              alt=""
              aria-hidden="true"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <FallbackIcon className="h-9 w-9 text-[#ffe600]" />
          )}
        </div>

        {/* Skill Name */}
        <span className="text-center font-['Nunito',sans-serif] text-xs font-bold tracking-wide text-white transition-colors group-hover:text-[#ffe600] sm:text-[14px]">
          {skill}
        </span>
      </div>
    </TiltBox>
  )
}

const INITIAL_ALL_LIMIT = 18

export function SkillsSection() {
  const { portfolio } = usePortfolio()
  const categories: SkillCategory[] =
    portfolio.technicalSkills && portfolio.technicalSkills.length > 0
      ? portfolio.technicalSkills
      : DEFAULT_TECHNICAL_SKILLS

  // Unique list of all skills across all categories
  const allUniqueSkills = Array.from(
    new Set(categories.flatMap((cat) => cat.skills))
  )

  const [activeCategoryName, setActiveCategoryName] = useState<string>('All')
  const [showAllSkills, setShowAllSkills] = useState(false)

  const isAllCategory = activeCategoryName === 'All'

  const activeCategory = isAllCategory
    ? { category: 'All', skills: allUniqueSkills }
    : categories.find((c) => c.category === activeCategoryName) || categories[0]

  // Limit displayed skills only when in 'All' tab and not expanded
  const displayedSkills =
    isAllCategory && !showAllSkills
      ? allUniqueSkills.slice(0, INITIAL_ALL_LIMIT)
      : activeCategory.skills

  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-b from-[#57059e] via-[#4800b3] to-[#010136] px-6 py-14 md:px-[9%]"
    >
      {/* Title matching portfolio theme */}
      <h2 className="flex items-center justify-center gap-2.5 text-center text-3xl font-extrabold text-white sm:text-[35px]">
        <Laptop className="h-8 w-8 stroke-[2.5] text-white" />
        <span>
          Skills & <span className="text-[#ffe600]">Abilities</span>
        </span>
      </h2>

      {/* Category Navigation Row */}
      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        {/* 'All' Tab placed before Frontend */}
        <button
          type="button"
          onClick={() => {
            setActiveCategoryName('All')
          }}
          className={`group flex items-center gap-2 rounded-lg px-4 py-2 font-['Nunito',sans-serif] text-sm font-bold transition-all duration-200 sm:px-5 sm:py-2.5 ${
            isAllCategory
              ? 'scale-105 bg-[#ffe600] text-[#020133] shadow-[0_4px_12px_rgba(255,230,0,0.4)]'
              : 'border border-white/15 bg-[rgba(0,0,22,0.5)] text-white/80 hover:bg-white/15 hover:text-white'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>All</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
              isAllCategory
                ? 'bg-[#020133]/20 text-[#020133]'
                : 'bg-white/10 text-white/70'
            }`}
          >
            {allUniqueSkills.length}
          </span>
        </button>

        {/* Individual Category Tabs */}
        {categories.map((cat) => {
          const isSelected = cat.category === activeCategoryName
          return (
            <button
              key={cat.category}
              type="button"
              onClick={() => {
                setActiveCategoryName(cat.category)
              }}
              className={`group flex items-center gap-2 rounded-lg px-4 py-2 font-['Nunito',sans-serif] text-sm font-bold transition-all duration-200 sm:px-5 sm:py-2.5 ${
                isSelected
                  ? 'scale-105 bg-[#ffe600] text-[#020133] shadow-[0_4px_12px_rgba(255,230,0,0.4)]'
                  : 'border border-white/15 bg-[rgba(0,0,22,0.5)] text-white/80 hover:bg-white/15 hover:text-white'
              }`}
            >
              <span>{cat.category}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  isSelected
                    ? 'bg-[#020133]/20 text-[#020133]'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {cat.skills.length}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Container matching the classic portfolio glass box */}
      <div className="mx-auto mt-8 max-w-6xl rounded-2xl border border-white/10 bg-[rgba(0,0,22,0.4)] p-6 shadow-[0_5px_15px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-8 md:p-10">
        {/* Technology Cards Grid with TiltBox */}
        <div
          key={`${activeCategoryName}-${showAllSkills}`}
          className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          {displayedSkills.map((skill) => (
            <SkillCard key={skill} skill={skill} />
          ))}
        </div>

        {/* See All / Show Less button styled like the site's signature View All button */}
        {isAllCategory && allUniqueSkills.length > INITIAL_ALL_LIMIT && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllSkills((prev) => !prev)}
              className="group inline-flex items-center gap-2 rounded-lg border-2 border-white px-7 py-3 font-['Nunito',sans-serif] text-[16px] font-bold text-white shadow-[0px_5px_10px_rgba(65,84,241,0.4)] transition-all duration-300 hover:bg-white hover:text-black"
            >
              <span>
                {showAllSkills
                  ? 'Show Less'
                  : `See All (${allUniqueSkills.length} Skills)`}
              </span>
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  showAllSkills
                    ? '-rotate-90'
                    : 'rotate-90 group-hover:translate-y-0.5'
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

