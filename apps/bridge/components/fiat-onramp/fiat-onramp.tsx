import { useConnectModal } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import { match } from "ts-pattern";
import { useAccount } from "wagmi";

import { OnrampQuoteProvider } from "@/codegen/model";
import { currencySymbolMap } from "@/constants/currency-symbol-map";
import { useFiatOnrampQuote } from "@/hooks/fiat-onramp/use-fiat-onramp-quote";
import { useFiatState } from "@/hooks/fiat-onramp/use-fiat-state";
import { useModal } from "@/hooks/use-modal";
import { useTokenPrice } from "@/hooks/use-prices";
import { useConfigState } from "@/state/config";
import { useFiatOnrampState } from "@/state/fiat-onramp";
import { useSettingsState } from "@/state/settings";

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

  const tokenSelectorModal = useModal("FiatOnrampTokenSelector");

  const setDisplayFiatNetworkSelector =
    useConfigState.useSetDisplayFiatNetworkSelector();

  const { availableAssets, asset, chain } = useFiatState();

  const price = useTokenPrice(asset);

  const onClick = () => {
    if (!account.address) {
      connectModal.openConnectModal?.();
      return;
    }

    if (!quote.data) {
      return;
    }

    if (
      quote.data.provider === OnrampQuoteProvider.Moonpay &&
      quote.data.moonPay
    ) {
      const params = new URLSearchParams();

      params.set("currencyCode", quote.data.moonPay.currencyCode!);
      params.set("baseCurrencyCode", fiatCurrency);
      params.set("walletAddress", account.address ?? "");
      params.set("quoteCurrencyAmount", quote.data.tokenAmount);

      window.open(
        `https://buy-sandbox.moonpay.com/?apiKey=pk_test_4WY3QxXnV2qsv61LAfrKonwGmSyorg&${params.toString()}`,
        "_blank"
      );
    }
  };

  const quote = useFiatOnrampQuote();

  const button = match({
    account: account.address,
    quote: quote.data,
    isLoading: quote.isLoading,
  })
    .with({ account: undefined }, () => ({
      label: "Connect",
      onClick: () => connectModal.openConnectModal?.(),
      disabled: false,
    }))
    .with({ isLoading: true }, () => ({
      label: "Continue",
      onClick: () => {},
      disabled: true,
    }))
    .with({ quote: undefined }, () => ({
      label: "No quotes found",
      onClick: () => {},
      disabled: true,
    }))
    .otherwise(() => ({
      label: "Continue",
      onClick,
      disabled: false,
    }));

  const toggleFiatInput = () => {
    if (!price) return;
    if (fiatInput) {
      setAmount((parseFloat(amount) / price).toString());
    } else {
      setAmount((parseFloat(amount) * price).toString());
    }

    setFiatInput(!fiatInput);
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
                className="text-muted-foreground text-xs leading-none"
              >
                {fiatInput ? (
                  <>
                    {parseInt(amount || "0") / price} {asset.symbol}
                  </>
                ) : (
                  <>
                    {currencySymbolMap[fiatCurrency]}
                    {parseInt(amount || "0") * price}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimateChangeInHeight>
        <FiatOnrampQuotePreview key={"route-preview"} />
      </AnimateChangeInHeight>

      <Button
        disabled={button.disabled}
        onClick={button.onClick}
        className="hover:scale-[1.02]"
      >
        {button.label}
      </Button>
    </div>
  );
};
