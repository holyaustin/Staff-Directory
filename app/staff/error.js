"use client";

export default function Error({ error, reset }) {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="font-mono text-sm text-red-600">Something went wrong</p>
      <h1 className="mt-3 font-display text-2xl text-navy-800">Couldn't load the staff directory</h1>
      <p className="mt-3 text-sm text-steel-500">{error?.message || "An unexpected error occurred."}</p>
      <button type="button" onClick={() => reset()} className="btn-primary mt-8">
        Try again
      </button>
    </div>
  );
}
