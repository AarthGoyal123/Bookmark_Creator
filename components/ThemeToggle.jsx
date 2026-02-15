'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--foreground)',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}
        >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
}
