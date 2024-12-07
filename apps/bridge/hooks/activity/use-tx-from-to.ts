import { Transaction } from "@/types/transaction";
import {
  isAcrossBridge,
  isCcipBridge,
  isCctpBridge,
  isDeposit,
  isForcedWithdrawal,
  isHyperlaneBridge,
  isLzBridge,
  isWithdrawal,
} from "@/utils/guards";

import { useCcipDomains } from "../ccip/use-ccip-domains";
import { useDeployments } from "../deployments/use-deployments";
import { useHyperlaneMailboxes } from "../hyperlane/use-hyperlane-mailboxes";
import { useLzDomains } from "../lz/use-lz-domains";
import { useChain } from "../use-chain";

export const useTxFromTo = (tx: Transaction | undefined | null) => {
  const deployments = useDeployments();
  const hyperlaneMailboxes = useHyperlaneMailboxes();
  const lzDomains = useLzDomains();
  const ccipDomains = useCcipDomains();

  let fromChainId = 0;
  let toChainId = 0;

  if (tx && isForcedWithdrawal(tx)) {
    const deployment = deployments.find(
      (d) => tx.deposit.deploymentId === d.id
    )!;
    fromChainId = deployment.l2ChainId;
    toChainId = deployment.l1ChainId;
  }

  if (tx && isCctpBridge(tx)) {
    fromChainId = tx.fromChainId;
    toChainId = tx.toChainId;
  }

  if (tx && isAcrossBridge(tx)) {
    fromChainId = tx.fromChainId;
    toChainId = tx.toChainId;
  }

  if (tx && isHyperlaneBridge(tx)) {
    fromChainId =
      hyperlaneMailboxes.find((x) => x.domain === tx.fromDomain)?.chainId ?? 0;
    toChainId =
      hyperlaneMailboxes.find((x) => x.domain === tx.toDomain)?.chainId ?? 0;
  }

  if (tx && isLzBridge(tx)) {
    fromChainId = lzDomains.find((x) => x.eId === tx.fromEid)?.chainId ?? 0;
    toChainId = lzDomains.find((x) => x.eId === tx.toEid)?.chainId ?? 0;
  }

  if (tx && isCcipBridge(tx)) {
    fromChainId =
      ccipDomains.find((x) => x.selector === tx.fromSelector)?.chainId ?? 0;
    toChainId =
      ccipDomains.find((x) => x.selector === tx.toSelector)?.chainId ?? 0;
  }

  if (tx && isDeposit(tx)) {
    const deployment = deployments.find((d) => tx?.deploymentId === d.id);
    fromChainId = deployment?.l1ChainId ?? 0;
    toChainId = deployment?.l2ChainId ?? 0;
  }

  if (tx && isWithdrawal(tx)) {
    const deployment = deployments.find((d) => tx?.deploymentId === d.id);
    fromChainId = deployment?.l2ChainId ?? 0;
    toChainId = deployment?.l1ChainId ?? 0;
  }

  const from = useChain(fromChainId);
  const to = useChain(toChainId);

  if (!from || !to) {
    return null;
  }

  return { from, to };
};
