import { getAllAnnouncements } from "@/lib/db";

export const metadata = { title: "Announcements | Staff Directory" };

export default async function AnnouncementsPage() {
  const announcements = await getAllAnnouncements();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="eyebrow">Notices</p>
      <h1 className="section-heading">Announcements</h1>
      <p className="mt-2 text-sm text-steel-500">
        Official notices from the Registrar's Office, Human Resources and ICT Directorate.
      </p>

      <div className="mt-8 space-y-5">
        {announcements.map((a, i) => (
          <article key={a.id} className="card-surface p-6 relative">
            <span className="absolute top-6 right-6 font-mono text-xs text-steel-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-mono text-xs text-royal-600 uppercase tracking-wide">{a.author}</p>
            <h2 className="mt-2 font-display text-xl text-navy-800 pr-10">{a.title}</h2>
            <p className="mt-2 text-sm text-steel-700 leading-relaxed">{a.content}</p>
            <p className="mt-3 text-xs text-steel-500">
              {new Date(a.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
