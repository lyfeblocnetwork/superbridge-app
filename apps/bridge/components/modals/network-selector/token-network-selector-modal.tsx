import { ChainDto } from "@/codegen/model";
import {
  useIsSuperbridgeMainnet,
  useIsSuperbridgeTestnet,
} from "@/hooks/apps/use-is-superbridge";
import { useSortedChains } from "@/hooks/network-selector/sort";
import { usePossibleFromChains } from "@/hooks/network-selector/use-possible-from-chains";
import { useGetPossibleToChains } from "@/hooks/network-selector/use-possible-to-chains";
import { useFromChain, useToChain } from "@/hooks/use-chain";
import { useTrackEvent } from "@/services/ga";
import { useConfigState } from "@/state/config";
import { useInjectedStore } from "@/state/injected";

import { NetworkSelector } from "./network-selector";

const useComingSoonChains = () => {
  const isSuperbridgeMainnet = useIsSuperbridgeMainnet();
  const isSuperbridgeTestnet = useIsSuperbridgeTestnet();

  const testnets = useInjectedStore((s) => s.superbridgeTestnets);

  const mainnetInk = {
    id: 12345678987654321,
    name: "Ink",
  };

  if (isSuperbridgeMainnet) {
    return testnets ? [] : [mainnetInk];
  }

  if (isSuperbridgeTestnet) {
    return [];
  }

  return [];
};

export const TokenNetworkSelectorModal = () => {
  const to = useToChain();
  const from = useFromChain();
  const trackEvent = useTrackEvent();

  const networkSelectorDirection = useConfigState.useNetworkSelectorDirection();
  const setDisplayTokenNetworkSelector =
    useConfigState.useSetDisplayTokenNetworkSelector();
  const setFromChainId = useInjectedStore((s) => s.setFromChainId);
  const toChainId = useInjectedStore((s) => s.toChainId);
  const setToChainId = useInjectedStore((s) => s.setToChainId);

  const possibleFrom = usePossibleFromChains();
  const getPossibleTo = useGetPossibleToChains();

  const availableChains = useSortedChains(
    networkSelectorDirection === "from" ? possibleFrom : getPossibleTo(from)
  );

  const comingSoon = useComingSoonChains();

  const onSelect = (chain: ChainDto) => {
    if (networkSelectorDirection === "from") {
      trackEvent({ event: "from-chain-select", name: chain.name });

      setFromChainId(chain.id);

      // invert
      if (chain.id === to?.id) {
        trackEvent({ event: "to-chain-select", name: from!.name });
        setToChainId(from!.id);
        return;
      }

      // handle case where no routes to toChain
      const nextToChains = getPossibleTo(chain);
      if (!nextToChains.find((x) => x.id === toChainId)) {
        const nextTo = nextToChains.find((x) => x.id !== chain.id);
        if (nextTo) {
          trackEvent({ event: "to-chain-select", name: nextTo.name });
          setToChainId(nextTo.id);
        }
      }
    }

    if (networkSelectorDirection === "to") {
      trackEvent({ event: "to-chain-select", name: chain.name });

      setToChainId(chain.id);

      // invert
      if (chain.id === from?.id) {
        trackEvent({ event: "from-chain-select", name: to!.name });
        setFromChainId(to!.id);
      }
    }

    setDisplayTokenNetworkSelector(false);
  };

  return (
    <NetworkSelector
      onClose={() => setDisplayTokenNetworkSelector(false)}
      onSelect={onSelect}
      comingSoonNetworks={comingSoon}
      networks={availableChains}
    />
  );
};
