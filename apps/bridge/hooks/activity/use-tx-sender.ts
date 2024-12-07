import { Transaction } from "@/types/transaction";
import {
  isCcipBridge,
  isCctpBridge,
  isForcedWithdrawal,
  isHyperlaneBridge,
  isLzBridge,
} from "@/utils/guards";

export const useTxSender = (tx: Transaction | null | undefined) => {
  if (!tx) return null;
  if (isHyperlaneBridge(tx) || isLzBridge(tx) || isCcipBridge(tx))
    return tx.from;
  if (isCctpBridge(tx)) return tx.sender;
  if (isForcedWithdrawal(tx)) return tx.deposit.metadata.from;
  return tx.metadata.from;
};
