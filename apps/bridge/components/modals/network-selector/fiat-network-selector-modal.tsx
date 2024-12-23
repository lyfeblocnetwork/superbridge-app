import { ChainDto } from "@/codegen/model";
import { useFiatState } from "@/hooks/fiat-onramp/use-fiat-state";
import { useTrackEvent } from "@/services/ga";
import { useConfigState } from "@/state/config";
import { useFiatOnrampState } from "@/state/fiat-onramp";

import { NetworkSelector } from "./network-selector";

export const FiatNetworkSelectorModal = () => {
  const { availableChains } = useFiatState();
  const trackEvent = useTrackEvent();

  const setChainId = useFiatOnrampState.useSetChainId();
  const setDisplayFiatNetworkSelector =
    useConfigState.useSetDisplayFiatNetworkSelector();

  const onSelect = (chain: ChainDto) => {
    setChainId(chain.id);
    trackEvent({ event: "onramp-chain-select", name: chain.name });
    setDisplayFiatNetworkSelector(false);
  };

  return (
    <NetworkSelector
      onClose={() => setDisplayFiatNetworkSelector(false)}
      onSelect={onSelect}
      comingSoonNetworks={[]}
      networks={availableChains}
    />
  );
};
