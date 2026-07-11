import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const staff = await db.getStaffById(params.id);
    if (!staff) {
      return NextResponse.json(
        { error: 'Staff not found' },
        { status: 404 }
      );
    }
    
    // Get department and unit details
    const departments = await db.getDepartments();
    const units = await db.getUnits();
    const dept = departments.find(d => d.id === staff.departmentId);
    const unit = units.find(u => u.id === staff.unitId);
    
    return NextResponse.json({
      ...staff,
      departmentName: dept?.name || 'Unknown',
      unitName: unit?.name || 'Unknown',
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const updated = await db.updateStaff(params.id, data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = getSession();
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await db.deleteStaff(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}