import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper-200 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <span className="font-display text-lg text-white">Staff Directory</span>
            <p className="mt-2 text-sm text-steel-400 max-w-xs">
              Design and Implementation of a Staff Directory Information System —
              Akanu Ibiam Federal Polytechnic, Unwana.
            </p>
          </div>

          <div>
            <p className="eyebrow text-navy-200">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/staff" className="hover:text-white transition">Staff Directory</Link></li>
              <li><Link href="/departments" className="hover:text-white transition">Departments</Link></li>
              <li><Link href="/faculties" className="hover:text-white transition">Schools</Link></li>
              <li><Link href="/announcements" className="hover:text-white transition">Announcements</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-navy-200">Institution</p>
            <ul className="mt-3 space-y-2 text-sm text-steel-400">
              <li>Akanu Ibiam Federal Polytechnic</li>
              <li>Unwana, Afikpo, Ebonyi State</li>
              <li>info@aifpunwana.edu.ng</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-steel-500">
          <p>&copy; {year} Akanu Ibiam Federal Polytechnic, Unwana. All rights reserved.</p>
          <p className="font-mono">Final Year Project — Staff Directory Information System</p>
        </div>
      </div>
    </footer>
  );
}
