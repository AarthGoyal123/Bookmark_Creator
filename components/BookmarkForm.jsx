'use client';

import { useState, useEffect } from 'react';
import { validateBookmark } from '@/lib/validator';

export default function BookmarkForm({ initialData, onSubmit, onCancel }) {
    const [url, setUrl] = useState(initialData?.url || '');
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [fetchingMetadata, setFetchingMetadata] = useState(false);

    // Auto-fetch metadata when URL changes (for new bookmarks only)
    useEffect(() => {
        if (initialData) return; // Don't auto-fetch when editing

        const timer = setTimeout(async () => {
            if (url && url.startsWith('http')) {
                try {
                    // Basic URL validation before fetching
                    new URL(url);

                    setFetchingMetadata(true);
                    const res = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.title && !title) setTitle(data.title);
                        if (data.description && !description) setDescription(data.description);
                    }
                } catch (e) {
                    // Invalid URL, ignore
                } finally {
                    setFetchingMetadata(false);
                }
            }
        }, 800); // 800ms debounce

        return () => clearTimeout(timer);
    }, [url, title, description, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        const formattedTags = tags
            .split(',')
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag !== '');

        const bookmarkData = { url, title, description, tags: formattedTags };
        const { isValid, errors: validationErrors } = validateBookmark(bookmarkData);

        if (!isValid) {
            setErrors(validationErrors);
            setSubmitting(false);
            return;
        }

        await onSubmit(bookmarkData);
        setSubmitting(false);
        if (!initialData) {
            setUrl('');
            setTitle('');
            setDescription('');
            setTags('');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                padding: '20px',
                border: '1px solid var(--card-border)',
                borderRadius: '12px',
                backgroundColor: 'var(--card-bg)',
                marginBottom: '20px',
                boxShadow: '0 4px 6px var(--card-shadow)'
            }}
        >
            <h3 style={{ marginTop: 0 }}>{initialData ? 'Edit Bookmark' : 'Add New Bookmark'}</h3>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>URL</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                    />
                    {fetchingMetadata && (
                        <div style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '12px',
                            color: 'var(--primary)'
                        }}>
                            Fetching...
                        </div>
                    )}
                </div>
                {errors.url && <small style={{ color: '#d00', marginTop: '5px', display: 'block' }}>{errors.url}</small>}
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Bookmark Title"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                />
                {errors.title && <small style={{ color: '#d00', marginTop: '5px', display: 'block' }}>{errors.title}</small>}
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Description (optional)</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description..."
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', height: '80px', resize: 'vertical' }}
                />
                {errors.description && <small style={{ color: '#d00', marginTop: '5px', display: 'block' }}>{errors.description}</small>}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Tags (comma separated)</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="nextjs, supabase, auth"
                    style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
                />
                <small style={{ display: 'block', color: 'var(--secondary)', marginTop: '5px', fontSize: '11px' }}>Max 5 tags, lowercase only</small>
                {errors.tags && <small style={{ color: '#d00', marginTop: '5px', display: 'block' }}>{errors.tags}</small>}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        padding: '10px 24px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: submitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {submitting ? 'Saving...' : (initialData ? 'Update Bookmark' : 'Save Bookmark')}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            padding: '10px 24px',
                            background: 'transparent',
                            color: 'var(--secondary)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
