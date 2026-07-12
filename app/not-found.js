import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="font-mono text-sm text-royal-600">Error 404</p>
      <h1 className="mt-3 font-display text-3xl sm:text-4xl text-navy-800">Record not found</h1>
      <p className="mt-3 text-sm text-steel-500 max-w-md mx-auto">
        The page or staff record you're looking for doesn't exist, or may have been removed
        from the directory.
      </p>
      <Link href="/" className="btn-primary mt-8 inline-flex">
        Return to dashboard
      </Link>
    </div>
  );
}
