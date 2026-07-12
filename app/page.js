import Link from "next/link";
import { getStats, getAllFaculties, getAllAnnouncements, getEnrichedStaff } from "@/lib/db";
import StatCard from "@/components/StatCard";
import StaffCard from "@/components/StaffCard";

export default async function HomePage() {
  const [stats, faculties, announcements, staff] = await Promise.all([
    getStats(),
    getAllFaculties(),
    getAllAnnouncements(),
    getEnrichedStaff(),
  ]);

  const recentStaff = [...staff]
    .sort((a, b) => new Date(b.dateEmployed) - new Date(a.dateEmployed))
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-grid-lines bg-[length:32px_32px] opacity-[0.08]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="eyebrow text-royal-300">Akanu Ibiam Federal Polytechnic, Unwana</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-3xl">
            The single record of who works here, and where to find them.
          </h1>
          <p className="mt-5 max-w-xl text-navy-100 text-base sm:text-lg">
            A live index of academic and administrative staff across every school and
            department — searchable, verifiable, and always up to date.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/staff" className="btn-primary bg-royal-600 hover:bg-royal-700">
              Browse Staff Directory
            </Link>
            <Link href="/staff/new" className="btn-secondary bg-transparent border-white/30 text-white hover:bg-white/10">
              Register New Staff
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard index="01" label="Total Staff" value={stats.totalStaff} />
          <StatCard index="02" label="Active Staff" value={stats.activeStaff} />
          <StatCard index="03" label="Departments" value={stats.totalDepartments} />
          <StatCard index="04" label="Schools" value={stats.totalFaculties} />
        </div>
      </section>

      {/* Schools overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="eyebrow">Institution structure</p>
            <h2 className="section-heading">Schools at a glance</h2>
          </div>
          <Link href="/faculties" className="text-sm font-medium text-royal-600 hover:text-royal-700">
            View all schools →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {faculties.map((f, i) => (
            <Link
              key={f.id}
              href={`/faculties/${f.id}`}
              className="card-surface p-5 hover:border-royal-400 transition"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[11px] text-navy-400">{f.code}</span>
              </div>
              <h3 className="mt-3 font-display text-lg text-navy-800">{f.name}</h3>
              <p className="mt-1 text-sm text-steel-500 line-clamp-2">{f.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently employed + announcements */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="eyebrow">Directory</p>
                <h2 className="section-heading">Recently added staff</h2>
              </div>
              <Link href="/staff" className="text-sm font-medium text-royal-600 hover:text-royal-700">
                Full directory →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentStaff.map((s) => (
                <StaffCard key={s.id} staff={s} />
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Notices</p>
            <h2 className="section-heading mb-6">Announcements</h2>
            <div className="space-y-4">
              {announcements.slice(0, 4).map((a) => (
                <div key={a.id} className="card-surface p-4">
                  <p className="text-xs font-mono text-steel-500">
                    {new Date(a.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                  <h3 className="mt-1 font-display text-base text-navy-800">{a.title}</h3>
                  <p className="mt-1 text-sm text-steel-500 line-clamp-2">{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
