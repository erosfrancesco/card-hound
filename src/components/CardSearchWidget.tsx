import React, { FormEvent, CSSProperties } from 'react';
import { useCardTraderSearch } from './useCardTraderSearch';
import { CardTraderSearchOptions } from '../models/cardTraderZeroCards';

export const CardTraderImageDisplay: React.FC<CardTraderSearchOptions> = ({ apiKey }) => {
    const {
        query,
        loading,
        error,
        card,
        handleQueryChange,
        searchCard
    } = useCardTraderSearch(apiKey);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        searchCard();
    };

    return (
        <div style={styles.cardContainer}>
            <header style={styles.header}>
                <h2 style={styles.title}>CardTrader Search</h2>
            </header>

            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Enter card name (e.g., Black Lotus)"
                    value={query}
                    onChange={handleQueryChange}
                    disabled={loading}
                    style={styles.input}
                />
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    style={{
                        ...styles.button,
                        opacity: loading || !query.trim() ? 0.6 : 1
                    }}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <div style={styles.errorMessage}>{error}</div>}

            {card && (
                <div style={styles.resultBox}>
                    <h3 style={styles.cardTitle}>{card.name}</h3>
                    {card.expansionName && (
                        <span style={styles.badge}>{card.expansionName}</span>
                    )}
                    <div style={styles.imageWrapper}>
                        <img
                            src={card.imageUrl}
                            alt={card.name}
                            style={styles.image}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const styles: Record<string, CSSProperties> = {
    cardContainer: {
        maxWidth: '420px',
        margin: '24px auto',
        padding: '24px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
        marginBottom: '16px',
        textAlign: 'center'
    },
    title: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: 600,
        color: '#1f2937'
    },
    form: {
        display: 'flex',
        gap: '8px',
        marginBottom: '16px'
    },
    input: {
        flex: 1,
        padding: '10px 14px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '0.95rem',
        outline: 'none'
    },
    button: {
        padding: '10px 18px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        fontWeight: 500,
        fontSize: '0.95rem',
        cursor: 'pointer'
    },
    errorMessage: {
        padding: '12px',
        borderRadius: '6px',
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        fontSize: '0.875rem',
        textAlign: 'center'
    },
    resultBox: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
    },
    cardTitle: {
        margin: 0,
        fontSize: '1.1rem',
        color: '#111827',
        textAlign: 'center'
    },
    badge: {
        fontSize: '0.75rem',
        padding: '2px 8px',
        borderRadius: '12px',
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
        fontWeight: 500
    },
    imageWrapper: {
        marginTop: '8px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '450px',
        objectFit: 'contain',
        borderRadius: '8px'
    }
};