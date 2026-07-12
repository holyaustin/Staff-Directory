import { NextResponse } from "next/server";
import { getAllFaculties } from "@/lib/db";

export async function GET() {
  const faculties = await getAllFaculties();
  return NextResponse.json(faculties);
}
