import { Address, isAddressEqual } from "viem";

import { useConfigState } from "@/state/config";
import { isEth } from "@/utils/tokens/is-eth";

import { useFromChain, useToChain } from "../use-chain";
import { useDefaultRoute } from "../use-metadata";
import { useActiveTokens } from "./use-active-tokens";

export const useMultichainToken = () => {
  const tokens = useActiveTokens();
  const token = useConfigState.useToken();
  const to = useToChain();
  const from = useFromChain();
  const defaultRoute = useDefaultRoute();

  if (!token) {
    if (
      defaultRoute &&
      defaultRoute.fromChainId === from?.id &&
      defaultRoute.toChainId === to?.id
    ) {
      let t = tokens.data?.find(
        (x) =>
          x[defaultRoute.fromChainId] &&
          x[defaultRoute.toChainId] &&
          isAddressEqual(
            x[defaultRoute.fromChainId]!.address as Address,
            defaultRoute.tokenAddress as Address
          )
      );
      if (t) return t;
    }

    return (
      tokens.data?.find(
        (x) => isEth(x[from?.id ?? 0] ?? null) || isEth(x[to?.id ?? 0] ?? null)
      ) ||
      tokens.data?.[0] ||
      null
    );
  }

  const fullMatch = tokens.data?.find((x) => {
    const potentialFrom = x[from?.id ?? 0]?.address;
    const potentialTo = x[to?.id ?? 0]?.address;

    const selectedFrom = token?.[from?.id ?? 0]?.address;
    const selectedTo = token?.[to?.id ?? 0]?.address;

    // full match
    if (
      selectedFrom &&
      selectedTo &&
      potentialFrom &&
      potentialTo &&
      isAddressEqual(potentialFrom as Address, selectedFrom as Address) &&
      isAddressEqual(potentialTo as Address, selectedTo as Address)
    ) {
      return x;
    }
  });

  if (fullMatch) {
    return fullMatch;
  }

  const partialMatch = tokens.data?.find((x) => {
    const potentialFrom = x[from?.id ?? 0]?.address;
    const potentialTo = x[to?.id ?? 0]?.address;

    const selectedFrom = token?.[from?.id ?? 0]?.address;
    const selectedTo = token?.[to?.id ?? 0]?.address;

    // partial match, like in the case of switching USDC -> USDC.e
    if (
      selectedFrom &&
      potentialFrom &&
      selectedTo &&
      potentialTo &&
      isAddressEqual(potentialFrom as Address, selectedFrom as Address)
    ) {
      return x;
    }
  });

  if (partialMatch) {
    return partialMatch;
  }

  return tokens.data?.[0] ?? null;
};

export const useSelectedToken = () => {
  const token = useMultichainToken();
  const from = useFromChain();

  if (!token) {
    return null;
  }

  return token[from?.id ?? 0] ?? null;
};

export const useDestinationToken = () => {
  const token = useMultichainToken();
  const to = useToChain();

  return token?.[to?.id ?? 0] ?? null;
};
