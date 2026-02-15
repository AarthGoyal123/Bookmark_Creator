'use client';

import BookmarkForm from '@/components/BookmarkForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddBookmarkPage() {
    const router = useRouter();

    const handleCreate = async (newData) => {
        try {
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Create failed');
            }

            router.push('/dashboard');
            router.refresh();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 20px' }}>
            <header style={{ marginBottom: '30px' }}>
                <Link href="/dashboard" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>
                    ← Back to Dashboard
                </Link>
                <h1 style={{ marginTop: '10px' }}>Add Bookmark</h1>
            </header>

            <BookmarkForm
                onSubmit={handleCreate}
                onCancel={() => router.push('/dashboard')}
            />
        </div>
    );
}
