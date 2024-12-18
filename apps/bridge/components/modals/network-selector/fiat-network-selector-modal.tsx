import { ChainDto } from "@/codegen/model";
import { useFiatState } from "@/hooks/fiat-onramp/use-fiat-state";
import { useConfigState } from "@/state/config";
import { useFiatOnrampState } from "@/state/fiat-onramp";

import { NetworkSelector } from "./network-selector";

export const FiatNetworkSelectorModal = () => {
  const { availableChains } = useFiatState();

  const setChainId = useFiatOnrampState.useSetChainId();
  const setDisplayFiatNetworkSelector =
    useConfigState.useSetDisplayFiatNetworkSelector();

  const onSelect = (chain: ChainDto) => {
    setChainId(chain.id);

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
