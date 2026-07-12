import Link from "next/link";
import { notFound } from "next/navigation";
import { getDepartmentById, getFacultyById, getStaffById, getEnrichedStaff } from "@/lib/db";
import StaffCard from "@/components/StaffCard";
import EmptyState from "@/components/EmptyState";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dep = await getDepartmentById(id);
  return { title: dep ? `${dep.name} | Departments` : "Department Not Found" };
}

export default async function DepartmentDetailPage({ params }) {
  const { id } = await params;
  const department = await getDepartmentById(id);
  if (!department) notFound();

  const [faculty, hod, allStaff] = await Promise.all([
    getFacultyById(department.facultyId),
    department.hod ? getStaffById(department.hod) : null,
    getEnrichedStaff(),
  ]);

  const deptStaff = allStaff.filter((s) => s.departmentId === department.id);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Link href="/departments" className="text-sm text-royal-600 hover:text-royal-700">
        ← Back to departments
      </Link>

      <div className="mt-4 card-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{faculty?.name}</p>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl text-navy-800">{department.name}</h1>
            <p className="mt-1 font-mono text-xs text-steel-500">{department.code}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl text-navy-800">{deptStaff.length}</p>
            <p className="text-xs text-steel-500">Staff members</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-steel-700 max-w-2xl leading-relaxed">{department.description}</p>

        {hod && (
          <div className="mt-6 pt-6 border-t border-paper-300">
            <p className="field-label">Head of Department</p>
            <Link href={`/staff/${hod.id}`} className="text-sm font-medium text-navy-800 hover:text-royal-600">
              {hod.firstName} {hod.lastName}
            </Link>
          </div>
        )}
      </div>

      <div className="mt-10">
        <p className="eyebrow">Directory</p>
        <h2 className="section-heading mb-6">Staff in this department</h2>
        {deptStaff.length === 0 ? (
          <EmptyState title="No staff records yet" message="This department currently has no staff registered." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deptStaff.map((s) => (
              <StaffCard key={s.id} staff={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
