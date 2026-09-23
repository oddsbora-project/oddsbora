import { Link } from 'react-router-dom'
import { Newspaper, Clock, ChevronRight, TrendingUp, Calendar } from 'lucide-react'

const MOCK_NEWS = [
  {
    id: 1,
    title: 'Brighton 3-0 Arsenal: Seagulls Stun Gunners in Premier League Showdown',
    excerpt: 'Brighton produced a dominant second-half performance to secure a stunning 3-0 victory over Arsenal at the Amex Stadium, ending the Gunners\' perfect start to the season.',
    category: 'Football',
    league: 'Premier League',
    date: '19 September 2026',
    // UPDATED: Now pointing to your newly uploaded match image
    image: '/Arsenal - Brighton.jpg', 
    videoUrl: 'https://youtu.be/YV9GtBtNNpw?si=FEj0W1Zobjc29HEH',
    content: `
      Brighton & Hove Albion delivered a statement performance at the Amex Stadium on Saturday, dismantling defending Premier League champions Arsenal 3-0 in a match that will be remembered for its intensity and clinical finishing.

      The Seagulls set the tone from the opening whistle, pressing Arsenal high and forcing errors. The breakthrough came in the 31st minute when captain Pascal Gross unleashed a stunning strike from outside the box, leaving goalkeeper David Raya with no chance. The goal was a reward for Brighton's relentless pressure and intelligent movement.

      Just before half-time, the hosts doubled their lead through Charalambos Kostoulas. The goal came moments after Arsenal's Bukayo Saka had seen a close-range effort brilliantly saved by Bart Verbruggen, perfectly illustrating the sucker-punch nature of Brighton's counter-attacking play. Kostoulas finished coolly to send the home crowd into raptures.

      Any hopes of an Arsenal comeback were extinguished nine minutes after the break. Chema Andrés rose highest to head home a Gross corner, marking his first goal for the club and sealing a famous victory. The goal capped a dominant period for Brighton, who continued to create chances and could have added a fourth, with Malick Yalcouye striking the woodwork and Matt O'Riley forcing another save from Raya.

      The statistics paint a fascinating picture. Arsenal dominated possession with 60% of the ball and recorded a higher expected goals (xG) figure of 1.58 compared to Brighton's 1.30. However, the Gunners managed only two shots on target, a testament to Brighton's heroic defending which included 20 clearances, 11 interceptions, and five blocks. Mikel Arteta's side struggled to break down a well-organized and fiercely committed Brighton side, and the scoreline arguably flattered the visitors.

      This result represents a significant blow to Arsenal's title defense, ending their nine-game winning streak in the league. Meanwhile, Brighton's victory, their biggest over Arsenal in head-to-head history, propels them up the table and serves as a major confidence boost. The Seagulls head into the international break with 10 points and a goal difference of +11, while Arsenal will have much to ponder.
    `,
  },
  {
    id: 2,
    title: 'NBA Playoffs: Model Predicts Tight Series Ahead',
    excerpt: 'Our AI probability model indicates a 52% chance for the underdogs in Game 3. Here is a breakdown of the key statistical mismatches.',
    category: 'Basketball',
    league: 'NBA',
    date: '5 hours ago',
    image: '/hero/oddsbora-hero-2.jpg',
  },
  {
    id: 3,
    title: 'Champions League Draw: Key Matchups Analyzed',
    excerpt: 'The quarter-final draw has produced some heavyweight clashes. We look at the historical data and current form to project the most likely outcomes.',
    category: 'Football',
    league: 'UEFA Champions League',
    date: '1 day ago',
    image: '/hero/oddsbora-hero-1.jpg',
  },
  {
    id: 4,
    title: 'Boxing: Unified Title Fight Set for Next Month',
    excerpt: 'An in-depth look at the punch accuracy and defensive stats of both fighters heading into the highly anticipated unification bout.',
    category: 'Boxing',
    league: 'World Title',
    date: '2 days ago',
    image: '/hero/oddsbora-hero-2.jpg',
  },
]

const CATEGORIES = ['All', 'Football', 'Basketball', 'Boxing', 'Netball', 'Rugby']

export default function News() {
  const featuredArticle = MOCK_NEWS[0]
  const remainingNews = MOCK_NEWS.slice(1)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 fade-up bg-white text-navy-950 min-h-screen">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Sports Intelligence News</h1>
        <p className="text-slate-500 text-sm">
          The latest results, analysis, and AI-driven insights from the leagues you follow.
        </p>
      </div>

      {/* Category Filter & Trending Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0 
                  ? 'bg-navy-950 text-white' 
                  : 'bg-black/5 text-slate-600 hover:bg-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest bg-black/5 px-3 py-1.5 rounded-full">
          <TrendingUp size={14} className="text-signal-green" />
          Trending Now
        </div>
      </div>

      {/* Featured Article */}
      <div className="mb-10">
        <Link to={`/news/${featuredArticle.id}`} className="group relative block rounded-3xl overflow-hidden shadow-lg border border-black/10">
          <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden bg-navy-950">
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-signal-green text-navy-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {featuredArticle.category}
              </span>
              <span className="text-white/70 text-xs font-mono flex items-center gap-1">
                <Clock size={12} /> {featuredArticle.date}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 leading-tight group-hover:text-signal-green transition-colors">
              {featuredArticle.title}
            </h2>
            <p className="text-white/70 text-sm max-w-2xl line-clamp-2">
              {featuredArticle.excerpt}
            </p>
          </div>
        </Link>
      </div>

      {/* News Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingNews.map((article) => (
          <Link 
            key={article.id} 
            to={`/news/${article.id}`}
            className="group flex flex-col bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48 w-full overflow-hidden bg-navy-950">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm text-navy-950 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                  {article.league}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2 text-xs text-slate-400 font-mono">
                <Calendar size={12} />
                {article.date}
              </div>
              <h3 className="font-bold text-navy-950 text-base mb-2 leading-snug group-hover:text-signal-green transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1">
                {article.excerpt}
              </p>
              <div className="flex items-center text-signal-green text-sm font-semibold mt-auto">
                Read Analysis <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-10 text-center">
        <button className="btn-secondary inline-flex items-center gap-2">
          <Newspaper size={16} />
          Load More Stories
        </button>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-slate-400 text-xs mt-12 text-center max-w-2xl mx-auto">
        Sports news and analysis are provided for informational purposes. OddsBora does not guarantee outcomes or profits. 
        Always refer to official league sources for verified results.
      </p>
    </div>
  )
}