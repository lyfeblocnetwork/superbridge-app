import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { Address } from "viem";
import { create } from "zustand";

interface FiatOnrampState {
  chainId: number | null;
  setChainId: (x: number) => void;

  tokenAddress: Address | null;
  setTokenAddress: (x: Address) => void;
}

const FiatOnrampState = create<FiatOnrampState>()((set, get) => ({
  chainId: null,
  setChainId: (chainId) => set({ chainId }),

  tokenAddress: null,
  setTokenAddress: (tokenAddress) => set({ tokenAddress }),
}));

export const useFiatOnrampState = createSelectorHooks(FiatOnrampState);
