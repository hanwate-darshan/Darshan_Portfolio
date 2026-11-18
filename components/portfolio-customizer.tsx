'use client'

import { useState, useEffect } from 'react'
import {
  X,
  Save,
  Plus,
  Trash2,
  Download,
  Check,
  User,
  Share2,
  Laptop,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Loader2,
} from 'lucide-react'
import { usePortfolio } from '@/hooks/use-portfolio'
import { downloadProjectZip } from '@/lib/download-project-zip'
import type { PortfolioData } from '@/lib/portfolio-types'

interface PortfolioCustomizerProps {
  open: boolean
  onClose: () => void
}

type TabKey = 'personal' | 'socials' | 'skills' | 'experience' | 'projects'

export function PortfolioCustomizer({ open, onClose }: PortfolioCustomizerProps) {
  const { portfolio, updatePortfolio } = usePortfolio()
  const [draft, setDraft] = useState<PortfolioData>(portfolio)
  const [activeTab, setActiveTab] = useState<TabKey>('personal')
  const [saving, setSaving] = useState(false)
  const [savedToast, setSavedToast] = useState(false)
  const [downloadingZip, setDownloadingZip] = useState(false)

  const handleDownloadFullZip = async () => {
    if (downloadingZip) return
    setDownloadingZip(true)
    try {
      await downloadProjectZip()
    } finally {
      setDownloadingZip(false)
    }
  }

  useEffect(() => {
    setDraft(portfolio)
  }, [portfolio, open])

  if (!open) return null

  const handleSave = async () => {
    setSaving(true)
    try {
      await updatePortfolio(draft)
      setSavedToast(true)
      setTimeout(() => setSavedToast(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const tabs: { key: TabKey; label: string; icon: typeof User }[] = [
    { key: 'personal', label: 'Personal Info', icon: User },
    { key: 'socials', label: 'Social Links', icon: Share2 },
    { key: 'skills', label: 'Skills', icon: Laptop },
    { key: 'experience', label: 'Experience', icon: Briefcase },
    { key: 'projects', label: 'Projects', icon: FolderGit2 },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#00012b] px-6 py-4 text-white">
          <div>
            <h2 className="text-lg font-bold">
              Customize Your Portfolio (अपनी जानकारी यहाँ जोड़ें)
            </h2>
            <p className="text-xs text-slate-300 normal-case">
              Update your name, bio, skills, education, experience, and projects live — saves directly to{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-[#ffae00]">
                data/portfolio.json
              </code>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Customizer"
            className="rounded-lg p-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 px-4">
          {tabs.map((t) => {
            const Icon = t.icon
            const isActive = activeTab === t.key
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
                  isActive
                    ? 'border-[#2506ad] text-[#2506ad] bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{t.label}</span>
              </button>
            )
          })}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-800 normal-case">
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={draft.personal.firstName}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, firstName: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Last Name (Highlighted in Orange)
                </label>
                <input
                  type="text"
                  value={draft.personal.lastName}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, lastName: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Navbar Logo Text
                </label>
                <input
                  type="text"
                  value={draft.personal.logoText}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, logoText: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Role / Title (e.g. Full Stack Developer)
                </label>
                <input
                  type="text"
                  value={draft.personal.role}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, role: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Typing Animation Phrases (comma separated)
                </label>
                <input
                  type="text"
                  value={draft.personal.typingStrings.join(', ')}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: {
                        ...draft.personal,
                        typingStrings: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  About Me Bio
                </label>
                <textarea
                  rows={4}
                  value={draft.personal.bio}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, bio: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={draft.personal.email}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, email: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={draft.personal.phone}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, phone: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  City / Location (Place)
                </label>
                <input
                  type="text"
                  value={draft.personal.place}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, place: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Resume Link (Google Drive / PDF URL)
                </label>
                <input
                  type="text"
                  value={draft.personal.resumeUrl}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, resumeUrl: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Hero Avatar Image URL
                </label>
                <input
                  type="text"
                  value={draft.personal.heroImage}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, heroImage: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  About Profile Photo URL
                </label>
                <input
                  type="text"
                  value={draft.personal.aboutImage}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      personal: { ...draft.personal, aboutImage: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                />
              </div>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(['linkedin', 'github', 'twitter', 'telegram', 'instagram', 'dev'] as const).map(
                (key) => (
                  <div key={key}>
                    <label className="mb-1 block text-xs font-bold uppercase text-slate-700">
                      {key} URL
                    </label>
                    <input
                      type="text"
                      value={draft.socials[key]}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          socials: { ...draft.socials, [key]: e.target.value },
                        })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2506ad]"
                    />
                  </div>
                )
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Add or edit skills displayed in the Skills &amp; Abilities grid.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      skills: [
                        {
                          name: 'NextJS',
                          icon: 'https://img.icons8.com/fluency/48/000000/nextjs.png',
                        },
                        ...draft.skills,
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#2506ad] px-3 py-1.5 text-xs font-bold text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {draft.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 p-2.5"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="h-8 w-8 shrink-0 object-contain"
                    />
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        placeholder="Skill Name"
                        value={skill.name}
                        onChange={(e) => {
                          const next = [...draft.skills]
                          next[idx] = { ...next[idx], name: e.target.value }
                          setDraft({ ...draft, skills: next })
                        }}
                        className="w-full rounded border border-slate-200 px-2 py-1 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Icon URL"
                        value={skill.icon}
                        onChange={(e) => {
                          const next = [...draft.skills]
                          next[idx] = { ...next[idx], icon: e.target.value }
                          setDraft({ ...draft, skills: next })
                        }}
                        className="w-full rounded border border-slate-200 px-2 py-1 text-[11px] text-slate-500"
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Remove skill"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          skills: draft.skills.filter((_, i) => i !== idx),
                        })
                      }
                      className="rounded p-1.5 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}



          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Manage your work experience, internships, and open-source timeline.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      experience: [
                        {
                          id: `exp-${Date.now()}`,
                          company: 'Company Name',
                          role: 'Software Engineer',
                          duration: 'Jan 2024 - Present',
                        },
                        ...draft.experience,
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#2506ad] px-3 py-1.5 text-xs font-bold text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              {draft.experience.map((exp, idx) => (
                <div
                  key={exp.id}
                  className="grid grid-cols-1 gap-2.5 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 sm:grid-cols-12 sm:items-center"
                >
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => {
                      const next = [...draft.experience]
                      next[idx] = { ...next[idx], company: e.target.value }
                      setDraft({ ...draft, experience: next })
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm sm:col-span-4"
                  />
                  <input
                    type="text"
                    placeholder="Role / Position"
                    value={exp.role}
                    onChange={(e) => {
                      const next = [...draft.experience]
                      next[idx] = { ...next[idx], role: e.target.value }
                      setDraft({ ...draft, experience: next })
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm sm:col-span-4"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => {
                      const next = [...draft.experience]
                      next[idx] = { ...next[idx], duration: e.target.value }
                      setDraft({ ...draft, experience: next })
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm sm:col-span-3"
                  />
                  <button
                    type="button"
                    aria-label="Delete experience"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        experience: draft.experience.filter((_, i) => i !== idx),
                      })
                    }
                    className="flex items-center justify-center rounded-lg p-2 text-red-600 hover:bg-red-50 sm:col-span-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Add or edit projects showcased on the Home page and All Projects page.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...draft,
                      projects: [
                        {
                          id: `proj-${Date.now()}`,
                          name: 'My New Project',
                          desc: 'Built using Next.js, TypeScript, and Tailwind CSS.',
                          image: '/assets/images/projects/portfolio1.png',
                          category: 'mern',
                          links: {
                            view: 'https://example.com',
                            code: 'https://github.com',
                          },
                        },
                        ...draft.projects,
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#2506ad] px-3 py-1.5 text-xs font-bold text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {draft.projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#2506ad]">
                      Project #{idx + 1}: {proj.name}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          projects: draft.projects.filter((_, i) => i !== idx),
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={proj.name}
                      onChange={(e) => {
                        const next = [...draft.projects]
                        next[idx] = { ...next[idx], name: e.target.value }
                        setDraft({ ...draft, projects: next })
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    />
                    <select
                      value={proj.category}
                      onChange={(e) => {
                        const next = [...draft.projects]
                        next[idx] = {
                          ...next[idx],
                          category: e.target.value as PortfolioData['projects'][number]['category'],
                        }
                        setDraft({ ...draft, projects: next })
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      <option value="mern">MERN Stack</option>
                      <option value="lamp">LAMP Stack</option>
                      <option value="basicweb">Basic Web</option>
                      <option value="android">Android App</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={proj.image}
                      onChange={(e) => {
                        const next = [...draft.projects]
                        next[idx] = { ...next[idx], image: e.target.value }
                        setDraft({ ...draft, projects: next })
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Live Demo URL"
                      value={proj.links.view}
                      onChange={(e) => {
                        const next = [...draft.projects]
                        next[idx] = {
                          ...next[idx],
                          links: { ...next[idx].links, view: e.target.value },
                        }
                        setDraft({ ...draft, projects: next })
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="GitHub Code URL"
                      value={proj.links.code}
                      onChange={(e) => {
                        const next = [...draft.projects]
                        next[idx] = {
                          ...next[idx],
                          links: { ...next[idx].links, code: e.target.value },
                        }
                        setDraft({ ...draft, projects: next })
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm sm:col-span-2"
                    />
                    <textarea
                      rows={2}
                      placeholder="Project Description"
                      value={proj.desc}
                      onChange={(e) => {
                        const next = [...draft.projects]
                        next[idx] = { ...next[idx], desc: e.target.value }
                        setDraft({ ...draft, projects: next })
                      }}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm sm:col-span-3"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadFullZip}
              disabled={downloadingZip}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff7b00] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#e06c00] disabled:opacity-70"
            >
              {downloadingZip ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span>{downloadingZip ? 'Preparing ZIP...' : 'Download Full Next.js ZIP'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadJson}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
            >
              <Download className="h-4 w-4" />
              <span>Download portfolio.json</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {savedToast && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                <Check className="h-4 w-4" />
                Saved to Project!
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
            >
              Close
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2506ad] px-5 py-2 text-xs font-bold text-white shadow-md transition hover:bg-[#1a047e] disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? 'Saving...' : 'Save My Info'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
