import { useBridgeControllerGetFinaliseTransaction } from "@/codegen";
import { BridgeWithdrawalDto } from "@/codegen/model";
import { useTrackEvent } from "@/services/ga";
import { usePendingTransactions } from "@/state/pending-txs";

import { useChainsForDeployment } from "../deployments/use-deployment-chains";
import { useSendTransactionDto } from "../use-send-transaction-dto";

export function useFinaliseOptimism(w: BridgeWithdrawalDto | undefined) {
  const chains = useChainsForDeployment(w?.deploymentId);
  const setFinalising = usePendingTransactions.useSetFinalising();
  const getFinaliseTransaction = useBridgeControllerGetFinaliseTransaction();
  const trackEvent = useTrackEvent();

  const { loading, onSubmit } = useSendTransactionDto(chains?.l1, () => {
    if (!w) throw new Error("");
    return getFinaliseTransaction.mutateAsync({
      data: { id: w.id },
    });
  });

  const onFinalise = async () => {
    if (!w) return;

    const hash = await onSubmit();
    if (hash) {
      trackEvent({
        event: "finalize-withdrawal",
        network: chains?.l1.name ?? "",
        originNetwork: chains?.l2.name ?? "",
        withdrawalTransactionHash: w.withdrawal.transactionHash,
      });
      setFinalising(w.id, hash);
    }
  };

  return {
    onFinalise,
    loading,
  };
}
