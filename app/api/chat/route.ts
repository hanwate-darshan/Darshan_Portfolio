import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import portfolioData from '@/data/portfolio.json'

function buildSystemPrompt(): string {
  // Load extra context from ai-context.md if it exists
  let extraContext = ''
  try {
    const contextPath = join(process.cwd(), 'data', 'ai-context.md')
    extraContext = readFileSync(contextPath, 'utf-8')
  } catch {
    // file not found — skip
  }

  const p = portfolioData.personal
  const projects = portfolioData.projects
    .map((pr) => `- ${pr.name}: ${pr.desc} (${pr.category}) | View: ${pr.links.view} | Code: ${pr.links.code}`)
    .join('\n')

  const experience = portfolioData.experience
    .map((e) => `- ${e.role} at ${e.company} (${e.duration})`)
    .join('\n')

  const technicalSkills = portfolioData.technicalSkills
    ?.map((s) => `${s.category}: ${s.skills.join(', ')}`)
    .join('\n') ?? ''

  return `You are Darshan Hanwate's AI Assistant embedded in his personal portfolio website.
Your role is to represent Darshan professionally, accurately, and impressively to visitors, recruiters, and clients.

CRITICAL FORMATTING RULES (CHATGPT STYLE):
1. ALWAYS structure your responses with clean Markdown:
   - Use bold category headings (e.g., **Frontend:**, **Backend:**, **AI & Machine Learning:**).
   - Use emojis where appropriate (e.g., 🚀, 💻, ⚙️, 🤖, 📦, 🎓).
   - ALWAYS place each bullet point on its own new line. Never join multiple bullet points into one paragraph.
2. When answering about skills:
   - Break them down clearly into categorized bullet points.
   - Mention Darshan's primary strengths (React.js, Next.js, Node.js, LangChain, LangGraph, RAG, MongoDB, Docker).
3. When answering about projects:
   - Provide the project name, a 1-2 sentence summary, key technologies used, and main features in bullet points.
4. Language preferences:
   - If the user asks in English, reply in polished, friendly English.
   - If the user asks in Marathi or Romanized Marathi, reply in natural, clear Marathi with the same structured bullet points.
5. Accuracy:
   - Never invent or fabricate information not in the data below.

=== PORTFOLIO DATA ===

NAME: ${p.firstName} ${p.lastName}
ROLE: ${p.role}
EMAIL: ${p.email}
PHONE: ${p.phone}
LOCATION: ${p.place}
RESUME: ${p.resumeUrl || 'Available on request'}

BIO:
${p.bio}

TECHNICAL SKILLS:
${technicalSkills}

EXPERIENCE:
${experience}

PROJECTS:
${projects}

SOCIAL LINKS:
- LinkedIn: ${portfolioData.socials.linkedin}
- GitHub: ${portfolioData.socials.github}
- Twitter: ${portfolioData.socials.twitter}
- Dev.to: ${portfolioData.socials.dev}

=== COMPREHENSIVE AI CONTEXT (from ai-context.md) ===
${extraContext}
`
}

export async function POST(req: NextRequest) {
  let apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    try {
      const envPath = join(process.cwd(), '.env.local')
      const envContent = readFileSync(envPath, 'utf-8')
      const match = envContent.match(/GEMINI_API_KEY\s*=\s*(.*)/)
      if (match && match[1]) {
        apiKey = match[1].trim()
      }
    } catch {
      // ignore
    }
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured in .env.local' }, { status: 500 })
  }

  const { messages } = await req.json()
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const systemPrompt = buildSystemPrompt()

  // Build Gemini-compatible contents array (skip the initial assistant greeting)
  const contents = messages
    .filter((_: unknown, i: number) => i > 0) // skip the initial assistant greeting
    .map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }))

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      maxOutputTokens: 1500,
      temperature: 0.7,
    },
  }

  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )

  if (!geminiRes.ok) {
    const err = await geminiRes.text()
    console.error('Gemini API error:', err)
    return NextResponse.json({ error: 'Gemini API error' }, { status: 500 })
  }

  const data = await geminiRes.json()
  const parts = data?.candidates?.[0]?.content?.parts || []
  const textPart = parts.find((p: { text?: string; thought?: boolean }) => p.text && !p.thought) || parts.find((p: { text?: string }) => p.text)
  const reply = textPart?.text ?? "Sorry, I couldn't generate a response."

  return NextResponse.json({ reply })
}
