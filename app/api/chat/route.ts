import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import portfolioData from '@/data/portfolio.json'
import { extraAiContext } from '@/data/ai-context'

export const maxDuration = 30

function buildSystemPrompt(): string {
  let extraContext = extraAiContext || ''
  if (!extraContext) {
    try {
      const contextPath = join(process.cwd(), 'data', 'ai-context.md')
      extraContext = readFileSync(contextPath, 'utf-8')
    } catch {
      // skip
    }
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

CRITICAL FORMATTING RULES:
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

=== COMPREHENSIVE AI CONTEXT ===
${extraContext}
`
}

// Helper to get environment variable with fallback to .env.local
function getEnvKey(name: string): string | undefined {
  let key = process.env[name]
  if (!key) {
    try {
      const envPath = join(process.cwd(), '.env.local')
      const envContent = readFileSync(envPath, 'utf-8')
      const match = envContent.match(new RegExp(`${name}\\s*=\\s*(.*)`))
      if (match?.[1]) key = match[1].trim()
    } catch {
      // ignore
    }
  }
  return key
}

// ---------- Groq API call (Ultra fast: ~0.5s) ----------
async function callGroq(
  systemPrompt: string,
  messages: { role: string; content: string }[],
  apiKey: string,
  modelName: string
): Promise<string> {
  const groqMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
      .filter((_: unknown, i: number) => i > 0)
      .map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
  ]

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000) // 8s timeout

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: groqMessages,
        max_tokens: 1200,
        temperature: 0.6,
      }),
      signal: controller.signal,
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Groq ${modelName} error (${res.status}): ${err}`)
    }

    const data = await res.json()
    return data?.choices?.[0]?.message?.content ?? ''
  } finally {
    clearTimeout(timeoutId)
  }
}

// ---------- Gemini API call (Fallback) ----------
async function callGemini(
  systemPrompt: string,
  contents: { role: string; parts: { text: string }[] }[],
  apiKey: string
): Promise<string> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 12000) // 12s timeout

  try {
    const body = {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        maxOutputTokens: 1200,
        temperature: 0.7,
      },
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      }
    )

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Gemini error (${res.status}): ${err}`)
    }

    const data = await res.json()
    const parts = data?.candidates?.[0]?.content?.parts || []
    const textPart =
      parts.find((p: { text?: string; thought?: boolean }) => p.text && !p.thought) ||
      parts.find((p: { text?: string }) => p.text)
    return textPart?.text ?? ''
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function POST(req: NextRequest) {
  const groqKey = getEnvKey('GROQ_API_KEY')
  const geminiKey = getEnvKey('GEMINI_API_KEY')

  if (!groqKey && !geminiKey) {
    return NextResponse.json(
      { error: 'No AI API key configured. Please add GROQ_API_KEY or GEMINI_API_KEY in environment variables.' },
      { status: 500 }
    )
  }

  const { messages } = await req.json()
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const systemPrompt = buildSystemPrompt()

  // 1. Try Groq (Primary - response takes ~500ms!)
  if (groqKey) {
    // Try openai/gpt-oss-120b first
    try {
      const reply = await callGroq(systemPrompt, messages, groqKey, 'openai/gpt-oss-120b')
      if (reply) {
        return NextResponse.json({ reply, provider: 'groq-120b' })
      }
    } catch (err) {
      console.warn('Groq 120b failed, trying Groq 20b...', err)
    }

    // Try openai/gpt-oss-20b
    try {
      const reply = await callGroq(systemPrompt, messages, groqKey, 'openai/gpt-oss-20b')
      if (reply) {
        return NextResponse.json({ reply, provider: 'groq-20b' })
      }
    } catch (err) {
      console.warn('Groq 20b failed, falling back to Gemini...', err)
    }
  }

  // 2. Fallback to Gemini
  if (geminiKey) {
    try {
      const geminiContents = messages
        .filter((_: unknown, i: number) => i > 0)
        .map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        }))

      const reply = await callGemini(systemPrompt, geminiContents, geminiKey)
      if (reply) {
        return NextResponse.json({ reply, provider: 'gemini' })
      }
    } catch (err) {
      console.error('Gemini fallback also failed:', err)
    }
  }

  return NextResponse.json(
    { error: 'Both AI providers failed. Please check your keys or try again.' },
    { status: 500 }
  )
}
