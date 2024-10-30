import { soneiumMinato } from "viem/chains";

import { ChainDto } from "@/codegen/model";

import { useFromChain, useToChain } from "../use-chain";

export const useHasRecipientAddressRestriction = (chain: ChainDto | null) => {
  return chain?.id === soneiumMinato.id;
};

export const useFromChainHasRecipientAddressRestriction = () => {
  const from = useFromChain();

  return from?.id === soneiumMinato.id;
};

export const useToChainHasRecipientAddressRestriction = () => {
  const to = useToChain();

  return to?.id === soneiumMinato.id;
};

export const useRouteHasRecipientAddressRestriction = () => {
  const from = useFromChainHasRecipientAddressRestriction();
  const to = useToChainHasRecipientAddressRestriction();

  return from || to;
};

export const useDirectionHasRecipientAddressRestriction = () => {
  const from = useFromChainHasRecipientAddressRestriction();
  const to = useToChainHasRecipientAddressRestriction();

  if (from) return "from";
  if (to) return "to";
  return null;
};

export const useChainWithRecipientAddressRestriction = () => {
  const fromChain = useFromChain();
  const toChain = useToChain();
  const from = useFromChainHasRecipientAddressRestriction();
  const to = useToChainHasRecipientAddressRestriction();

  if (from) return fromChain;
  if (to) return toChain;
  return null;
};
