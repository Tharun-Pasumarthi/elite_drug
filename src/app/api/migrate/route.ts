import { NextRequest, NextResponse } from 'next/server';
import { migrateProducts } from '@/lib/migrate-products';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const clearFirst = body.clearFirst || false;
    
    const result = await migrateProducts(clearFirst);
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: `Successfully migrated ${result.count} products!`,
        count: result.count 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Migration API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Migration failed' 
    }, { status: 500 });
  }
}
