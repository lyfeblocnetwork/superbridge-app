import { useOnrampControllerGetQuotes } from "@/codegen/index";
import { useFiatOnrampState } from "@/state/fiat-onramp";
import { useSettingsState } from "@/state/settings";

import { useHost } from "../use-metadata";
import { useFiatState } from "./use-fiat-state";

export const useFiatOnrampQuote = () => {
  const fiatCurrency = useSettingsState.useCurrency();
  const fiatInput = useFiatOnrampState.useFiatInput();
  const amount = useFiatOnrampState.useAmount();

  const { chain, asset } = useFiatState();

  const quotes = useOnrampControllerGetQuotes(useHost(), {
    chainId: chain?.id.toString() ?? "",
    fiatCurrency: fiatCurrency,
    tokenAddress: asset?.address ?? "",

    tokenAmount: fiatInput ? undefined : amount,
    fiatAmount: fiatInput ? amount : undefined,
  });

  const quote = quotes.data?.data.results[0];

  return {
    isLoading: quotes.isFetching,
    data: quote,
  };
};
