import Link from "next/link";
import Badge from "@/components/Badge";

function initials(first, last) {
  return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
}

export default function StaffCard({ staff }) {
  return (
    <Link
      href={`/staff/${staff.id}`}
      className="group card-surface p-0 overflow-hidden hover:border-royal-400 hover:shadow-lg transition"
    >
      <div className="relative bg-navy-800 px-4 pt-4 pb-6">
        <span className="punch-hole" />
        <p className="eyebrow text-navy-200">{staff.department?.code || "STAFF"}</p>
        <p className="mt-4 font-mono text-[11px] text-navy-200 tracking-wide">{staff.staffId}</p>
      </div>

      <div className="px-4 -mt-4 pb-5">
        <div className="flex items-end gap-3">
          <div className="h-14 w-14 rounded-md bg-white border border-paper-300 shadow-card flex items-center justify-center font-display text-lg text-navy-800">
            {initials(staff.firstName, staff.lastName)}
          </div>
        </div>

        <h3 className="mt-4 font-display text-lg text-navy-800 group-hover:text-royal-700 transition">
          {staff.firstName} {staff.lastName}
        </h3>
        <p className="text-sm text-steel-600">{staff.designation?.title}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="royal">{staff.department?.name}</Badge>
          <Badge variant={staff.status === "Active" ? "success" : "steel"}>{staff.status}</Badge>
        </div>
      </div>
    </Link>
  );
}
