export default function KenyaFlagBadge() {
  return (
    <div
      className="w-9 h-9 rounded-full overflow-hidden border border-white/15 shadow-sm flex-shrink-0"
      role="img"
      aria-label="Kenyan flag — OddsBora, built for the Kenyan market"
      title="Built for Kenya"
    >
      <svg viewBox="0 0 30 20" className="w-full h-full">
        <rect width="30" height="20" fill="#fff" />
        <rect width="30" height="6" fill="#000" />
        <rect y="6" width="30" height="1.3" fill="#fff" />
        <rect y="7.3" width="30" height="5.4" fill="#BB0000" />
        <rect y="12.7" width="30" height="1.3" fill="#fff" />
        <rect y="14" width="30" height="6" fill="#006600" />
        {/* Simplified Maasai shield + crossed spears emblem */}
        <g transform="translate(15,10)">
          <ellipse cx="0" cy="0" rx="3.4" ry="4.6" fill="#fff" stroke="#000" strokeWidth="0.3" />
          <ellipse cx="0" cy="0" rx="2.6" ry="3.6" fill="#BB0000" stroke="#000" strokeWidth="0.25" />
          <line x1="0" y1="-4.4" x2="0" y2="4.4" stroke="#000" strokeWidth="0.35" />
          <line x1="-6.5" y1="-6" x2="6.5" y2="6" stroke="#7a4a1e" strokeWidth="0.6" />
          <line x1="6.5" y1="-6" x2="-6.5" y2="6" stroke="#7a4a1e" strokeWidth="0.6" />
          <polygon points="-6.5,-6 -8,-7.6 -7,-8.4 -5.2,-6.8" fill="#ccc" />
          <polygon points="6.5,-6 8,-7.6 7,-8.4 5.2,-6.8" fill="#ccc" />
        </g>
      </svg>
    </div>
  )
}