'use client'

import { useState } from 'react'
import { Headset, User, Mail, Phone, MessageSquare, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'b7574fee-69ac-469b-88fe-4745a7bc2271',
          name: formState.name,
          email: formState.email,
          phone: formState.phone || 'Not provided',
          message: formState.message,
          subject: `Portfolio Contact from ${formState.name}`,
          from_name: 'Darshan Portfolio Website',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormState({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setSubmitted(false), 6000)
      } else {
        throw new Error(result.message || 'Something went wrong. Please try again.')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send message.'
      setErrorMessage(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-[65vh] bg-[#e5ecfb] px-6 py-14 md:px-[9%]">
      <h2 className="flex items-center justify-center gap-2.5 text-center text-3xl font-extrabold text-[#202020] sm:text-[35px]">
        <Headset className="h-8 w-8 stroke-[2.5] text-[#202020]" />
        <span>
          Get In <span className="text-[#7303a7]">Touch</span>
        </span>
      </h2>

      <div className="mx-auto mt-8 max-w-[1050px] rounded-2xl bg-white p-6 shadow-[0_5px_10px_rgba(0,0,0,0.15)] md:p-10">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          {/* Left Illustration */}
          <div className="hidden w-full max-w-[460px] lg:block">
            <img
              src="/assets/images/contact1.png"
              alt="Contact Illustration"
              draggable={false}
              className="h-auto max-h-[380px] w-full object-contain"
            />
          </div>

          {/* Right Form */}
          <form onSubmit={handleSubmit} className="w-full lg:w-[48%] space-y-4">
            <div className="relative flex h-[50px] items-center">
              <User className="pointer-events-none absolute left-4 h-4 w-4 text-[#333]" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="h-full w-full rounded-[5px] border border-[#333] bg-[#e5ecfb] pl-12 pr-4 text-[16px] text-[#111] placeholder-[#333] outline-none transition focus:border-2 focus:border-[#7303a7]"
              />
            </div>

            <div className="relative flex h-[50px] items-center">
              <Mail className="pointer-events-none absolute left-4 h-4 w-4 text-[#333]" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="h-full w-full rounded-[5px] border border-[#333] bg-[#e5ecfb] pl-12 pr-4 text-[16px] text-[#111] placeholder-[#333] outline-none transition focus:border-2 focus:border-[#7303a7] normal-case"
              />
            </div>

            <div className="relative flex h-[50px] items-center">
              <Phone className="pointer-events-none absolute left-4 h-4 w-4 text-[#333]" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (Optional)"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                className="h-full w-full rounded-[5px] border border-[#333] bg-[#e5ecfb] pl-12 pr-4 text-[16px] text-[#111] placeholder-[#333] outline-none transition focus:border-2 focus:border-[#7303a7]"
              />
            </div>

            <div className="relative flex">
              <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-[#333]" />
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="min-h-[130px] w-full rounded-[5px] border border-[#333] bg-[#e5ecfb] pl-12 pr-4 pt-3 text-[16px] text-[#111] placeholder-[#333] outline-none transition focus:border-2 focus:border-[#7303a7] normal-case"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div className="text-left w-full sm:w-auto">
                {submitted && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 animate-in fade-in duration-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Message sent! Check your Gmail soon.
                  </span>
                )}
                {errorMessage && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 animate-in fade-in duration-200">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMessage}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-[5px] bg-[#2506ad] px-6 py-3 font-['Nunito',sans-serif] text-[18px] font-semibold text-white shadow-[0px_5px_10px_rgba(48,68,247,0.6)] transition hover:bg-[#421cec] disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
