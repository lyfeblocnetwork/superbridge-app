import { useTranslation } from "react-i18next";

import { useTxAmount } from "@/hooks/activity/use-tx-amount";
import { useTxMultichainToken } from "@/hooks/activity/use-tx-token";
import { useChain } from "@/hooks/use-chain";
import { Transaction } from "@/types/transaction";

import { isCcipBridge } from "../../utils/guards";
import { useTxAmountOutput } from "../activity/use-tx-amount-output";
import { useCcipDomains } from "../ccip/use-ccip-domains";
import { ActivityStep, buildWaitStep } from "./common";

export const useCcipProgressRows = (
  tx: Transaction | null
): ActivityStep[] | null => {
  const domains = useCcipDomains();
  const { t } = useTranslation();

  const fromDomain =
    tx && isCcipBridge(tx)
      ? domains.find((x) => x.selector === tx.fromSelector)
      : null;
  const toDomain =
    tx && isCcipBridge(tx)
      ? domains.find((x) => x.selector === tx.toSelector)
      : null;

  const fromChain = useChain(fromDomain?.chainId);
  const toChain = useChain(toDomain?.chainId);
  const token = useTxMultichainToken(tx);
  const inputAmount = useTxAmount(tx, token?.[fromChain?.id ?? 0]);
  const outputAmount = useTxAmountOutput(tx, token?.[toChain?.id ?? 0]);

  if (!tx || !isCcipBridge(tx) || !fromChain || !toChain) {
    return null;
  }

  return [
    {
      label: t("confirmationModal.startBridgeOn", {
        from: fromChain.name,
      }),
      hash: tx.send.timestamp ? tx.send.transactionHash : undefined,
      pendingHash: tx.send.timestamp ? undefined : tx.send.transactionHash,
      chain: fromChain,
      button: undefined,
      token,
      amount: inputAmount,
    },
    buildWaitStep(tx.send.timestamp, tx.receive?.timestamp, tx.duration),
    {
      label: t("confirmationModal.getAmountOn", {
        to: toChain.name,
        formatted: outputAmount?.text,
      }),
      hash: tx.receive?.transactionHash,
      pendingHash: undefined,
      chain: toChain,
      button: undefined,
      token,
      amount: outputAmount,
    },
  ];
};
