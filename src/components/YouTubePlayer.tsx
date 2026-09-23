interface YouTubePlayerProps {
  videoUrl: string
  title: string
}

// Extract the video ID from any YouTube URL format:
// - https://youtu.be/_f5-6jdNP58
// - https://www.youtube.com/watch?v=_f5-6jdNP58
// - https://www.youtube.com/embed/_f5-6jdNP58
function extractVideoId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

export default function YouTubePlayer({ videoUrl, title }: YouTubePlayerProps) {
  const videoId = extractVideoId(videoUrl)

  if (!videoId) {
    return (
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-navy-950 flex items-center justify-center text-white/50 text-sm">
        Invalid video link
      </div>
    )
  }

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-navy-950">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
        title={title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}