'use client';

import BookmarkItem from './BookmarkItem';

export default function BookmarkList({ bookmarks, loading, onUpdate, onDelete, onTagClick }) {
    if (loading) {
        return <p>Loading bookmarks...</p>;
    }

    if (bookmarks.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <p>No bookmarks found.</p>
            </div>
        );
    }

    return (
        <div>
            {bookmarks.map((bookmark) => (
                <BookmarkItem
                    key={bookmark.id}
                    bookmark={bookmark}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    onTagClick={onTagClick}
                />
            ))}
        </div>
    );
}
