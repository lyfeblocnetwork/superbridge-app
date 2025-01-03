import {
  arbitrum,
  avalanche,
  base,
  bsc,
  optimism,
  polygon,
  zora,
} from "viem/chains";
import { useAccount, useBytecode } from "wagmi";

import { useFromChain } from "./use-chain";

const SMART_WALLET_CODE =
  "0x363d3d373d3d363d7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc545af43d6000803e6038573d6000fd5b3d6000f3";

export const SMART_WALLET_CHAIN_IDS: number[] = [
  base.id,
  optimism.id,
  arbitrum.id,
  polygon.id,
  zora.id,
  bsc.id,
  avalanche.id,
];

export const useCode = () => {
  const from = useFromChain();
  const account = useAccount();
  return useBytecode({
    address: account.address,
    chainId: from?.id,
    query: {
      refetchInterval: 10_000,
    },
  });
};

export const useIsSmartWallet = () => {
  const code = useCode();

  return code.data === SMART_WALLET_CODE;
};

export const useIsContractAccount = () => {
  const code = useCode();

  return !!code.data;
};
