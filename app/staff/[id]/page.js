import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnrichedStaffById } from "@/lib/db";
import Badge from "@/components/Badge";
import DeleteStaffButton from "@/components/DeleteStaffButton";

function initials(first, last) {
  return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const staff = await getEnrichedStaffById(id);
  return { title: staff ? `${staff.firstName} ${staff.lastName} | Staff Directory` : "Staff Not Found" };
}

export default async function StaffDetailPage({ params }) {
  const { id } = await params;
  const staff = await getEnrichedStaffById(id);
  if (!staff) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Link href="/staff" className="text-sm text-royal-600 hover:text-royal-700">
        ← Back to directory
      </Link>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ID card panel */}
        <div className="card-surface p-0 overflow-hidden h-fit">
          <div className="relative bg-navy-800 px-6 pt-6 pb-10">
            <span className="punch-hole" />
            <p className="eyebrow text-navy-200">Staff Identification</p>
            <p className="mt-6 font-mono text-sm text-navy-100 tracking-wide">{staff.staffId}</p>
          </div>
          <div className="px-6 -mt-8 pb-6">
            <div className="h-16 w-16 rounded-md bg-white border border-paper-300 shadow-card flex items-center justify-center font-display text-xl text-navy-800">
              {initials(staff.firstName, staff.lastName)}
            </div>
            <h1 className="mt-4 font-display text-2xl text-navy-800">
              {staff.firstName} {staff.lastName}
            </h1>
            <p className="text-sm text-steel-600">{staff.designation?.title}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="royal">{staff.department?.name}</Badge>
              <Badge variant={staff.status === "Active" ? "success" : "steel"}>{staff.status}</Badge>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Link href={`/staff/${staff.id}/edit`} className="btn-secondary w-full">
                Edit Record
              </Link>
              <DeleteStaffButton staffId={staff.id} staffName={`${staff.firstName} ${staff.lastName}`} />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-surface p-6">
            <p className="eyebrow text-royal-600">Biography</p>
            <p className="mt-2 text-sm text-steel-700 leading-relaxed">
              {staff.bio || "No biography has been added for this staff member yet."}
            </p>
          </div>

          <div className="card-surface p-6">
            <p className="eyebrow text-royal-600">Contact Information</p>
            <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="field-label">Email</dt>
                <dd className="text-ink">{staff.email}</dd>
              </div>
              <div>
                <dt className="field-label">Phone</dt>
                <dd className="text-ink">{staff.phone}</dd>
              </div>
              <div>
                <dt className="field-label">Office Location</dt>
                <dd className="text-ink">{staff.officeLocation || "—"}</dd>
              </div>
              <div>
                <dt className="field-label">Gender</dt>
                <dd className="text-ink">{staff.gender}</dd>
              </div>
            </dl>
          </div>

          <div className="card-surface p-6">
            <p className="eyebrow text-royal-600">Appointment Details</p>
            <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="field-label">School</dt>
                <dd className="text-ink">
                  <Link href={`/faculties/${staff.facultyId}`} className="hover:text-royal-600">
                    {staff.faculty?.name}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="field-label">Department</dt>
                <dd className="text-ink">
                  <Link href={`/departments/${staff.departmentId}`} className="hover:text-royal-600">
                    {staff.department?.name}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="field-label">Qualification</dt>
                <dd className="text-ink">{staff.qualification || "—"}</dd>
              </div>
              <div>
                <dt className="field-label">Date Employed</dt>
                <dd className="text-ink">
                  {staff.dateEmployed
                    ? new Date(staff.dateEmployed).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })
                    : "—"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
