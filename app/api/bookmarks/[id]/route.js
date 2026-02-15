import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { validateBookmark } from '@/lib/validator';

export async function PUT(request, { params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { isValid, errors } = validateBookmark(body);

        if (!isValid) {
            return NextResponse.json({ errors }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('bookmarks')
            .update({
                url: body.url,
                title: body.title,
                description: body.description || '',
                tags: body.tags || [],
            })
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return new Response(null, { status: 204 });
}
