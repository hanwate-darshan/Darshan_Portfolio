'use client'

import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { SkillsSection } from '@/components/skills-section'
import { WorkSection } from '@/components/work-section'
import { ExperienceSection } from '@/components/experience-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { AiChatButton } from '@/components/ai-chat-button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] font-['Poppins',sans-serif] text-[#0e2431] selection:bg-[#2b3dda] selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      {/* AI Chat — fixed bottom-left, above Next.js N indicator */}
      <AiChatButton />
    </div>
  )
}
