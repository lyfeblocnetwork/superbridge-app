import { Transaction } from "@/types/transaction";
import { isCctpBridge } from "@/utils/guards";

import { useCctpDomains } from "../cctp/use-cctp-domains";

export const useTxCctpDomains = (tx: Transaction | undefined | null) => {
  const cctpDomains = useCctpDomains();

  if (!tx || !isCctpBridge(tx)) {
    return null;
  }

  const from = cctpDomains.find((x) => x.chainId === tx.fromChainId);
  const to = cctpDomains.find((x) => x.chainId === tx.toChainId);

  if (!from || !to) {
    return null;
  }

  return { from, to };
};
