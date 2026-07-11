import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await db.getUserByEmail(session.email);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get staff details
    const staff = await db.getStaffById(user.staffId);
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        staffId: user.staffId
      },
      staff: staff || null
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}