export interface CoinHistoryResponse {
  prices: [number, number][];
}

export interface CoinMetadataResponse {
  hashing_algorithm: string;
  market_data: {
    market_cap: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_24h: number;
    total_supply: number;
    max_supply: number;
  };
}
