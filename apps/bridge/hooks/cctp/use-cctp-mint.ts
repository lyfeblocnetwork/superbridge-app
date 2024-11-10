import { useBridgeControllerGetCctpMintTransactionV2 } from "@/codegen";
import { CctpBridgeDto } from "@/codegen/model";
import { useTrackEvent } from "@/services/ga";
import { usePendingTransactions } from "@/state/pending-txs";

import { useTxFromTo } from "../activity/use-tx-from-to";
import { useSendTransactionDto } from "../use-send-transaction-dto";

export function useMintCctp(tx: CctpBridgeDto) {
  const chains = useTxFromTo(tx);
  const setFinalising = usePendingTransactions.useSetFinalising();
  const finaliseTransaction = useBridgeControllerGetCctpMintTransactionV2();
  const trackEvent = useTrackEvent();

  const { loading, onSubmit } = useSendTransactionDto(chains?.to, () =>
    finaliseTransaction.mutateAsync({ data: { id: tx.id } })
  );

  const write = async () => {
    if (!chains) return;
    const hash = await onSubmit();
    if (hash) {
      trackEvent({
        event: "cctp-mint",
        burnNetwork: chains.from.name,
        network: chains.to.name,
        burnTransactionHash: tx.bridge.transactionHash,
      });
      setFinalising(tx.id, hash);
    }
  };

  return {
    write,
    loading,
  };
}
