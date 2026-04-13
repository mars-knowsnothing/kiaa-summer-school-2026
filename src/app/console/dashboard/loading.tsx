export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-48 animate-pulse rounded-xl bg-black/[0.04]" />
      <div className="glass-panel p-6">
        <div className="space-y-3">
          {Array.from({length: 6}).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-black/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}
