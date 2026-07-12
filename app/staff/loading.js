export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="animate-pulse">
        <div className="h-3 w-24 bg-paper-300 rounded" />
        <div className="mt-3 h-8 w-64 bg-paper-300 rounded" />
        <div className="mt-3 h-4 w-80 bg-paper-300 rounded" />

        <div className="mt-8 h-32 bg-paper-300 rounded-lg" />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-56 bg-paper-300 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
