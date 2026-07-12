import { NextResponse } from "next/server";
import { getFacultyById } from "@/lib/db";

export async function GET(_request, { params }) {
  const { id } = await params;
  const faculty = await getFacultyById(id);
  if (!faculty) return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
  return NextResponse.json(faculty);
}
