import { useTranslation } from "react-i18next";

import { useTxAmount } from "@/hooks/activity/use-tx-amount";
import { useTxCctpDomains } from "@/hooks/activity/use-tx-cctp-domains";
import { useTxMultichainToken } from "@/hooks/activity/use-tx-token";
import { usePendingTransactions } from "@/state/pending-txs";
import { Transaction } from "@/types/transaction";

import { isCctpBridge } from "../../utils/guards";
import { useTxFromTo } from "../activity/use-tx-from-to";
import {
  ActivityStep,
  ButtonComponent,
  TransactionStep,
  buildWaitStep,
} from "./common";

export const useCctpProgressRows = (
  tx: Transaction | null
): ActivityStep[] | null => {
  const { t } = useTranslation();
  const pendingFinalises = usePendingTransactions.usePendingFinalises();
  const domains = useTxCctpDomains(tx);
  const token = useTxMultichainToken(tx);
  const amount = useTxAmount(tx, token?.[domains?.from.chainId ?? 0]);
  const chains = useTxFromTo(tx);

  if (!tx || !isCctpBridge(tx) || !domains) {
    return null;
  }
  const pendingFinalise = pendingFinalises[tx?.id ?? ""];

  const burn: TransactionStep = {
    label: t("confirmationModal.startBridgeOn", {
      from: chains?.from.name,
    }),
    hash: tx.bridge.timestamp ? tx.bridge.transactionHash : undefined,
    pendingHash: tx.bridge.timestamp ? undefined : tx.bridge.transactionHash,
    chain: tx.from,
    button: undefined,
    token,
    amount,
  };

  const mint: TransactionStep =
    tx.bridge.timestamp + domains.from.duration < Date.now() && !tx.relay
      ? {
          label: t("confirmationModal.getAmountOn", {
            to: chains?.to.name,
            formatted: amount?.text,
          }),
          button: {
            type: ButtonComponent.Mint,
            enabled: true,
          },
          pendingHash: pendingFinalise,
          hash: undefined,
          chain: tx.to,
          gasLimit: BigInt(300_000),
          token,
          amount,
        }
      : {
          label: t("confirmationModal.getAmountOn", {
            to: chains?.to.name,
            formatted: amount?.text,
          }),
          hash: tx.relay?.transactionHash,
          pendingHash: pendingFinalise,
          chain: tx.to,
          button: {
            type: ButtonComponent.Mint,
            enabled: false,
          },
          gasLimit: tx.relay ? undefined : BigInt(300_000),
          token,
          amount,
        };

  return [
    burn,
    buildWaitStep(
      tx.bridge.timestamp,
      tx.relay?.timestamp,
      domains.from.duration
    ),
    mint,
  ];
};
