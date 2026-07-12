import { NextResponse } from "next/server";
import { getDepartmentById } from "@/lib/db";

export async function GET(_request, { params }) {
  const { id } = await params;
  const department = await getDepartmentById(id);
  if (!department) return NextResponse.json({ error: "Department not found" }, { status: 404 });
  return NextResponse.json(department);
}
