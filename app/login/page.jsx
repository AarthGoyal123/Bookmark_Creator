'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import ThemeToggle from '@/components/ThemeToggle';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <ThemeToggle />
            </div>

            <div style={{
                maxWidth: '400px',
                width: '100%',
                padding: '40px 30px',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 10px 15px -3px var(--card-shadow)',
                backgroundColor: 'var(--card-bg)'
            }}>
                <h1 style={{ marginBottom: '10px', fontSize: '2rem', fontWeight: '800' }}>Welcome Back</h1>
                <p style={{ color: 'var(--secondary)', marginBottom: '40px' }}>Sign in to manage your bookmarks</p>

                {error && (
                    <div style={{
                        padding: '12px',
                        backgroundColor: 'rgba(197, 48, 48, 0.1)',
                        color: '#c53030',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '14px',
                        border: '1px solid rgba(197, 48, 48, 0.2)'
                    }}>
                        {error}
                    </div>
                )}

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        background: 'var(--background)',
                        color: 'var(--foreground)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        transition: 'transform 0.1s, background 0.2s',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--input-bg)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--background)'}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" height="20" />
                    {loading ? 'Connecting...' : 'Continue with Google'}
                </button>

                <div style={{ marginTop: '40px', fontSize: '12px', color: 'var(--secondary)' }}>
                    Secure authentication powered by Supabase
                </div>
            </div>
        </div>
    );
}
