'use client'

import { useState } from 'react'
import { Headset, User, Mail, Phone, MessageSquare, Send, CheckCircle2 } from 'lucide-react'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormState({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
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
                placeholder="Phone"
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

            <div className="flex items-center justify-end gap-3 pt-1">
              {submitted && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Message Sent Successfully!
                </span>
              )}
              <button
                type="submit"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-[5px] bg-[#2506ad] px-6 py-3 font-['Nunito',sans-serif] text-[18px] font-semibold text-white shadow-[0px_5px_10px_rgba(48,68,247,0.6)] transition hover:bg-[#421cec]"
              >
                <span>Submit</span>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
