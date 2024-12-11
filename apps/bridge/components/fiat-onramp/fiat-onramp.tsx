import clsx from "clsx";
import { useState } from "react";
import { useAccount } from "wagmi";

import {
  useOnrampControllerGetQuotes,
  useOnrampControllerGetSupportedAssets,
} from "@/codegen/index";
import {
  BridgeableTokenDto,
  ChainDto,
  OnrampQuote,
  OnrampQuoteProvider,
} from "@/codegen/model";
import { currencySymbolMap } from "@/constants/currency-symbol-map";
import { useFiatState } from "@/hooks/fiat-onramp/use-fiat-state";
import { useAllTokens } from "@/hooks/tokens";
import { useAllChains } from "@/hooks/use-chains";
import { useHost } from "@/hooks/use-metadata";
import { useModal } from "@/hooks/use-modal";
import { useTokenPrice } from "@/hooks/use-prices";
import { useConfigState } from "@/state/config";
import { useFiatOnrampState } from "@/state/fiat-onramp";
import { useSettingsState } from "@/state/settings";

import { IconCaretDown } from "../icons";
import { NetworkIcon } from "../network-icon";
import { TokenIcon } from "../token-icon";

const deduplicateChains = (array: ChainDto[]): ChainDto[] => {
  const seen = new Map<string, ChainDto>();

  array.forEach((item) => {
    if (!seen.has(item.id.toString())) {
      seen.set(item.id.toString(), item);
    }
  });

  return Array.from(seen.values());
};

const deduplicateTokens = (
  array: BridgeableTokenDto[]
): BridgeableTokenDto[] => {
  const seen = new Map<string, BridgeableTokenDto>();

  array.forEach((item) => {
    const key = `${item.chainId}-${item.address}`;
    if (!seen.has(key)) {
      seen.set(key, item);
    }
  });

  return Array.from(seen.values());
};

export const FiatOnramp = () => {
  const account = useAccount();
  const supportedAssets = useOnrampControllerGetSupportedAssets(useHost());
  const tokens = useAllTokens();
  const chains = useAllChains();
  const fiatCurrency = useSettingsState.useCurrency();

  const tokenSelectorModal = useModal("FiatOnrampTokenSelector");

  const [fiatInput, setFiatInput] = useState(true);
  const [amount, setAmount] = useState("100");

  const setDisplayFiatNetworkSelector =
    useConfigState.useSetDisplayFiatNetworkSelector();
  const setChainId = useFiatOnrampState.useSetChainId();
  const setAssetAddress = useFiatOnrampState.useSetTokenAddress();

  const { availableChains, availableAssets, asset, chain } = useFiatState();

  const quotes = useOnrampControllerGetQuotes(useHost(), {
    chainId: chain?.id.toString() ?? "",
    fiatCurrency: fiatCurrency,
    tokenAddress: asset?.address ?? "",

    tokenAmount: fiatInput ? undefined : amount,
    fiatAmount: fiatInput ? amount : undefined,
  });

  const price = useTokenPrice(asset);

  const onClick = (quote: OnrampQuote) => {
    if (!account.address) {
      alert("Connect your wallet first");
      return;
    }

    if (quote.provider === OnrampQuoteProvider.Moonpay && quote.moonPay) {
      const params = new URLSearchParams();

      params.set("currencyCode", quote.moonPay.currencyCode!);
      params.set("baseCurrencyCode", fiatCurrency);
      params.set("walletAddress", account.address ?? "");
      params.set("quoteCurrencyAmount", quote.tokenAmount);

      window.open(
        `https://buy-sandbox.moonpay.com/?apiKey=pk_test_4WY3QxXnV2qsv61LAfrKonwGmSyorg&${params.toString()}`,
        "_blank"
      );
    }
  };

  const toggleFiatInput = () => {
    if (!price) return;
    if (fiatInput) {
      setAmount((parseFloat(amount) / price).toString());
    } else {
      setAmount((parseFloat(amount) * price).toString());
    }

    setFiatInput((b) => !b);
  };

  return (
    <div className="flex flex-col gap-1 px-4 py-4">
      <div
        className={clsx(
          "flex gap-2 w-full items-start md:items-end bg-muted p-4 rounded-xl transition-all",
          "cursor-pointer hover:scale-[1.02]"
        )}
        onClick={() => setDisplayFiatNetworkSelector(true)}
      >
        <NetworkIcon
          chain={chain}
          width={32}
          height={32}
          className="pointer-events-none rounded-sm"
        />
        <div className="flex flex-col gap-0.5">
          <span
            className={`text-muted-foreground text-xs leading-none block mt-0.5`}
          >
            Buy on
          </span>
          <span className="leading-none  font-button">{chain?.name}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5"></div>

      <div
        className={`flex flex-col gap-2.5 relative rounded-2xl px-4 py-5 border border-transparent focus-within:border-border transition-colors bg-muted `}
      >
        <div className="flex gap-2 items-center">
          {fiatInput ? (
            <span className="text-4xl leading-none placeholder:text-muted-foreground text-foreground">
              {currencySymbolMap[fiatCurrency]}
            </span>
          ) : null}
          <input
            value={amount}
            onChange={(e) => {
              const parsed = e.target.value.replaceAll(",", ".");
              setAmount(parsed);
            }}
            type="text"
            inputMode="decimal"
            minLength={1}
            maxLength={79}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            pattern="^[0-9]*[.,]?[0-9]*$"
            name="amount"
            id="amount"
            className={`block w-full shadow-none bg-transparent focus:outline-none text-4xl leading-none placeholder:text-muted-foreground text-foreground`}
            placeholder="0"
          />
          {availableAssets.length === 1 ? (
            <div
              className={`flex shrink-0 relative gap-1 rounded-full py-2 pl-3 pr-4 items-center font-button transition-all text-foreground bg-card`}
            >
              <TokenIcon
                token={asset}
                className="h-[20px] w-[20px] shrink-0 !text-[6px]"
              />
              {asset?.symbol}
            </div>
          ) : (
            <button
              onClick={() => tokenSelectorModal.open()}
              className={`flex shrink-0 relative gap-1 rounded-full py-2 pl-3 pr-3 items-center font-button transition-all hover:scale-105 text-foreground bg-card`}
            >
              <TokenIcon
                token={asset}
                className="h-[20px] w-[20px] shrink-0 !text-[6px]"
              />
              {asset?.symbol}
              <IconCaretDown className="w-3.5 h-3.5 fill-foreground" />
            </button>
          )}
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {price && (
              <div
                onClick={toggleFiatInput}
                className="text-muted-foreground text-xs leading-none"
              >
                {fiatInput ? (
                  <>
                    {parseInt(amount || "0") / price} {asset.symbol}
                  </>
                ) : (
                  <>
                    {parseInt(amount || "0") * price} {fiatCurrency}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        {quotes.isFetching ? (
          <div>Loading</div>
        ) : !quotes.data?.data.results.length ? (
          <div>No quotes</div>
        ) : (
          <div>
            {quotes.data?.data.results.map((quote) => (
              <div
                className="p-4 cursor-pointer"
                onClick={() => onClick(quote)}
              >
                <div>{quote.provider}</div>
                <div>
                  {quote.tokenAmount} {asset.symbol}
                </div>
                <div>
                  {quote.fiatAmount} {quote.fiatCurrency}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
