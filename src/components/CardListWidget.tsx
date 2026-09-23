import React, { useState } from 'react';
import { useCardTraderZero, SortOrder } from '../hook/useCardTraderZero';
import { CardListRowWidget, CardListStatRowWidget } from './CardListWidgetRow';

interface CardTraderWidgetProps {
    blueprintId: number;
    cardName?: string;
}

export const CardListWidget: React.FC<CardTraderWidgetProps> = ({
    blueprintId,
    cardName = 'Card Listings',
}) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const apiToken = import.meta.env.VITE_CARDTRADER_API_TOKEN;

    const { products, loading, error, stats, refetch } = useCardTraderZero({
        apiToken,
        blueprintId,
        languages: ['en', 'it'],
        zeroOnly: true,
        sortOrder,
    });

    if (!apiToken) {
        return (
            <div style={{ padding: '16px', border: '1px solid #f5c6cb', borderRadius: '8px', backgroundColor: '#f8d7da', color: '#721c24' }}>
                <strong>Error:</strong> <code>VITE_CARDTRADER_API_TOKEN</code> is missing from your <code>.env.local</code> file.
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                backgroundColor: '#ffffff',
            }}
        >
            {/* Header & Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1a1a1a' }}>{cardName}</h3>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>CardTrader Zero Listings</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        style={{
                            padding: '6px 12px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            backgroundColor: '#f9f9f9',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                        }}
                    >
                        Price: {sortOrder === 'asc' ? 'Low → High ⬆️' : 'High → Low ⬇️'}
                    </button>
                    <button
                        onClick={refetch}
                        style={{
                            padding: '6px 12px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            backgroundColor: '#f9f9f9',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                        }}
                    >
                        🔄
                    </button>
                </div>
            </div>

            {/* Stats Summary Bar */}
            {!loading && !error && products.length > 0 && (
                <CardListStatRowWidget stats={stats} />
            )}

            {/* Loading & Error States */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#666' }}>
                    Loading products...
                </div>
            )}

            {error && (
                <div style={{ padding: '12px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '6px' }}>
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px 0', color: '#888' }}>
                    No CardTrader Zero listings available in English or Italian.
                </div>
            )}

            {/* Ordered List of Products */}
            {!loading && !error && products.length > 0 && (
                <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {products.map((product, index) => <CardListRowWidget key={index} product={product} count={index} hasBorder={index < products.length - 1} />)}
                </ol>
            )}
        </div>
    );
};