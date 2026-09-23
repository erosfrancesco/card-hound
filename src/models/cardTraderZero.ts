export interface CardTraderProduct {
    id: number;
    blueprint_id: number;
    name_en: string;
    quantity: number;
    price: {
        cents: number;
        currency: string;
        formatted: string;
    };
    description: string;
    properties_hash: {
        condition?: string;
        mtg_language?: string;
        language?: string;
        foil?: boolean;
        [key: string]: any;
    };
    expansion: {
        id: number;
        code: string;
        name_en: string;
    };
    user: {
        id: number;
        username: string;
        can_sell_via_hub: boolean;
        country_code: string;
    };
}

export interface UseCardTraderZeroOptions {
    apiToken: string;
    blueprintId: number | null;
    // Accepts a single language ('en') or an array of languages (['en', 'it'])
    languages?: string | string[];
    zeroOnly?: boolean;
}

export interface UseCardTraderZeroReturn {
    products: CardTraderProduct[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
    stats: {
        lowestPrice: number | null;
        highestPrice: number | null;
        currency: string;
        totalAvailable: number;
    };
}
