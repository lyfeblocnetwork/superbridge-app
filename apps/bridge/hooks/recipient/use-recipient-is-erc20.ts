import { Address, erc20Abi } from "viem";
import { useReadContracts } from "wagmi";

import { useFromChain, useToChain } from "../use-chain";

export const useAddressIsERC20 = (input: string) => {
  const from = useFromChain();
  const to = useToChain();

  const reads = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        functionName: "decimals",
        chainId: from?.id,
        address: input as Address,
      },
      {
        abi: erc20Abi,
        functionName: "decimals",
        chainId: to?.id,
        address: input as Address,
      },
    ],
  });

  return (
    typeof reads.data?.[0].result === "number" ||
    typeof reads.data?.[1].result === "number"
  );
};
