'use client'

import { useEffect, useRef, useId } from 'react'

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export default function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId().replace(/:/g, '')

  useEffect(() => {
    let cancelled = false

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#84A59D',
            primaryTextColor: '#2B2D42',
            primaryBorderColor: '#84A59D',
            lineColor: '#F28482',
            secondaryColor: '#F8F9FA',
            tertiaryColor: '#fff',
            background: '#F8F9FA',
            mainBkg: 'rgba(255,255,255,0.6)',
            nodeBorder: '#84A59D',
            clusterBkg: 'rgba(132,165,157,0.08)',
            titleColor: '#2B2D42',
            edgeLabelBackground: 'rgba(255,255,255,0.8)',
            fontFamily: 'var(--font-fira-code), monospace',
            fontSize: '13px',
          },
          flowchart: {
            curve: 'basis',
            padding: 20,
          },
        })

        if (!cancelled && ref.current) {
          const uniqueId = `mermaid-${id}-${Date.now()}`
          const { svg } = await mermaid.render(uniqueId, chart)
          if (!cancelled && ref.current) {
            ref.current.innerHTML = svg
          }
        }
      } catch (err) {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = `<pre class="text-xs text-dark-slate/60 p-4 overflow-auto">${chart}</pre>`
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart, id])

  return (
    <div
      ref={ref}
      className={`w-full overflow-x-auto rounded-xl bg-white/40 p-4 ${className ?? ''}`}
      aria-label="Architecture diagram"
    />
  )
}
