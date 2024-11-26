import { Transaction } from "@/types/transaction";
import { isAcrossBridge } from "@/utils/guards";

export const useIsAcrossExpiredAndReturnedBridge = (tx: Transaction | null) => {
  return (
    !!tx &&
    isAcrossBridge(tx) &&
    !tx.fill &&
    tx.deposit.timestamp < Date.now() - 1000 * 60 * 90
  );
};
