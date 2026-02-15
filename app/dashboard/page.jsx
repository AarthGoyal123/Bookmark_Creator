'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/components/AuthProvider';
import BookmarkList from '@/components/BookmarkList';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, signOut } = useAuth();
    const [bookmarks, setBookmarks] = useState([]);
    const [filteredBookmarks, setFilteredBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTag, setActiveTag] = useState(null);

    const fetchBookmarks = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/bookmarks');
            if (!res.ok) throw new Error('Failed to fetch bookmarks');
            const data = await res.json();
            setBookmarks(data);
            applyFilters(data, searchQuery, activeTag);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, activeTag]);

    useEffect(() => {
        if (user) {
            fetchBookmarks();
        }
    }, [user, fetchBookmarks]);

    const applyFilters = (data, query, tag) => {
        let filtered = [...data];

        // Search filter
        if (query) {
            const lowerQuery = query.toLowerCase();
            filtered = filtered.filter(
                (b) =>
                    b.title.toLowerCase().includes(lowerQuery) ||
                    b.url.toLowerCase().includes(lowerQuery)
            );
        }

        // Tag filter
        if (tag) {
            filtered = filtered.filter((b) => b.tags?.includes(tag));
        }

        setFilteredBookmarks(filtered);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        applyFilters(bookmarks, query, activeTag);
    };

    const handleTagSelect = (tag) => {
        setActiveTag(tag);
        applyFilters(bookmarks, searchQuery, tag);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this bookmark?')) return;
        try {
            const res = await fetch(`/api/bookmarks/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Delete failed');
            fetchBookmarks();
        } catch (err) {
            alert(err.message);
        }
    };

    // Get unique tags from all bookmarks for the filter
    const allTags = useMemo(() => {
        const tagsSet = new Set();
        bookmarks.forEach((b) => {
            b.tags?.forEach((tag) => tagsSet.add(tag));
        });
        return Array.from(tagsSet).sort();
    }, [bookmarks]);

    if (!user) return null;

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>My Bookmarks</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <ThemeToggle />
                    <span style={{ fontSize: '14px', color: 'var(--secondary)' }}>{user.email}</span>
                    <button
                        onClick={signOut}
                        style={{
                            padding: '6px 12px',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            border: '1px solid var(--card-border)',
                            backgroundColor: 'var(--card-bg)',
                            color: 'var(--foreground)'
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--card-bg)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '30px',
                border: '1px solid var(--card-border)',
                boxShadow: '0 4px 6px var(--card-shadow)'
            }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Your Collection</h2>
                <Link href="/bookmarks/add" style={{
                    padding: '10px 20px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '500'
                }}>
                    + Add New Bookmark
                </Link>
            </div>

            <div style={{ margin: '40px 0' }}>
                <SearchBar
                    onSearch={handleSearch}
                    tags={allTags}
                    activeTag={activeTag}
                    onTagSelect={handleTagSelect}
                />

                <BookmarkList
                    bookmarks={filteredBookmarks}
                    loading={loading}
                    onDelete={handleDelete}
                    onTagClick={handleTagSelect}
                />
            </div>
        </div>
    );
}
