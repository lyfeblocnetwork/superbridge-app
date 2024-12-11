import clsx from "clsx";
import { Address, isAddressEqual } from "viem";

import { BridgeableTokenDto } from "@/codegen/model";
import { TokenIcon } from "@/components/token-icon";
import { useFiatState } from "@/hooks/fiat-onramp/use-fiat-state";

export const FiatOnrampToken = ({
  onClick,
  token,
}: {
  token: BridgeableTokenDto;
  onClick: () => void;
}) => {
  const { asset } = useFiatState();

  return (
    <div
      className={clsx(
        "flex justify-between hover:bg-muted transition cursor-pointer p-4 relative",
        asset?.address &&
          isAddressEqual(asset.address as Address, token.address as Address) &&
          "bg-muted"
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <TokenIcon token={token} className="h-8 w-8" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm font-heading">{token.name}</span>
          </div>
          <span className="text-xs  text-muted-foreground">{token.symbol}</span>
        </div>
      </div>
    </div>
  );
};
