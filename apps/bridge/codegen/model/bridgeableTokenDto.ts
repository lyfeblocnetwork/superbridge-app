/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * API
 * API docs
 * OpenAPI spec version: 1.0
 */
import type { HyperlaneRouterDto } from './hyperlaneRouterDto';

export interface BridgeableTokenDto {
  address: string;
  bridges: number[];
  chainId: number;
  coinGeckoId?: string;
  decimals: number;
  hyperlane?: HyperlaneRouterDto;
  logoURI: string;
  name: string;
  symbol: string;
}