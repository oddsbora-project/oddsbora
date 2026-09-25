import { ReactNode } from 'react'
import { ScrollText } from 'lucide-react'

interface Section {
  id: string
  label: string
}

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  intro?: string
  sections: Section[]
  children: ReactNode
}

export default function LegalPageLayout({ title, lastUpdated, intro, sections, children }: LegalPageLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-signal-green text-xs font-mono uppercase tracking-wider mb-3">
        <ScrollText size={14} />
        Legal
      </div>
      <h1 className="text-3xl md:text-4xl font-display font-bold text-navy-950 mb-2">{title}</h1>
      <p className="text-sm text-slate-400 mb-6">Last updated: {lastUpdated}</p>
      {intro && <p className="text-slate-600 leading-relaxed mb-8">{intro}</p>}

      {/* Table of contents */}
      <nav className="glass-panel-light rounded-2xl border border-black/5 p-5 mb-10">
        <p className="text-xs font-semibold text-slate-500 mb-3">On this page</p>
        <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-slate-600 hover:text-signal-green transition-colors">
                {i + 1}. {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div>{children}</div>
    </div>
  )
}
