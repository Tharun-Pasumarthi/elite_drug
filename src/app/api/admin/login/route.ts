import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!JWT_SECRET || ADMIN_EMAILS.length === 0 || !ADMIN_PASSWORD) {
  throw new Error('JWT_SECRET, ADMIN_EMAIL/ADMIN_EMAILS, and ADMIN_PASSWORD environment variables are required');
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const adminPassword = ADMIN_PASSWORD as string;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedPassword = typeof password === 'string' ? password : '';

    const isValidEmail = ADMIN_EMAILS.some((adminEmail) => safeCompare(normalizedEmail, adminEmail));
    const isValidPassword = safeCompare(normalizedPassword, adminPassword);
    
    if (isValidEmail && isValidPassword) {
      const token = sign(
        { email: normalizedEmail, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return NextResponse.json({ 
        success: true, 
        token,
        message: 'Login successful' 
      });
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
