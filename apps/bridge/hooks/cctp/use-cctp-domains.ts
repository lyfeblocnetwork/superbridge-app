import { useMemo } from "react";

import { useInjectedStore } from "@/state/injected";

import { useIsSuperbridge } from "../apps/use-is-superbridge";
import { useAllChains } from "../use-chains";

export const useCctpDomains = () => {
  const superbridgeTestnets = useInjectedStore((s) => s.superbridgeTestnets);
  const allCctpDomains = useInjectedStore((s) => s.cctpDomains);
  const isSuperbridge = useIsSuperbridge();
  const allChains = useAllChains();

  return useMemo(() => {
    if (isSuperbridge) {
      if (superbridgeTestnets) {
        return allCctpDomains.filter(
          (x) => allChains.find((c) => c.id === x.chainId)?.testnet
        );
      } else {
        return allCctpDomains.filter(
          (x) => !allChains.find((c) => c.id === x.chainId)?.testnet
        );
      }
    } else {
      return allCctpDomains;
    }
  }, [superbridgeTestnets, allCctpDomains, allChains]);
};
