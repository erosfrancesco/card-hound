import React from 'react';
import { CardTraderProduct, CardTraderProductStats } from '../models/cardTraderZero';



export const getConditionColor = (condition?: string): string => {
    if (!condition) return '#222222';
    const cond = condition.toLowerCase();

    if (cond.includes('mint') || cond === 'nm') return '#2e7d32'; // Green (Mint/Near Mint)
    if (cond.includes('slight') || cond.includes('light') || cond === 'sp' || cond === 'lp' || cond === 'ex') return '#1565c0'; // Blue (Slightly/Lightly Played/EX)
    if (cond.includes('moderate') || cond.includes('play') || cond === 'mp' || cond === 'gd') return '#e65100'; // Orange (Moderately Played/Good)
    if (cond.includes('heavy') || cond === 'hp' || cond === 'po' || cond.includes('poor')) return '#c62828'; // Dark Red (Heavily Played/Poor)
    if (cond.includes('damage') || cond === 'dmg') return '#8e0000'; // Crimson (Damaged)

    return '#222222';
};

//
interface CardListRowWidgetProps {
    product: CardTraderProduct;
    count: number;
    hasBorder: boolean;
}

export const CardListRowWidget: React.FC<CardListRowWidgetProps> = ({
    product,
    count,
    hasBorder
}) => {
    const price = (product.price.cents / 100).toFixed(2);
    const language = (
        product.properties_hash.language ||
        product.properties_hash.mtg_language ||
        'N/A'
    ).toUpperCase();
    const isFoil = product.properties_hash.foil;

    return (
        <li
            key={product.id}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: hasBorder ? '1px solid #eee' : 'none',
            }}
        >
            {/* Left side: Position, Name/Details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                    style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#eef2f5',
                        color: '#444',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                    }}
                >
                    {count + 1}
                </span>

                <div>
                    <div style={{ fontWeight: 600, color: getConditionColor(product.properties_hash.condition), fontSize: '0.95rem' }}>                        {product.name_en}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '2px' }}>
                        <span
                            style={{
                                backgroundColor: '#eef',
                                color: '#33d',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                marginRight: '6px',
                                fontWeight: 600,
                            }}
                        >
                            {language}
                        </span>

                        {isFoil && (
                            <span style={{ marginLeft: '6px', color: '#b8860b', fontWeight: 600 }}>
                                ✨ Foil
                            </span>
                        )}
                        <span style={{ marginLeft: '8px', color: '#888' }}>
                            • Seller: {product.user.username}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right side: Price & Quantity */}
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#2e7d32' }}>
                    {price} {product.price.currency}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#888' }}>
                    Qty: {product.quantity}
                </div>
            </div>
        </li>
    );
};


//
interface CardListStatsRowWidgetProps {
    stats: CardTraderProductStats;
}

export const CardListStatRowWidget: React.FC<CardListStatsRowWidgetProps> = ({
    stats
}) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: '#f4f6f8',
                borderRadius: '6px',
                marginBottom: '16px',
                fontSize: '0.875rem',
            }}
        >
            <span>Lowest: <strong>{(stats.lowestPrice ?? 0).toFixed(2)} {stats.currency}</strong></span>
            <span>Highest: <strong>{(stats.highestPrice ?? 0).toFixed(2)} {stats.currency}</strong></span>
            <span>Available: <strong>{stats.totalAvailable}</strong></span>
        </div>
    )
}