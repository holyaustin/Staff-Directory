import Link from "next/link";
import { getAllDepartments, getAllFaculties, getAllStaff } from "@/lib/db";

export const metadata = { title: "Departments | Staff Directory" };

export default async function DepartmentsPage() {
  const [departments, faculties, staff] = await Promise.all([
    getAllDepartments(),
    getAllFaculties(),
    getAllStaff(),
  ]);

  const facultyMap = Object.fromEntries(faculties.map((f) => [f.id, f]));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="eyebrow">Institution structure</p>
      <h1 className="section-heading">Departments</h1>
      <p className="mt-2 text-sm text-steel-500 max-w-xl">
        {departments.length} departments across {faculties.length} schools.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dep, i) => {
          const count = staff.filter((s) => s.departmentId === dep.id).length;
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
              <p className="mt-1 text-xs text-steel-500">{facultyMap[dep.facultyId]?.name}</p>
              <p className="mt-3 text-sm text-royal-600 font-medium">{count} staff</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
