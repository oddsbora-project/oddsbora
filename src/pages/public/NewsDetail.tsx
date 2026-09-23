import { useParams } from 'react-router-dom'
import YouTubePlayer from '@/components/YouTubePlayer'

const MOCK_ARTICLES: Record<string, any> = {
  '1': {
    title: 'Brighton 3-0 Arsenal: Seagulls Stun Gunners in Premier League Showdown',
    videoUrl: 'https://youtu.be/YV9GtBtNNpw?si=FEj0W1Zobjc29HEH', // <--- UPDATED LINK
    content: `
      Brighton & Hove Albion delivered a statement performance at the Amex Stadium on Saturday, dismantling defending Premier League champions Arsenal 3-0 in a match that will be remembered for its intensity and clinical finishing.

      The Seagulls set the tone from the opening whistle, pressing Arsenal high and forcing errors. The breakthrough came in the 31st minute when captain Pascal Gross unleashed a stunning strike from outside the box, leaving goalkeeper David Raya with no chance. The goal was a reward for Brighton's relentless pressure and intelligent movement.

      Just before half-time, the hosts doubled their lead through Charalambos Kostoulas. The goal came moments after Arsenal's Bukayo Saka had seen a close-range effort brilliantly saved by Bart Verbruggen, perfectly illustrating the sucker-punch nature of Brighton's counter-attacking play. Kostoulas finished coolly to send the home crowd into raptures.

      Any hopes of an Arsenal comeback were extinguished nine minutes after the break. Chema Andrés rose highest to head home a Gross corner, marking his first goal for the club and sealing a famous victory. The goal capped a dominant period for Brighton, who continued to create chances and could have added a fourth, with Malick Yalcouye striking the woodwork and Matt O'Riley forcing another save from Raya.

      The statistics paint a fascinating picture. Arsenal dominated possession with 60% of the ball and recorded a higher expected goals (xG) figure of 1.58 compared to Brighton's 1.30. However, the Gunners managed only two shots on target, a testament to Brighton's heroic defending which included 20 clearances, 11 interceptions, and five blocks. Mikel Arteta's side struggled to break down a well-organized and fiercely committed Brighton side, and the scoreline arguably flattered the visitors.

      This result represents a significant blow to Arsenal's title defense, ending their nine-game winning streak in the league. Meanwhile, Brighton's victory, their biggest over Arsenal in head-to-head history, propels them up the table and serves as a major confidence boost. The Seagulls head into the international break with 10 points and a goal difference of +11, while Arsenal will have much to ponder.
    `,
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
      {article.videoUrl && (
        <div className="mb-8">
          <YouTubePlayer videoUrl={article.videoUrl} title={article.title} />
        </div>
      )}

      <div className="prose prose-slate max-w-none">
        {article.content.split('\n\n').map((paragraph: string, index: number) => (
          <p key={index} className="text-slate-600 leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}