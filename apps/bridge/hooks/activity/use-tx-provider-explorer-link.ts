import { Transaction } from "@/types/transaction";
import { isHyperlaneBridge, isLzBridge } from "@/utils/guards";

export const useTxProviderExplorerLink = (
  tx: Transaction | null | undefined
) => {
  if (tx && isHyperlaneBridge(tx))
    return `https://explorer.hyperlane.xyz/message/${tx.hyperlaneMessageId}`;

  if (tx && isLzBridge(tx)) {
    return `https://layerzeroscan.com/tx/${tx.send.transactionHash}`;
  }

  return null;
};
