import { useMemo } from "react";

import { useInjectedStore } from "@/state/injected";

import { useIsSuperbridge } from "../apps/use-is-superbridge";
import { useAllChains } from "../use-chains";

export const useAcrossDomains = () => {
  const superbridgeTestnets = useInjectedStore((s) => s.superbridgeTestnets);
  const domains = useInjectedStore((s) => s.acrossDomains);
  const isSuperbridge = useIsSuperbridge();
  const allChains = useAllChains();

  return useMemo(() => {
    if (isSuperbridge) {
      if (superbridgeTestnets) {
        return domains.filter(
          (x) => allChains.find((c) => c.id === x.chainId)?.testnet
        );
      } else {
        return domains.filter(
          (x) => !allChains.find((c) => c.id === x.chainId)?.testnet
        );
      }
    } else {
      return domains;
    }
  }, [superbridgeTestnets, domains, allChains]);
};
