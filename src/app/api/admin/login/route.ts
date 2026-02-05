import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Hashed password for 'EliteDrug@2026'
// Generated with: bcrypt.hashSync('EliteDrug@2026', 10)
const ADMIN_CREDENTIALS = {
  email: 'admin@elitedrug.com',
  passwordHash: '$2b$10$oPORiA49aYRyXUC9feLO3.1Wa2x36EPmBOr.qkkK7AJAheiI2azUG', // EliteDrug@2026
};

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate credentials with bcrypt
    const isValidEmail = email === ADMIN_CREDENTIALS.email;
    const isValidPassword = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);
    
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
