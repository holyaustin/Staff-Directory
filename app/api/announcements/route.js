import { NextResponse } from "next/server";
import { getAllAnnouncements } from "@/lib/db";

export async function GET() {
  const announcements = await getAllAnnouncements();
  return NextResponse.json(announcements);
}
