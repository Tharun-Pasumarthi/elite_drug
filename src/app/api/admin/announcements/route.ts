import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// GET - Fetch all announcements (admin)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createAdminClient();
    
    const { data: announcements, error } = await supabase
      .from('announcements')
      .select('*')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching announcements:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ announcements });
  } catch (error: any) {
    console.error('Error in GET /api/admin/announcements:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create new announcement
export async function POST(request: NextRequest) {
  try {
    const supabase = await createAdminClient();
    const body = await request.json();

    const { title, message, type, link, link_text, is_active, priority, expires_at } = body;

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      );
    }

    const { data: announcement, error } = await supabase
      .from('announcements')
      .insert({
        title,
        message,
        type: type || 'info',
        link,
        link_text,
        is_active: is_active !== undefined ? is_active : true,
        priority: priority || 0,
        expires_at,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating announcement:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Revalidate pages that show announcements
    revalidatePath('/');
    revalidatePath('/announcements');
    // Revalidate pages that show announcements
    revalidatePath('/');
    revalidatePath('/announcements');

    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/admin/announcements:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update announcement
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createAdminClient();
    const body = await request.json();

    const { id, title, message, type, link, link_text, is_active, priority, expires_at } = body;

    if (!id) {
      return NextResponse.json({ error: 'Announcement ID is required' }, { status: 400 });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (message !== undefined) updateData.message = message;
    if (type !== undefined) updateData.type = type;
    if (link !== undefined) updateData.link = link;
    if (link_text !== undefined) updateData.link_text = link_text;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (priority !== undefined) updateData.priority = priority;
    if (expires_at !== undefined) updateData.expires_at = expires_at;

    const { data: announcement, error } = await supabase
      .from('announcements')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating announcement:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Revalidate pages that show announcements
    revalidatePath('/');
    revalidatePath('/announcements');

    return NextResponse.json({ announcement });
  } catch (error: any) {
    console.error('Error in PUT /api/admin/announcements:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete announcement
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createAdminClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Announcement ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting announcement:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Announcement deleted successfully' });
  } catch (error: any) {
    console.error('Error in DELETE /api/admin/announcements:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
