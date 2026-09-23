import { useParams } from 'react-router-dom'
import YouTubePlayer from '@/components/YouTubePlayer'

// Mock data — replace with Supabase fetch later
const MOCK_ARTICLES: Record<string, any> = {
  '1': {
    title: 'HIGHLIGHTS | Brighton 3-0 Arsenal | Premier League',
    videoUrl: 'https://youtu.be/_f5-6jdNP58?si=dcU2wITrdFgxDi-O',
    content: 'Brighton produced a dominant second-half performance to secure a stunning 3-0 victory over Arsenal at the Amex Stadium.',
    date: '19 September 2026',
    league: 'Premier League',
  },
}

export default function NewsDetail() {
  const { id } = useParams()
  const article = MOCK_ARTICLES[id || '1']

  if (!article) return <div className="text-center py-20">Article not found</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 fade-up bg-white text-navy-950 min-h-screen">
      <div className="mb-6">
        <span className="text-signal-green text-xs font-mono uppercase tracking-widest bg-signal-green/10 px-3 py-1 rounded-full border border-signal-green/20">
          {article.league}
        </span>
        <h1 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-2 leading-tight">
          {article.title}
        </h1>
        <p className="text-slate-400 text-sm font-mono">{article.date}</p>
      </div>

      {/* YouTube Video Player */}
      <div className="mb-8">
        <YouTubePlayer videoUrl={article.videoUrl} title={article.title} />
      </div>

      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 leading-relaxed">{article.content}</p>
      </div>
    </div>
  )
}