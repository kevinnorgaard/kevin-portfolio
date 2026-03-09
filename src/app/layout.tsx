import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kevin Z Norgaard – Software Engineer',
    template: '%s | Kevin Z Norgaard',
  },
  description:
    'Software Engineer III specializing in high-traffic backend systems, distributed architecture, and AI integrations. Previously eBay & General Motors.',
  keywords: [
    'Software Engineer',
    'Backend Engineer',
    'Java',
    'Spring Boot',
    'Next.js',
    'TypeScript',
    'Distributed Systems',
    'eBay',
    'Kevin Z Norgaard',
  ],
  authors: [{ name: 'Kevin Z Norgaard', url: 'https://kevinnorgaard.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kevinnorgaard.com',
    siteName: 'Kevin Z Norgaard',
    title: 'Kevin Z Norgaard – Software Engineer',
    description:
      'Software Engineer III specializing in high-traffic backend systems, distributed architecture, and AI integrations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kevin Z Norgaard – Software Engineer',
    description:
      'Software Engineer III specializing in high-traffic backend systems, distributed architecture, and AI integrations.',
  },
  metadataBase: new URL('https://kevinnorgaard.com'),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
