export interface SocialLinks {
  linkedin: string
  github: string
  twitter: string
  telegram: string
  instagram: string
  dev: string
}

export interface SkillItem {
  name: string
  icon: string
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  duration: string
  image: string
}

export interface ProjectItem {
  id: string
  name: string
  desc: string
  image: string
  category: 'mern' | 'lamp' | 'basicweb' | 'android'
  links: {
    view: string
    code: string
  }
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  duration: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface PortfolioData {
  personal: {
    firstName: string
    lastName: string
    logoText: string
    role: string
    typingStrings: string[]
    bio: string
    email: string
    phone: string
    place: string
    resumeUrl: string
    heroImage: string
    aboutImage: string
    educationQuote: string
    experienceQuote: string
    footerBio: string
  }
  socials: SocialLinks
  skills: SkillItem[]
  technicalSkills?: SkillCategory[]
  education?: EducationItem[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
}
