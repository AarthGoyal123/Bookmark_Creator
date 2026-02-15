'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function LandingPage() {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '60px' }}>
                <ThemeToggle />
            </header>

            <main style={{ textAlign: 'center', flex: 1 }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800' }}>
                    Manage Bookmarks with Ease
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '40px', lineHeight: '1.6' }}>
                    A simple, powerful way to organize your favorite links. <br />
                    Built with Next.js and Supabase.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <Link href="/login" style={{
                        padding: '14px 36px',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '1.1rem',
                        transition: 'opacity 0.2s'
                    }}>
                        Get Started
                    </Link>
                    <Link href="/login" style={{
                        padding: '14px 36px',
                        backgroundColor: 'var(--card-bg)',
                        color: 'var(--foreground)',
                        border: '1px solid var(--card-border)',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                    }}>
                        Login
                    </Link>
                </div>

                <div style={{ marginTop: '100px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                    <div style={{ padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px var(--card-shadow)' }}>
                        <h3 style={{ marginBottom: '12px' }}>Simple CRUD</h3>
                        <p style={{ color: 'var(--secondary)', fontSize: '14px', lineHeight: '1.5' }}>Add, edit, and delete bookmarks effortlessly with a clean interface.</p>
                    </div>
                    <div style={{ padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px var(--card-shadow)' }}>
                        <h3 style={{ marginBottom: '12px' }}>Smart Tagging</h3>
                        <p style={{ color: 'var(--secondary)', fontSize: '14px', lineHeight: '1.5' }}>Organize links using custom tags and filter them instantly.</p>
                    </div>
                    <div style={{ padding: '20px', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: '0 4px 6px var(--card-shadow)' }}>
                        <h3 style={{ marginBottom: '12px' }}>Quick Search</h3>
                        <p style={{ color: 'var(--secondary)', fontSize: '14px', lineHeight: '1.5' }}>Find any link instantly by title or URL with real-time filtering.</p>
                    </div>
                </div>
            </main>

            <footer style={{ marginTop: '60px', textAlign: 'center', padding: '20px', borderTop: '1px solid var(--card-border)', color: 'var(--secondary)', fontSize: '14px' }}>
                &copy; 2024 Bookmark Manager. Powered by Supabase.
            </footer>
        </div>
    );
}
