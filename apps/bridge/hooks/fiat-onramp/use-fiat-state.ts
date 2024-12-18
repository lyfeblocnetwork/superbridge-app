import { useMemo } from "react";
import { isPresent } from "ts-is-present";
import { Address, isAddressEqual } from "viem";

import { useOnrampControllerGetSupportedAssets } from "@/codegen/index";
import { BridgeableTokenDto, ChainDto } from "@/codegen/model";
import { useAllTokens } from "@/hooks/tokens";
import { useAllChains } from "@/hooks/use-chains";
import { useHost } from "@/hooks/use-metadata";
import { useFiatOnrampState } from "@/state/fiat-onramp";

const deduplicateChains = (array: ChainDto[]): ChainDto[] => {
  const seen = new Map<string, ChainDto>();

  array.forEach((item) => {
    if (!seen.has(item.id.toString())) {
      seen.set(item.id.toString(), item);
    }
  });

  return Array.from(seen.values());
};

const deduplicateTokens = (
  array: BridgeableTokenDto[]
): BridgeableTokenDto[] => {
  const seen = new Map<string, BridgeableTokenDto>();

  array.forEach((item) => {
    const key = `${item.chainId}-${item.address}`;
    if (!seen.has(key)) {
      seen.set(key, item);
    }
  });

  return Array.from(seen.values());
};

export const useFiatState = () => {
  const supportedAssets = useOnrampControllerGetSupportedAssets(useHost());
  const tokens = useAllTokens();
  const chains = useAllChains();

  const chainId = useFiatOnrampState.useChainId();
  const assetAddress = useFiatOnrampState.useTokenAddress();

  return useMemo(() => {
    const availableChains = deduplicateChains(
      (supportedAssets.data?.data.assets ?? [])
        .map((a) => chains.find((x) => x.id === a.chainId))
        .filter(isPresent)
    );

    const chain: ChainDto | undefined =
      availableChains.find((x) => x.id === chainId) || availableChains[0];

    const availableAssets = deduplicateTokens(
      (supportedAssets.data?.data.assets ?? [])
        .map((a) => {
          if (!chain) return null;

          const t = tokens.data.find(
            (t) =>
              t[chain.id]?.address &&
              isAddressEqual(
                t[chain.id]!.address as Address,
                a.address as Address
              )
          );

          return t?.[chain.id];
        })
        .filter(isPresent)
    );

    const asset: BridgeableTokenDto | undefined =
      availableAssets.find((x) => x.address === assetAddress) ||
      availableAssets[0];

    return {
      availableAssets,
      availableChains,
      chain,
      asset,
      assetAddress,
      chainId,
    };
  }, [chains, tokens.data, supportedAssets.data?.data, chainId, assetAddress]);
};
