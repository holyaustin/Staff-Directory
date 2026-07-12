import Link from "next/link";
import { notFound } from "next/navigation";
import { getFacultyById, getAllDepartments, getStaffById, getEnrichedStaff } from "@/lib/db";
import EmptyState from "@/components/EmptyState";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const faculty = await getFacultyById(id);
  return { title: faculty ? `${faculty.name} | Schools` : "School Not Found" };
}

export default async function FacultyDetailPage({ params }) {
  const { id } = await params;
  const faculty = await getFacultyById(id);
  if (!faculty) notFound();

  const [allDepartments, dean, allStaff] = await Promise.all([
    getAllDepartments(),
    faculty.dean ? getStaffById(faculty.dean) : null,
    getEnrichedStaff(),
  ]);

  const departments = allDepartments.filter((d) => d.facultyId === faculty.id);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Link href="/faculties" className="text-sm text-royal-600 hover:text-royal-700">
        ← Back to schools
      </Link>

      <div className="mt-4 card-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">School Code — {faculty.code}</p>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl text-navy-800">{faculty.name}</h1>
            <p className="mt-1 text-xs text-steel-500">Established {faculty.established}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl text-navy-800">{departments.length}</p>
            <p className="text-xs text-steel-500">Departments</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-steel-700 max-w-2xl leading-relaxed">{faculty.description}</p>

        {dean && (
          <div className="mt-6 pt-6 border-t border-paper-300">
            <p className="field-label">Dean of School</p>
            <Link href={`/staff/${dean.id}`} className="text-sm font-medium text-navy-800 hover:text-royal-600">
              {dean.firstName} {dean.lastName}
            </Link>
          </div>
        )}
      </div>

      <div className="mt-10">
        <p className="eyebrow">Departments</p>
        <h2 className="section-heading mb-6">Under this school</h2>
        {departments.length === 0 ? (
          <EmptyState title="No departments yet" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dep, i) => {
              const count = allStaff.filter((s) => s.departmentId === dep.id).length;
              return (
                <Link
                  key={dep.id}
                  href={`/departments/${dep.id}`}
                  className="card-surface p-5 hover:border-royal-400 transition"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[11px] text-navy-400">{dep.code}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg text-navy-800">{dep.name}</h3>
                  <p className="mt-3 text-sm text-royal-600 font-medium">{count} staff</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
