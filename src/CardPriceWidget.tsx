import React from 'react';
import { useCardTraderZero } from './hook/useCardTraderZero';

export const CardPriceWidget = ({ blueprintId }: { blueprintId: number }) => {
    const API_TOKEN = 'YOUR_CARDTRADER_API_TOKEN';

    const { products, loading, error, stats } = useCardTraderZero({
        apiToken: API_TOKEN,
        blueprintId: blueprintId,
        language: 'en',   // Filter by English
        zeroOnly: true,   // Only include CT Zero listings
    });

    if (loading) return <div>Loading CardTrader Zero prices...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            <h2>CardTrader Zero Listings</h2>

            {stats.lowestPrice !== null && (
                <div>
                    <p><strong>Lowest CT Zero Price:</strong> {stats.lowestPrice} {stats.currency}</p>
                    <p><strong>Total Available via Zero:</strong> {stats.totalAvailable}</p>
                </div>
            )}

            <h3>Listings</h3>
            <ul>
                {products.map((item) => (
                    <li key={item.id}>
                        <span>
                            <strong>{(item.price.cents / 100).toFixed(2)} {item.price.currency}</strong>
                            {' - '}
                            Condition: {item.properties_hash.condition || 'N/A'}
                            {' | '}
                            Lang: {(item.properties_hash.language || item.properties_hash.mtg_language || 'N/A').toUpperCase()}
                            {' | '}
                            Seller: {item.user.username}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};