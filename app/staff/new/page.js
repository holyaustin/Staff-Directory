import { getAllDepartments, getAllFaculties, getAllDesignations } from "@/lib/db";
import StaffForm from "@/components/StaffForm";

export const metadata = { title: "Add Staff | Staff Directory" };

export default async function NewStaffPage() {
  const [departments, faculties, designations] = await Promise.all([
    getAllDepartments(),
    getAllFaculties(),
    getAllDesignations(),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <p className="eyebrow">New Record</p>
      <h1 className="section-heading">Register a Staff Member</h1>
      <p className="mt-2 text-sm text-steel-500 max-w-xl">
        Fill in the details below to add a new staff record to the directory. Fields marked
        with an asterisk are required.
      </p>

      <div className="mt-8">
        <StaffForm mode="create" departments={departments} faculties={faculties} designations={designations} />
      </div>
    </div>
  );
}
