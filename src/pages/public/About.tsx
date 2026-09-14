export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14 prose prose-invert prose-sm">
      <h1 className="text-3xl font-bold mb-4">About OddsBora</h1>
      <p className="text-white/70">
        OddsBora combines "odds" with "bora," a Kenyan/Swahili word associated with "better." OddsBora is a
        sports analytics and intelligence platform — not a bookmaker. It analyzes football matches, market odds,
        and historical performance data to help people make more informed decisions.
      </p>
      <p className="text-white/70 mt-4">
        OddsBora does not claim guaranteed wins or guaranteed profits. It communicates uncertainty honestly:
        model probability, market probability, confidence, and risk are always shown separately, and the model
        is free to report "no reliable signal" when the evidence doesn't support one.
      </p>
    </div>
  )
}