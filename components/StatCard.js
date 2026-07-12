export default function StatCard({ index, label, value, sub }) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-steel-500">{index}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-royal-500 mt-1" />
      </div>
      <p className="mt-4 font-display text-3xl text-navy-800">{value}</p>
      <p className="mt-1 text-sm text-steel-600">{label}</p>
      {sub && <p className="mt-2 text-xs text-steel-500">{sub}</p>}
    </div>
  );
}
