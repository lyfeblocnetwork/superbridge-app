import { useMemo } from "react";

import { ChainDto } from "@/codegen/model";
import { useInjectedStore } from "@/state/injected";

import { useIsSuperbridge } from "./apps/use-is-superbridge";
import { useHyperlaneCustomRoutes } from "./hyperlane/use-hyperlane-custom-routes";

export const useAllChains = () => {
  const injectedChains = useInjectedStore((s) => s.chains);
  const customHyperlaneRoutes = useHyperlaneCustomRoutes();

  return useMemo(() => {
    const cache: { [chainId: number]: ChainDto } = {};

    for (const chain of [
      ...injectedChains,
      ...(customHyperlaneRoutes?.chains ?? []),
    ]) {
      cache[chain.id] = chain;
    }

    return Object.values(cache);
  }, [injectedChains, customHyperlaneRoutes]);
};

export const useChains = () => {
  const allChains = useAllChains();
  const isSuperbridge = useIsSuperbridge();

  const superbridgeTestnetsEnabled = useInjectedStore(
    (s) => s.superbridgeTestnets
  );

  return useMemo(() => {
    if (isSuperbridge) {
      if (superbridgeTestnetsEnabled) return allChains.filter((c) => c.testnet);
      else return allChains.filter((c) => !c.testnet);
    }
    return allChains;
  }, [allChains, superbridgeTestnetsEnabled]);
};
