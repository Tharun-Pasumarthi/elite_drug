import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { sign } from 'jsonwebtoken';

type AdminAuthConfig = {
  jwtSecret: string;
  adminEmails: string[];
  adminPassword: string;
};

function getAdminAuthConfig(): AdminAuthConfig | null {
  const jwtSecret = process.env.JWT_SECRET;
  const adminEmails = (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!jwtSecret || adminEmails.length === 0 || !adminPassword) {
    return null;
  }

  return {
    jwtSecret,
    adminEmails,
    adminPassword,
  };
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
    const config = getAdminAuthConfig();

    if (!config) {
      return NextResponse.json(
        { error: 'Server auth configuration is incomplete' },
        { status: 500 }
      );
    }

    const { email, password } = await request.json();
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedPassword = typeof password === 'string' ? password : '';

    const isValidEmail = config.adminEmails.some((adminEmail) => safeCompare(normalizedEmail, adminEmail));
    const isValidPassword = safeCompare(normalizedPassword, config.adminPassword);
    
    if (isValidEmail && isValidPassword) {
      const token = sign(
        { email: normalizedEmail, role: 'admin' },
        config.jwtSecret,
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
  } catch {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
