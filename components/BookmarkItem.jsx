'use client';

import { useRouter } from 'next/navigation';

export default function BookmarkItem({ bookmark, onDelete, onTagClick }) {
    const router = useRouter();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div
            style={{
                padding: '15px',
                border: '1px solid var(--card-border)',
                borderRadius: '8px',
                marginBottom: '15px',
                boxShadow: '0 2px 4px var(--card-shadow)',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>
                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--primary)', textDecoration: 'none' }}
                    >
                        {bookmark.title}
                    </a>
                </h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => router.push(`/bookmarks/${bookmark.id}/edit`)}
                        style={{
                            fontSize: '12px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            background: 'var(--background)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '4px',
                            color: 'var(--foreground)'
                        }}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(bookmark.id)}
                        style={{
                            fontSize: '12px',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            background: '#fff0f0',
                            border: '1px solid #ffcccc',
                            color: '#d00',
                            borderRadius: '4px'
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <p style={{ margin: '5px 0', fontSize: '14px', color: 'var(--secondary)' }}>
                {bookmark.description || 'No description provided.'}
            </p>

            <div style={{ fontSize: '11px', color: 'var(--secondary)', marginTop: '5px' }}>
                Created on: {formatDate(bookmark.created_at)}
            </div>

            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '10px' }}>
                {bookmark.tags?.map((tag) => (
                    <span
                        key={tag}
                        onClick={() => onTagClick(tag)}
                        style={{
                            fontSize: '11px',
                            padding: '2px 8px',
                            background: 'rgba(0, 112, 243, 0.1)',
                            color: 'var(--primary)',
                            borderRadius: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
