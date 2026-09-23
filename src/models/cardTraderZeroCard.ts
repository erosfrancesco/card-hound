/**
 * Raw blueprint model structure returned by CardTrader API v2.
 */
export interface CardTraderRawBlueprint {
  id: number;
  name: string;
  version?: string;
  image_url?: string | null;
  category_id: number;
  game_id: number;
  expansion_id: number;
  category?: {
    id: number;
    name: string;
  };
  expansion?: {
    id: number;
    name: string;
    code: string;
  };
}

/**
 * Cleaned card entity model used within the React application.
 */
export interface CardModel {
  id: number;
  name: string;
  imageUrl: string;
  categoryName?: string;
  expansionName?: string;
}

/**
 * Props passed into the presentation component or hook initialization.
 */
export interface CardTraderSearchOptions {
  apiKey: string;
}