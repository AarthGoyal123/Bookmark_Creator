'use client';

import { useEffect, useState } from 'react';
import BookmarkForm from '@/components/BookmarkForm';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditBookmarkPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [bookmark, setBookmark] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmark = async () => {
            try {
                const res = await fetch('/api/bookmarks');
                if (!res.ok) throw new Error('Failed to fetch bookmarks');
                const data = await res.json();
                const found = data.find(b => b.id === id);
                if (!found) throw new Error('Bookmark not found');
                setBookmark(found);
            } catch (err) {
                alert(err.message);
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBookmark();
    }, [id, router]);

    const handleUpdate = async (updatedData) => {
        try {
            const res = await fetch(`/api/bookmarks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Update failed');
            }

            router.push('/dashboard');
            router.refresh();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
            <header style={{ marginBottom: '30px' }}>
                <Link href="/dashboard" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>
                    ← Back to Dashboard
                </Link>
                <h1 style={{ marginTop: '10px' }}>Edit Bookmark</h1>
            </header>

            <BookmarkForm
                initialData={bookmark}
                onSubmit={handleUpdate}
                onCancel={() => router.push('/dashboard')}
            />
        </div>
    );
}
