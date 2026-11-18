'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send, Loader2, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function renderBoldAndCode(text: string) {
  // Split on inline code first `code`
  const codeParts = text.split(/(`[^`]+`)/g)
  return codeParts.map((part, ci) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={ci} className="rounded bg-black/5 px-1 py-0.5 font-mono text-[11.5px] text-[#011aff]">
          {part.slice(1, -1)}
        </code>
      )
    }

    // Split on bold **text**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g)
    return boldParts.map((bPart, bi) => {
      if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
        return (
          <strong key={`${ci}-${bi}`} className="font-bold text-[#0e2431]">
            {bPart.slice(2, -2)}
          </strong>
        )
      }
      return bPart
    })
  })
}

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split('\n')

  return (
    <div className="space-y-1.5 text-[12.5px] leading-relaxed text-[#1a2b38] break-words">
      {lines.map((line, idx) => {
        const trimmed = line.trim()

        if (!trimmed) {
          return <div key={idx} className="h-1" />
        }

        // Headings: ### or ## or #
        if (trimmed.startsWith('#')) {
          const heading = trimmed.replace(/^#+\s*/, '')
          return (
            <div key={idx} className="mt-2.5 mb-1 font-bold text-[13px] text-[#0e2431] flex items-center gap-1.5">
              <span>{renderBoldAndCode(heading)}</span>
            </div>
          )
        }

        // Horizontal rule
        if (trimmed === '---' || trimmed === '***') {
          return <hr key={idx} className="my-2 border-gray-200" />
        }

        // Bullet points: * or - or •
        const bulletMatch = trimmed.match(/^(\*|-|•)\s+(.*)/)
        if (bulletMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#011aff]" />
              <div className="flex-1">{renderBoldAndCode(bulletMatch[2])}</div>
            </div>
          )
        }

        // Numbered list: 1. 2. etc.
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/)
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="shrink-0 font-bold text-[#011aff] text-[11.5px]">{numMatch[1]}.</span>
              <div className="flex-1">{renderBoldAndCode(numMatch[2])}</div>
            </div>
          )
        }

        // Regular line
        return (
          <div key={idx}>
            {renderBoldAndCode(line)}
          </div>
        )
      })}
    </div>
  )
}

const QUICK_PROMPTS = [
  '💻 What are your technical skills?',
  '🚀 Tell me about your top projects',
  '🤖 What AI & Agentic skills do you have?',
  '📩 How can I contact or hire you?',
]

export function AiChatButton() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm **Darshan's AI Assistant**.\nAsk me anything about his technical skills, projects, experience, or hiring details!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, messages])

  async function handleSend(textToSend?: string) {
    const text = (textToSend || input).trim()
    if (!text || loading) return

    const userMsg: Message = { role: 'user', content: text }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please check your connection and try again!' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* AI Floating Button — fixed bottom-right, same line and style as Scroll-to-Top (#ffae00) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Chat"
        title="Chat with Darshan's AI"
        className="fixed bottom-8 right-20 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#ffae00] text-[#0d002c] shadow-lg transition-all duration-300 hover:bg-[#e69d00] hover:scale-105 active:scale-95 select-none"
      >
        <span className="text-[13px] font-black tracking-wider">AI</span>
      </button>

      {/* Chat Window — opens bottom-right above the buttons */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[100] flex w-[360px] max-w-[calc(100vw-32px)] sm:w-[380px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0e2431] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffae00] text-[10px] font-black text-[#0d002c] shadow-sm">
                AI
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold text-white">Darshan&apos;s AI Assistant</span>
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex h-[360px] flex-col gap-3 overflow-y-auto p-3.5 bg-[#fbfbfb]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#011aff] text-white rounded-br-sm text-[13px] leading-relaxed'
                      : 'bg-white border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <FormattedMessage content={msg.content} />
                  )}
                </div>
              </div>
            ))}

            {/* Quick suggested chips on start */}
            {messages.length === 1 && (
              <div className="mt-2 space-y-1.5">
                <p className="text-[11px] font-semibold text-gray-400 px-1 uppercase tracking-wider">Suggested questions:</p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_PROMPTS.map((prompt, pi) => (
                    <button
                      key={pi}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="text-left text-[12px] bg-white hover:bg-[#f0f3ff] hover:text-[#011aff] text-[#0e2431] border border-gray-200 hover:border-[#011aff]/40 rounded-xl px-3 py-2 transition-all shadow-xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm bg-white border border-gray-100 px-3.5 py-2.5 text-[#011aff] shadow-sm">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span className="text-[12px] text-[#0e2431]/70">Just a moment...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 border-t border-gray-100 bg-white px-3 py-2.5">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Darshan..."
              className="flex-1 rounded-full border border-gray-200 bg-[#f7f7f7] px-3.5 py-2 text-[12.5px] text-[#0e2431] placeholder:text-gray-400 outline-none focus:border-[#011aff] focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#011aff] text-white transition-all hover:bg-[#0e2431] disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
