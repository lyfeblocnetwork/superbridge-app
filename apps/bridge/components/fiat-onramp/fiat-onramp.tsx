import { useConnectModal } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import { P, match } from "ts-pattern";
import { useAccount } from "wagmi";

import { OnrampQuoteProvider } from "@/codegen/model";
import { currencySymbolMap } from "@/constants/currency-symbol-map";
import { useFiatOnrampQuote } from "@/hooks/fiat-onramp/use-fiat-onramp-quote";
import { useFiatState } from "@/hooks/fiat-onramp/use-fiat-state";
import { useModal } from "@/hooks/use-modal";
import { useTokenPrice } from "@/hooks/use-prices";
import { useTrackEvent } from "@/services/ga";
import { useConfigState } from "@/state/config";
import { useFiatOnrampState } from "@/state/fiat-onramp";
import { useSettingsState } from "@/state/settings";
import { formatDecimals } from "@/utils/format-decimals";
import {
  isOnrampQuote,
  isOnrampQuoteAmountTooLargeError,
  isOnrampQuoteGenericError,
} from "@/utils/onramp-guards";

import { AnimateChangeInHeight } from "../animate-height";
import { IconCaretDown } from "../icons";
import { NetworkIcon } from "../network-icon";
import { TokenIcon } from "../token-icon";
import { Button } from "../ui/button";
import { FiatOnrampQuotePreview } from "./fiat-onramp-quote-preview";

export const FiatOnramp = () => {
  const account = useAccount();
  const connectModal = useConnectModal();
  const fiatCurrency = useSettingsState.useCurrency();
  const amount = useFiatOnrampState.useAmount();
  const setAmount = useFiatOnrampState.useSetAmount();
  const fiatInput = useFiatOnrampState.useFiatInput();
  const setFiatInput = useFiatOnrampState.useSetFiatInput();
  const trackEvent = useTrackEvent();

  const tokenSelectorModal = useModal("FiatOnrampTokenSelector");

  const setDisplayFiatNetworkSelector =
    useConfigState.useSetDisplayFiatNetworkSelector();

  const { availableAssets, asset, chain } = useFiatState();

  const price = useTokenPrice(asset);
  const quote = useFiatOnrampQuote();

  const onClick = () => {
    if (!account.address) {
      connectModal.openConnectModal?.();
      return;
    }

    if (!quote.data) {
      return;
    }

    if (!isOnrampQuote(quote.data.result)) {
      return;
    }

    trackEvent({
      event: "onramp-purchase",
      amount: quote.data.result.tokenAmount.toString(),
      network: chain.name,
      symbol: asset.symbol,
      provider: quote.data.id,
    });

    if (
      quote.data.id === OnrampQuoteProvider.Moonpay &&
      quote.data.result.moonPay
    ) {
      const params = new URLSearchParams();

      params.set("currencyCode", quote.data.result.moonPay.currencyCode!);
      params.set("baseCurrencyCode", fiatCurrency);
      params.set("walletAddress", account.address ?? "");

      if (fiatInput) {
        params.set("baseCurrencyAmount", quote.data.result.fiatAmount);
      } else {
        params.set("quoteCurrencyAmount", quote.data.result.tokenAmount);
      }

      window.open(
        `https://buy.moonpay.com?apiKey=pk_live_aPFIe7Yed2t3C2AeYtOUShkT9bNUfB&${params.toString()}`,
        "_blank"
      );
    }
  };

  const button = match({
    account: account.address,
    quote: quote.data,
    isLoading: quote.isLoading,
    amount,
  })
    .with({ account: undefined }, () => ({
      label: "Connect",
      onClick: () => connectModal.openConnectModal?.(),
      disabled: false,
    }))
    .with({ isLoading: true }, { amount: "" }, () => ({
      label: "Continue",
      onClick: () => {},
      disabled: true,
    }))
    .when(
      (x) => !parseFloat(x.amount),
      () => ({
        label: "Continue",
        onClick: () => {},
        disabled: true,
      })
    )
    .with({ quote: undefined }, () => ({
      label: "No quotes found",
      onClick: () => {},
      disabled: true,
    }))
    .with({ quote: P.not(undefined) }, ({ quote }) => {
      if (isOnrampQuote(quote.result)) {
        return {
          label: "Continue",
          onClick,
          disabled: false,
        };
      }

      return {
        label: isOnrampQuoteGenericError(quote.result)
          ? quote.result.error
          : isOnrampQuoteAmountTooLargeError(quote.result)
            ? "Amount too large"
            : "Amount too small",
        onClick: () => {},
        disabled: true,
      };
    })
    .exhaustive();

  const parsedAmount = parseFloat(amount);

  const toggleFiatInput = () => {
    if (!price) return;
    if (fiatInput) {
      setAmount(formatDecimals(parsedAmount / price));
    } else {
      setAmount((parsedAmount * price).toFixed(2));
    }

    setFiatInput(!fiatInput);
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <div className="flex flex-col gap-1.5">
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

        <div
          className={`flex flex-col gap-2.5 relative rounded-2xl px-4 py-5 border border-transparent focus-within:border-border transition-colors bg-muted `}
        >
          <div className="flex gap-2 items-center">
            <div className="flex items-center">
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
            </div>
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
                  className="text-muted-foreground text-xs leading-none cursor-pointer"
                >
                  {fiatInput ? (
                    <>
                      {!!parsedAmount
                        ? formatDecimals(parsedAmount / price)
                        : "0"}{" "}
                      {asset.symbol}
                    </>
                  ) : (
                    <>
                      {currencySymbolMap[fiatCurrency]}
                      {!!parsedAmount
                        ? formatDecimals(parsedAmount * price)
                        : 0}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimateChangeInHeight>
        <FiatOnrampQuotePreview key={"route-preview"} />
      </AnimateChangeInHeight>
      <div className="flex flex-col pb-0.5">
        <Button
          disabled={button.disabled}
          onClick={button.onClick}
          className="hover:scale-[1.02]"
        >
          {button.label}
        </Button>
      </div>
    </div>
  );
};
