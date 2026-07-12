import Link from "next/link";
import { getAllFaculties, getAllDepartments, getAllStaff } from "@/lib/db";

export const metadata = { title: "Schools | Staff Directory" };

export default async function FacultiesPage() {
  const [faculties, departments, staff] = await Promise.all([
    getAllFaculties(),
    getAllDepartments(),
    getAllStaff(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="eyebrow">Institution structure</p>
      <h1 className="section-heading">Schools</h1>
      <p className="mt-2 text-sm text-steel-500 max-w-xl">
        {faculties.length} schools govern the {departments.length} departments across the Polytechnic.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {faculties.map((f, i) => {
          const depCount = departments.filter((d) => d.facultyId === f.id).length;
          const staffCount = staff.filter((s) => s.facultyId === f.id).length;
          return (
            <Link
              key={f.id}
              href={`/faculties/${f.id}`}
              className="card-surface p-6 hover:border-royal-400 transition"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[11px] text-navy-400">{f.code}</span>
              </div>
              <h3 className="mt-3 font-display text-xl text-navy-800">{f.name}</h3>
              <p className="mt-2 text-sm text-steel-500 leading-relaxed">{f.description}</p>
              <div className="mt-4 flex gap-6 text-sm">
                <span className="text-royal-600 font-medium">{depCount} departments</span>
                <span className="text-royal-600 font-medium">{staffCount} staff</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
