import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Hashed password for 'EliteDrug@2026'
const ADMIN_CREDENTIALS = {
  email: 'admin@elitedrug.com',
  passwordHash: '$2a$10$YourHashedPasswordHere', // Replace with actual bcrypt hash
};

const JWT_SECRET = process.env.JWT_SECRET || 'elite-drug-secret-key-2026';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials with bcrypt
    const isValidEmail = email === ADMIN_CREDENTIALS.email;
    const isValidPassword = password === 'EliteDrug@2026'; // Temporary for transition
    
    if (isValidEmail && isValidPassword) {
      // Generate JWT token
      const token = sign(
        { email, role: 'admin' },
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
