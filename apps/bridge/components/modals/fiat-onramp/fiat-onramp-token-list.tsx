import { Address } from "viem";

import { BridgeableTokenDto } from "@/codegen/model";
import { useFiatState } from "@/hooks/fiat-onramp/use-fiat-state";
import { useModal } from "@/hooks/use-modal";
import { useFiatOnrampState } from "@/state/fiat-onramp";

import { FiatOnrampToken } from "./fiat-onramp-token";

export const FiatOnrampTokenList = () => {
  const modal = useModal("FiatOnrampTokenSelector");

  const { availableAssets } = useFiatState();
  const setTokenAddress = useFiatOnrampState.useSetTokenAddress();

  const onClickToken = (t: BridgeableTokenDto) => {
    setTokenAddress(t.address as Address);
    modal.close();
  };

  return (
    <>
      <div className="overflow-y-scroll flex flex-col basis-full">
        {availableAssets.map((token) => (
          <FiatOnrampToken
            key={`${token.chainId}-${token.address}`}
            token={token}
            onClick={() => onClickToken(token)}
          />
        ))}
      </div>
    </>
  );
};
