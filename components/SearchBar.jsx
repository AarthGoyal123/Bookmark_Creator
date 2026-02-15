'use client';

export default function SearchBar({ onSearch, tags, activeTag, onTagSelect }) {
    return (
        <div style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Search by title or URL..."
                onChange={(e) => onSearch(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid var(--input-border)',
                    backgroundColor: 'var(--input-bg)',
                    color: 'var(--foreground)',
                    borderRadius: '8px',
                    marginBottom: '15px',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                }}
            />

            {tags && tags.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '14px', color: 'var(--secondary)', marginRight: '5px' }}>Filter by tag:</span>
                    <button
                        onClick={() => onTagSelect(null)}
                        style={{
                            padding: '4px 12px',
                            fontSize: '12px',
                            borderRadius: '20px',
                            border: '1px solid var(--card-border)',
                            backgroundColor: activeTag === null ? 'var(--primary)' : 'var(--card-bg)',
                            color: activeTag === null ? 'white' : 'var(--foreground)',
                            cursor: 'pointer'
                        }}
                    >
                        All
                    </button>
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => onTagSelect(tag)}
                            style={{
                                padding: '4px 12px',
                                fontSize: '12px',
                                borderRadius: '20px',
                                border: '1px solid var(--card-border)',
                                backgroundColor: activeTag === tag ? 'var(--primary)' : 'var(--card-bg)',
                                color: activeTag === tag ? 'white' : 'var(--foreground)',
                                cursor: 'pointer'
                            }}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
