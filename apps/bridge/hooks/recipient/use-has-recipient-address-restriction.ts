import { ChainDto } from "@/codegen/model";

import { useFromChain, useToChain } from "../use-chain";

export const useHasRecipientAddressRestriction = (chain: ChainDto | null) => {
  return chain?.name.toLowerCase().includes("soneium");
};

export const useFromChainHasRecipientAddressRestriction = () => {
  return useHasRecipientAddressRestriction(useFromChain());
};

export const useToChainHasRecipientAddressRestriction = () => {
  return useHasRecipientAddressRestriction(useToChain());
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
  const from = useFromChainHasRecipientAddressRestriction();
  const to = useToChainHasRecipientAddressRestriction();

  if (from) return from;
  if (to) return to;
  return null;
};
