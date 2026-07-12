import { NextResponse } from "next/server";
import { getEnrichedStaffById, updateStaff, deleteStaff } from "@/lib/db";

export async function GET(_request, { params }) {
  const { id } = await params;
  const staff = await getEnrichedStaffById(id);
  if (!staff) return NextResponse.json({ error: "Staff not found" }, { status: 404 });
  return NextResponse.json(staff);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const updated = await updateStaff(id, body);
  if (!updated) return NextResponse.json({ error: "Staff not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const ok = await deleteStaff(id);
  if (!ok) return NextResponse.json({ error: "Staff not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
