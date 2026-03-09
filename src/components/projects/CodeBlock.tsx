import { codeToHtml } from 'shiki'

interface CodeBlockProps {
  code: string
  lang: string
}

export default async function CodeBlock({ code, lang }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: 'github-light',
  })

  return (
    <div
      className="text-xs rounded-xl overflow-x-auto border border-white/60 [&>pre]:p-5 [&>pre]:leading-relaxed [&>pre]:bg-white/50! [&>pre]:min-w-fit"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
