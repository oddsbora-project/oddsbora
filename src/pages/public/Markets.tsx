export default function Markets() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-2">Markets Overview</h1>
      <p className="text-white/60 mb-8">
        A public snapshot of sports intelligence coverage. Full match-level detail requires an account.
      </p>
      <div className="card text-center py-12 text-white/50">
        <p>Market data connects once a sports-data provider is configured.</p>
        <p className="text-sm mt-2">See the project README for the required environment variable.</p>
      </div>
    </div>
  )
}