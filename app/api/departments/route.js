import { NextResponse } from "next/server";
import { getAllDepartments } from "@/lib/db";

export async function GET() {
  const departments = await getAllDepartments();
  return NextResponse.json(departments);
}
