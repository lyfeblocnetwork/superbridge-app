import { Transaction } from "@/types/transaction";
import {
  isAcrossBridge,
  isArbitrumWithdrawal,
  isCctpBridge,
  isDeposit,
  isHyperlaneBridge,
  isLzBridge,
  isOptimismWithdrawal,
} from "@/utils/guards";

import { useTxDeployment } from "./use-tx-deployment";

export const useTxDuration = (
  tx: Transaction | undefined | null
): number | undefined => {
  const deployment = useTxDeployment(tx);
  if (!tx) return undefined;
  if (isDeposit(tx)) return deployment?.depositDuration;
  if (isOptimismWithdrawal(tx))
    return (
      (deployment?.proveDuration ?? 0) + (deployment?.finalizeDuration ?? 0)
    );
  if (isArbitrumWithdrawal(tx)) return deployment?.finalizeDuration;
  if (isAcrossBridge(tx)) return tx.duration;
  if (isHyperlaneBridge(tx)) return tx.duration;
  if (isCctpBridge(tx)) return tx.duration;
  if (isLzBridge(tx)) return tx.duration;
};
