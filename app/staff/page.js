import Link from "next/link";
import { Suspense } from "react";
import { getEnrichedStaff, getAllDepartments, getAllFaculties } from "@/lib/db";
import StaffCard from "@/components/StaffCard";
import SearchBar from "@/components/SearchBar";
import EmptyState from "@/components/EmptyState";

export const metadata = { title: "Staff Directory | AIFPU Unwana" };

export default async function StaffDirectoryPage({ searchParams }) {
  const params = await searchParams;
  const q = (params?.q || "").toLowerCase().trim();
  const departmentId = params?.departmentId || "";
  const facultyId = params?.facultyId || "";

  const [staff, departments, faculties] = await Promise.all([
    getEnrichedStaff(),
    getAllDepartments(),
    getAllFaculties(),
  ]);

  let filtered = staff;
  if (q) {
    filtered = filtered.filter((s) =>
      `${s.firstName} ${s.lastName} ${s.staffId}`.toLowerCase().includes(q)
    );
  }
  if (departmentId) filtered = filtered.filter((s) => s.departmentId === departmentId);
  if (facultyId) filtered = filtered.filter((s) => s.facultyId === facultyId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="eyebrow">Directory Index</p>
          <h1 className="section-heading">Staff Directory</h1>
          <p className="mt-2 text-sm text-steel-500 max-w-xl">
            {filtered.length} of {staff.length} staff records shown across {departments.length} departments.
          </p>
        </div>
        <Link href="/staff/new" className="btn-primary self-start sm:self-auto">
          + Add Staff
        </Link>
      </div>

      <div className="mt-6">
        <Suspense fallback={<div className="card-surface p-5 h-[150px]" />}>
          <SearchBar departments={departments} faculties={faculties} />
        </Suspense>
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            title="No matching staff records"
            message="Try adjusting your search term or clearing the filters."
            actionHref="/staff"
            actionLabel="Reset search"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((s) => (
              <StaffCard key={s.id} staff={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
