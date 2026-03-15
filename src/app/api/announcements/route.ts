import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export const revalidate = 120;

const ANNOUNCEMENTS_CACHE_CONTROL = 'public, s-maxage=120, stale-while-revalidate=1800';

// GET - Fetch active announcements for public view
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    
    const { data: announcements, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('is_active', true)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching active announcements:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { announcements },
      {
        headers: {
          'Cache-Control': ANNOUNCEMENTS_CACHE_CONTROL,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in GET /api/announcements:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
