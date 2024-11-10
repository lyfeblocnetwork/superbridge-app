import { useMemo } from "react";

import { useInjectedStore } from "@/state/injected";

import { useIsSuperbridge } from "../apps/use-is-superbridge";
import { useAllChains } from "../use-chains";
import { useAllDeployments } from "./use-all-deployments";

export const useDeployments = () => {
  const allDeployments = useAllDeployments();
  const testnets = useInjectedStore((store) => store.superbridgeTestnets);
  const isSuperbridge = useIsSuperbridge();
  const allChains = useAllChains();

  return useMemo(() => {
    if (isSuperbridge) {
      if (testnets) {
        return allDeployments.filter(
          ({ l2ChainId }) => allChains.find((x) => x.id === l2ChainId)?.testnet
        );
      } else {
        return allDeployments.filter(
          ({ l2ChainId }) => !allChains.find((x) => x.id === l2ChainId)?.testnet
        );
      }
    }
    return allDeployments;
  }, [allDeployments, testnets]);
};
