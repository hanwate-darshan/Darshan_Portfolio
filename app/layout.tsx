import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Nunito } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Portfolio | Full Stack Developer',
  description:
    'Personal Full-Stack Developer Portfolio built with Next.js App Router and Tailwind CSS. Easily customize with your own personal information, skills, education, projects, and experience.',
  icons: {
    icon: '/assets/images/favicon.png',
    apple: '/assets/images/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2506ad',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased bg-[#f7f7f7] text-[#0e2431]" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
