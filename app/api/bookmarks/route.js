import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabaseServer';
import { validateBookmark } from '@/lib/validator';

export async function GET(request) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    let query = supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (tag) {
        query = query.contains('tags', [tag]);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request) {
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
            .insert([
                {
                    user_id: user.id,
                    url: body.url,
                    title: body.title,
                    description: body.description || '',
                    tags: body.tags || [],
                },
            ])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
