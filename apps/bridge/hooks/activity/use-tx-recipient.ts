import { Transaction } from "@/types/transaction";
import {
  isCcipBridge,
  isCctpBridge,
  isForcedWithdrawal,
  isHyperlaneBridge,
  isLzBridge,
} from "@/utils/guards";

export const useTxRecipient = (
  tx: Transaction | null | undefined
): string | null => {
  if (!tx) return null;
  if (isHyperlaneBridge(tx) || isLzBridge(tx) || isCcipBridge(tx)) return tx.to;
  if (isCctpBridge(tx)) return tx.recipient;
  // @ts-expect-error todo: handle this lz issue
  if (isForcedWithdrawal(tx)) return tx.deposit.metadata.to;
  // @ts-expect-error todo: handle this lz issue
  return tx.metadata.to;
};

export const getTxRecipient = useTxRecipient;
