export default function EmptyState({ title = "Nothing here yet", message, actionHref, actionLabel }) {
  return (
    <div className="card-surface p-10 text-center bg-grid-lines bg-[length:24px_24px]">
      <div className="mx-auto h-10 w-10 rounded-full border border-navy-200 flex items-center justify-center font-mono text-navy-400">
        ?
      </div>
      <h3 className="mt-4 font-display text-lg text-navy-800">{title}</h3>
      {message && <p className="mt-1 text-sm text-steel-500 max-w-sm mx-auto">{message}</p>}
      {actionHref && actionLabel && (
        <a href={actionHref} className="btn-primary mt-5 inline-flex">
          {actionLabel}
        </a>
      )}
    </div>
  );
}
