import { notFound } from "next/navigation";
import { getStaffById, getAllDepartments, getAllFaculties, getAllDesignations } from "@/lib/db";
import StaffForm from "@/components/StaffForm";

export const metadata = { title: "Edit Staff | Staff Directory" };

export default async function EditStaffPage({ params }) {
  const { id } = await params;
  const [staff, departments, faculties, designations] = await Promise.all([
    getStaffById(id),
    getAllDepartments(),
    getAllFaculties(),
    getAllDesignations(),
  ]);

  if (!staff) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="eyebrow">Edit Record</p>
      <h1 className="section-heading">
        Update {staff.firstName} {staff.lastName}
      </h1>
      <p className="mt-2 text-sm text-steel-500 max-w-xl">
        Changes are saved directly to the staff directory record.
      </p>

      <div className="mt-8">
        <StaffForm
          mode="edit"
          initialData={staff}
          departments={departments}
          faculties={faculties}
          designations={designations}
        />
      </div>
    </div>
  );
}
