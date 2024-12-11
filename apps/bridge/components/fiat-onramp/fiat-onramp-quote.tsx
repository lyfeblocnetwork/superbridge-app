import { OnrampQuote } from "@/codegen/model";
import { currencySymbolMap } from "@/constants/currency-symbol-map";
import { useFiatState } from "@/hooks/fiat-onramp/use-fiat-state";
import { useTokenPrice } from "@/hooks/use-prices";
import { useSettingsState } from "@/state/settings";
import { formatDecimals } from "@/utils/format-decimals";

import { IconSimpleFees } from "../icons";
import { NetworkIcon } from "../network-icon";
import { TokenIcon } from "../token-icon";
import { FiatOnrampProviderIcon } from "./fiat-onramp-provider-icon";

export const FiatOnrampQuote = ({ quote }: { quote: OnrampQuote }) => {
  const { chain, asset } = useFiatState();
  const currency = useSettingsState.useCurrency();

  const price = useTokenPrice(asset);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-1">
        <h3 className="text-xs font-heading leading-none">
          Get on {chain?.name}
        </h3>

        <div className="flex gap-1.5 items-center rounded-full bg-muted pl-1.5 pr-2 py-1.5">
          <div className="flex gap-1 items-center text-foreground text-xs font-body leading-none">
            <FiatOnrampProviderIcon
              provider={quote.provider}
              className="rounded-full h-4 w-4"
            />
            <span>{quote.provider}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <TokenIcon token={asset} className="h-10 w-10" />
          <NetworkIcon
            chain={chain}
            className="w-4 w-4 rounded-2xs absolute bottom-0 -right-1"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl leading-none">
            {quote.tokenAmount} {asset.symbol}
          </span>

          {!!price && (
            <span className="text-xs leading-none text-muted-foreground">
              {currencySymbolMap[currency]}
              {formatDecimals(parseFloat(quote.tokenAmount) * price)}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-3 justify-start mt-4">
        <div
          className={
            "bg-primary rounded-full py-0.5 pl-0.5 pr-1.5 flex gap-1 items-center"
          }
        >
          <IconSimpleFees
            className={
              "fill-muted-foreground group-hover:fill-foreground h-3.5 w-3.5"
            }
          />

          <span className="text-xs leading-none text-muted-foreground group-hover:text-foreground">
            {currencySymbolMap[currency]}
            {quote.fees.reduce(
              (accum, f) => accum + parseInt(f.fiat.amount || "0"),
              0
            )}{" "}
            Fee
          </span>
        </div>
      </div>
    </div>
  );
};
