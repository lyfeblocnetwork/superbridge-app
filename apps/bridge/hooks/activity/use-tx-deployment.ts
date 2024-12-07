import { Transaction } from "@/types/transaction";
import {
  isAcrossBridge,
  isCcipBridge,
  isCctpBridge,
  isForcedWithdrawal,
  isHyperlaneBridge,
  isLzBridge,
} from "@/utils/guards";

import { useDeploymentById } from "../deployments/use-deployment-by-id";

export const useTxDeployment = (tx: Transaction | undefined | null) => {
  return (
    useDeploymentById(
      !tx ||
        isAcrossBridge(tx) ||
        isCctpBridge(tx) ||
        isHyperlaneBridge(tx) ||
        isLzBridge(tx) ||
        isCcipBridge(tx)
        ? ""
        : isForcedWithdrawal(tx)
          ? tx.deposit.deploymentId
          : tx.deploymentId
    ) ?? null
  );
};
