import { useEffect } from "react";
import { useAccountEffect } from "wagmi";

import { useConfigState } from "@/state/config";
import { usePendingTransactions } from "@/state/pending-txs";
import { isOptimism } from "@/utils/deployments/is-mainnet";

import { useDeployment } from "../deployments/use-deployment";
import { useActivityEffects } from "../use-activity-effects";
import { useIsContractAccount } from "../use-is-contract-account";
import { useInitialiseQueryParams } from "./use-initialise-query-params";
import { useInitialiseRecipient } from "./use-initialise-recipient";

export const useInitialise = () => {
  const isContractAccount = useIsContractAccount();

  const deployment = useDeployment();
  const setForceViaL1 = useConfigState.useSetForceViaL1();
  const clearPendingTransactionsStorage = usePendingTransactions.useLogout();

  useInitialiseRecipient();
  useActivityEffects();
  useInitialiseQueryParams();

  useAccountEffect({
    onDisconnect: () => {
      clearPendingTransactionsStorage();
    },
  });

  useEffect(() => {
    if (isContractAccount === true) {
      setForceViaL1(false);
    }
  }, [isContractAccount]);

  // reset settings when changing deployment
  useEffect(() => {
    if (!deployment) {
      setForceViaL1(false);
      return;
    }

    if (!isOptimism(deployment)) {
      setForceViaL1(false);
      return;
    }
  }, [deployment]);
};
