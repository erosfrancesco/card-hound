export const baseUrl = "https://api.cardtrader.com/api/v2/";
export const apiToken = import.meta.env.VITE_CARDTRADER_API_TOKEN;

export const endpoints = {
  blueprintFromName: `${baseUrl}cardtrader/blueprints`,
  products: `${baseUrl}marketplace/products`,
  blueprint: `${baseUrl}/blueprints/`,
};

/** Resolve a relative CardTrader image URL to an absolute one. */
export function resolveImageUrl(raw?: string): string {
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${baseUrl.replace("/api/v2", "")}${raw.startsWith("/") ? raw : `/${raw}`}`;
}
