import { useAccount, useBalance } from "wagmi";

import { useEstimateTotalFeesInFiat } from "@/components/modals/alerts/expensive-gas-modal";
import { isSuperbridge } from "@/config/app";
import { AlertModals } from "@/constants/modal-names";
import { SUPERCHAIN_MAINNETS } from "@/constants/superbridge";
import { useToChain } from "@/hooks/use-chain";
import { useFaultProofUpgradeTime } from "@/hooks/use-fault-proof-upgrade-time";
import { useReceiveAmount } from "@/hooks/use-receive-amount";
import { useConfigState } from "@/state/config";
import { useModalsState } from "@/state/modals";
import { isCctp } from "@/utils/is-cctp";
import { isEth } from "@/utils/is-eth";

import { useDeployment } from "../use-deployment";
import { useIsWithdrawal } from "../use-withdrawing";
import { useInitiateBridge } from "./use-initiate-bridge";

export const useSubmitBridge = () => {
  const account = useAccount();
  const to = useToChain();
  const deployment = useDeployment();
  const initiateBridge = useInitiateBridge();

  const withdrawing = useIsWithdrawal();
  const stateToken = useConfigState.useToken();
  const faultProofUpgradeTime = useFaultProofUpgradeTime(deployment);
  const setAlerts = useModalsState.useSetAlerts();

  const toEthBalance = useBalance({
    address: account.address,
    chainId: to?.id,
  });

  const receive = useReceiveAmount();
  const totalFeesInFiat = useEstimateTotalFeesInFiat();
  const fiatValueBeingBridged = receive.data?.fiat?.amount ?? null;

  return () => {
    const modals: AlertModals[] = [];

    const needDestinationGasConditions = [
      withdrawing, // need to prove/finalize
      isCctp(stateToken), // need to mint
      !withdrawing && !isEth(stateToken?.[to?.id ?? 0]), // depositing an ERC20 with no gas on the destination (won't be able to do anything with it)
    ];
    if (
      needDestinationGasConditions.some((x) => x) &&
      toEthBalance.data?.value === BigInt(0)
    ) {
      modals.push(AlertModals.NoGas);
    }

    if (
      totalFeesInFiat &&
      fiatValueBeingBridged &&
      totalFeesInFiat > fiatValueBeingBridged &&
      isSuperbridge &&
      SUPERCHAIN_MAINNETS.includes(deployment?.name ?? "")
    ) {
      modals.push(AlertModals.GasExpensive);
    }

    if (faultProofUpgradeTime && withdrawing) {
      modals.push(AlertModals.FaultProofs);
    }

    if (modals.length === 0) {
      initiateBridge();
    } else {
      setAlerts(modals);
    }
  };
};