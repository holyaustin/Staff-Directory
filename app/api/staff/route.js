import { NextResponse } from "next/server";
import { getEnrichedStaff, createStaff } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  const departmentId = searchParams.get("departmentId") || "";
  const facultyId = searchParams.get("facultyId") || "";

  let staff = await getEnrichedStaff();

  if (q) {
    staff = staff.filter((s) =>
      `${s.firstName} ${s.lastName} ${s.staffId}`.toLowerCase().includes(q)
    );
  }
  if (departmentId) staff = staff.filter((s) => s.departmentId === departmentId);
  if (facultyId) staff = staff.filter((s) => s.facultyId === facultyId);

  return NextResponse.json(staff);
}

export async function POST(request) {
  const body = await request.json();

  const required = ["firstName", "lastName", "email", "phone", "departmentId", "facultyId", "designationId"];
  const missing = required.filter((field) => !body[field]);
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const staffIdPrefix = "AIFPU/NEW";
  const record = await createStaff({
    ...body,
    staffId: body.staffId || `${staffIdPrefix}/${Date.now().toString().slice(-6)}`,
  });

  return NextResponse.json(record, { status: 201 });
}
