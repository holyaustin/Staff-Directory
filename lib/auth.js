import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-this';

// REMOVE bcrypt - Just compare plain text
export async function comparePassword(password, hash) {
  // Simple direct comparison for demo
  return password === hash;
}

// No need for hashPassword function at all!

export function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role,
      staffId: user.staffId
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getTokenFromCookies() {
  const cookieStore = cookies();
  return cookieStore.get('token')?.value;
}

export function getSession() {
  const token = getTokenFromCookies();
  if (!token) return null;
  return verifyToken(token);
}

export function setAuthCookie(token) {
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  });
}

export function clearAuthCookie() {
  cookies().delete('token');
}