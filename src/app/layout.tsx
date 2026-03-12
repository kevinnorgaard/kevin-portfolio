import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kevin Z Norgaard – Software Engineer',
    template: '%s | Kevin Z Norgaard',
  },
  description:
    'Portfolio of Kevin Z Norgaard — software engineer building scalable backend systems and AI integrations at eBay. Projects, experience, and skills.',
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
      'Portfolio of Kevin Z Norgaard — software engineer building scalable backend systems and AI integrations at eBay. Projects, experience, and skills.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kevin Z Norgaard – Software Engineer',
    description:
      'Portfolio of Kevin Z Norgaard — software engineer building scalable backend systems and AI integrations at eBay. Projects, experience, and skills.',
    images: ['/images/og-image.png'],
  },
  metadataBase: new URL('https://kevinnorgaard.com'),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N9HTSC3P');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Kevin Z Norgaard',
              url: 'https://kevinnorgaard.com',
              jobTitle: 'Software Engineer III',
              worksFor: { '@type': 'Organization', name: 'eBay' },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'University of California, Irvine',
              },
              knowsAbout: [
                'Java',
                'Spring Boot',
                'TypeScript',
                'Next.js',
                'Distributed Systems',
                'AI Integrations',
              ],
              sameAs: ['https://www.linkedin.com/in/kevinnorgaard/'],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9HTSC3P"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
