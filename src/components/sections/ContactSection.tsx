import CopyEmailButton from '@/components/ui/CopyEmailButton'
import Button from '@/components/ui/Button'

const RESUME_URL =
  'https://drive.google.com/file/d/1F6qMER9oUWYAym1Kn32JWDOP54n7XuRk/view?usp=drive_link'

export default function ContactSection() {
  return (
    <section
      className="py-24"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 id="contact-heading" className="section-heading">
            Let&apos;s Build Something
          </h2>
          <p className="section-subheading mx-auto max-w-lg">
            Open to senior engineering roles, consulting projects, and interesting conversations.
            No recruiters for roles I&apos;m not a fit for, please.
          </p>

          {/* Glassmorphic contact card */}
          <div className="mt-10 glass-card p-8 sm:p-10">
            {/* Availability indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <span
                className="w-2 h-2 rounded-full bg-teal animate-pulse"
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-teal-dark font-medium">
                Currently available — response within 24 hours
              </span>
            </div>

            {/* Email display */}
            <div className="mb-6">
              <p className="text-dark-slate/50 text-xs font-mono uppercase tracking-widest mb-2">
                email
              </p>
              <p className="font-mono text-lg sm:text-xl font-semibold text-dark-slate">
                kevinnorg@gmail.com
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <CopyEmailButton />

              <a
                href="mailto:kevinnorg@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-salmon text-white
                           font-semibold text-sm shadow-sm hover:bg-salmon-dark transition-all duration-200
                           hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-salmon/50
                           motion-reduce:hover:translate-y-0"
              >
                <span aria-hidden="true">✉️</span>
                Send an Email
              </a>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-white/50" aria-hidden="true" />

            {/* LinkedIn + Resume secondary actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <a
                href="https://www.linkedin.com/in/kevinnorgaard/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-dark-slate/60 hover:text-teal transition-colors font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn ↗
              </a>

              <span className="hidden sm:block text-dark-slate/20" aria-hidden="true">·</span>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-dark-slate/60 hover:text-salmon transition-colors font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
