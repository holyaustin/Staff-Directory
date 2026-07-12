import { NextResponse } from "next/server";
import { getAllDesignations } from "@/lib/db";

export async function GET() {
  const designations = await getAllDesignations();
  return NextResponse.json(designations);
}
