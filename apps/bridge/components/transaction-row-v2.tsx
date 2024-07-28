import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie-player";
import { useChainId } from "wagmi";

import {
  ArbitrumDepositRetryableDto,
  ArbitrumForcedWithdrawalDto,
  ArbitrumWithdrawalDto,
  BridgeWithdrawalDto,
  CctpBridgeDto,
  ForcedWithdrawalDto,
  TransactionStatus,
} from "@/codegen/model";
import { ArbitrumMessageStatus } from "@/constants/arbitrum-message-status";
import { useTxAmount } from "@/hooks/activity/use-tx-amount";
import { useTxDeployment } from "@/hooks/activity/use-tx-deployment";
import { useTxFromTo } from "@/hooks/activity/use-tx-from-to";
import { useTxProvider } from "@/hooks/activity/use-tx-provider";
import { useTxTimestamp } from "@/hooks/activity/use-tx-timestamp";
import { useTxToken } from "@/hooks/activity/use-tx-token";
import { useFinaliseArbitrum } from "@/hooks/arbitrum/use-arbitrum-finalise";
import { useRedeemArbitrum } from "@/hooks/arbitrum/use-arbitrum-redeem";
import { useMintCctp } from "@/hooks/cctp/use-cctp-mint";
import { useFinaliseOptimism } from "@/hooks/optimism/use-optimism-finalise";
import { useProveOptimism } from "@/hooks/optimism/use-optimism-prove";
import { useDeploymentById } from "@/hooks/use-deployment-by-id";
import { useSwitchChain } from "@/hooks/use-switch-chain";
import { useConfigState } from "@/state/config";
import { useModalsState } from "@/state/modals";
import { Transaction } from "@/types/transaction";
import {
  isAcrossBridge,
  isArbitrumDeposit,
  isArbitrumForcedWithdrawal,
  isArbitrumWithdrawal,
  isCctpBridge,
  isDeposit,
  isForcedWithdrawal,
  isHyperlaneBridge,
  isOptimismForcedWithdrawal,
  isOptimismWithdrawal,
  isWithdrawal,
} from "@/utils/guards";
import { isOptimism } from "@/utils/is-mainnet";
import {
  ButtonComponent,
  ExpandedItem,
  ProgressRowStatus,
} from "@/utils/progress-rows/common";

import inProgress from "../animation/loading.json";
import { MessageStatus } from "../constants";
import { NetworkIcon } from "./network-icon";
import { RouteProviderIcon } from "./route-provider-icon";
import { TokenIcon } from "./token-icon";
import { Button } from "./ui/button";

const useNextStateChangeTimestamp = (tx: Transaction) => {
  const initiatingTx = useInitiatingTx(tx);
  const deployment = useTxDeployment(tx);

  if (isOptimismWithdrawal(tx) || isOptimismForcedWithdrawal(tx)) {
    const withdrawal = isOptimismWithdrawal(tx) ? tx : tx.withdrawal;
    const status = isOptimismWithdrawal(tx) ? tx.status : tx.withdrawal?.status;
    if (!withdrawal || !status) {
      return null;
    }

    if (status === MessageStatus.STATE_ROOT_NOT_PUBLISHED) {
      return {
        description:
          !!deployment &&
          isOptimism(deployment) &&
          deployment?.contractAddresses.disputeGameFactory
            ? "Waiting for dispute game"
            : "Waiting for state root",
        timestamp: withdrawal.withdrawal.timestamp + withdrawal.proveDuration,
      };
    }

    if (withdrawal.prove && status === MessageStatus.IN_CHALLENGE_PERIOD) {
      return {
        description: "challenge period",
        timestamp: withdrawal.prove.timestamp + withdrawal.finalizeDuration,
      };
    }

    return null;
  }

  return {
    timestamp: initiatingTx.timestamp + tx.duration,
    description: "",
  };
};

const useStatus = (
  tx: Transaction
):
  | { description: string; button: string }
  | { description: string; timestamp: number }
  | null => {
  const action = useAction(tx);
  const chains = useTxFromTo(tx);
  const nextStateChangeTimestamp = useNextStateChangeTimestamp(tx);

  if (!chains) {
    return null;
  }

  if (action === "prove") {
    return {
      description: `Ready to prove on ${chains.to.name}`,
      button: "Prove",
    };
  }

  if (action === "finalize") {
    return {
      description: `Ready to finalize on ${chains.to.name}`,
      button: "Finalize",
    };
  }

  if (action === "mint") {
    return {
      description: `Ready to mint on ${chains.to.name}`,
      button: "Mint",
    };
  }

  return nextStateChangeTimestamp;
};

const ActionRow = ({ tx }: { tx: Transaction }) => {
  const status = useStatus(tx);

  if (!status) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-between">
      <span>{status.description}</span>

      {(status as any).button && (
        <button className="bg-blue-100"> Prove</button>
      )}

      {(status as any).timestamp && (status as any).timestamp > Date.now() && (
        <span className="bg-blue-100">
          ~{formatDistanceToNow((status as any).timestamp)}
        </span>
      )}
    </div>
  );
};

const Prove = ({ tx }: { tx: BridgeWithdrawalDto | ForcedWithdrawalDto }) => {
  const prove = useProveOptimism(isWithdrawal(tx) ? tx : tx.withdrawal!);
  const { t } = useTranslation();
  return (
    <Button onClick={prove.onProve} size={"sm"} disabled={prove.loading}>
      {t("buttons.prove")}
    </Button>
  );
};

const Finalise = ({
  tx,
}: {
  tx: BridgeWithdrawalDto | ForcedWithdrawalDto;
}) => {
  const finalise = useFinaliseOptimism(isWithdrawal(tx) ? tx : tx.withdrawal!);
  const { t } = useTranslation();
  return (
    <Button
      onClick={finalise.onFinalise}
      size={"sm"}
      disabled={finalise.loading}
    >
      {t("buttons.finalize")}
    </Button>
  );
};

const FinaliseArbitrum: FC<{
  tx: ArbitrumWithdrawalDto | ArbitrumForcedWithdrawalDto;
}> = ({ tx }) => {
  const finalise = useFinaliseArbitrum(
    isArbitrumWithdrawal(tx) ? tx : tx.withdrawal!
  );
  const { t } = useTranslation();
  return (
    <Button
      onClick={finalise.onFinalise}
      size={"sm"}
      disabled={finalise.loading}
    >
      {t("buttons.finalize")}
    </Button>
  );
};

const RedeemArbitrum: FC<{
  tx: ArbitrumDepositRetryableDto | ArbitrumForcedWithdrawalDto;
}> = ({ tx }) => {
  const chainId = useChainId();
  const redeem = useRedeemArbitrum(tx);
  const { t } = useTranslation();
  const switchChain = useSwitchChain();

  const deployment = useDeploymentById(
    isArbitrumForcedWithdrawal(tx) ? tx.deposit.deploymentId : tx.deploymentId
  );
  if (!deployment) {
    return null;
  }

  if (chainId === deployment.l1.id) {
    return (
      <Button className="rounded-full" onClick={redeem.write} size={"sm"}>
        {t("buttons.redeem")}
      </Button>
    );
  }
  return (
    <Button onClick={() => switchChain(deployment.l1)} size={"sm"}>
      {t("buttons.switchChain")}
    </Button>
  );
};

const MintCctp: FC<{
  tx: CctpBridgeDto;
}> = ({ tx }) => {
  const mint = useMintCctp(tx);
  const { t } = useTranslation();

  return (
    <Button onClick={mint.write} size={"sm"} disabled={mint.loading}>
      {t("buttons.mint")}
    </Button>
  );
};

const TransactionProgressRow = ({
  item,
  tx,
}: {
  item: ExpandedItem;
  tx: Transaction;
}) => {
  const Wrapper = ({ children }: any) =>
    item.link ? (
      <a href={item.link} target="_blank">
        {children}
      </a>
    ) : (
      <div>{children}</div>
    );

  return (
    <div key={item.label} className="flex items-center justify-between">
      <Wrapper>
        <div
          className={clsx(
            "flex items-center space-x-2 pl-2 pr-3 py-1 rounded-full w-fit",
            item.status === ProgressRowStatus.Done &&
              "bg-green-100 dark:bg-green-950 text-green-500 dark:text-green-400",
            item.status === ProgressRowStatus.InProgress &&
              "bg-green-500 text-white",
            item.status === ProgressRowStatus.NotDone &&
              "bg-muted text-muted-foreground",
            item.status === ProgressRowStatus.Reverted &&
              "bg-red-100 dark:bg-red-950 text-red-500 dark:text-red-400"
          )}
        >
          {item.status === ProgressRowStatus.Done ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 2"
              viewBox="0 0 59.64 59.64"
              width="14"
              height="14"
              className="fill-current"
            >
              <path
                d="M12.81 27.64c0-1.79 1.51-3.27 3.27-3.27.88 0 1.76.36 2.39 1.06l9.08 9.93 13.11-18.25c.64-.88 1.63-1.33 2.66-1.33 1.73 0 3.27 1.33 3.27 3.24 0 .67-.18 1.36-.61 1.94L30.51 42.48c-.54.79-1.48 1.33-2.45 1.33-1.12 0-2-.3-2.63-1.03L13.65 29.85c-.58-.61-.85-1.42-.85-2.21zM0 29.82c0 16.44 13.38 29.82 29.82 29.82s29.82-13.38 29.82-29.82S46.26 0 29.82 0 0 13.38 0 29.82z"
                className="cls-1"
                data-name="Layer 1"
              ></path>
            </svg>
          ) : item.status === ProgressRowStatus.InProgress ? (
            <Lottie
              animationData={inProgress}
              loop={true}
              className="w-3.5 h-3.5 scale-150"
              play
            />
          ) : item.status === ProgressRowStatus.Reverted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
              className="fill-current"
            >
              <g clipPath="url(#clip0_470_1602)">
                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1.325 8.335l2.175 2.17c.135.135.21.31.21.495 0 .385-.32.705-.71.705a.677.677 0 01-.495-.21L8.33 9.33a.472.472 0 00-.66 0l-2.175 2.165a.701.701 0 01-1.2-.495c0-.185.065-.36.2-.495l2.175-2.17c.09-.09.135-.21.135-.335 0-.12-.05-.24-.135-.33L4.495 5.495a.727.727 0 01-.2-.505c0-.39.305-.705.705-.705a.67.67 0 01.495.21l2.175 2.17c.095.09.215.135.335.135.12 0 .24-.05.325-.135l2.175-2.17a.697.697 0 01.495-.21c.415 0 .71.345.71.705 0 .19-.08.365-.21.505L9.325 7.67A.465.465 0 009.19 8c0 .12.05.24.135.335z"></path>
              </g>
              <defs>
                <clipPath id="clip0_470_1602">
                  <path fill="#fff" d="M0 0H16V16H0z"></path>
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 2"
              viewBox="0 0 59.64 59.64"
              width="14"
              height="14"
              className="fill-current opacity-25"
            >
              <path
                d="M29.82 0C13.38 0 0 13.38 0 29.82s13.38 29.82 29.82 29.82 29.82-13.38 29.82-29.82S46.26 0 29.82 0zm0 49.1c-10.63 0-19.28-8.66-19.28-19.28s8.65-19.28 19.28-19.28S49.1 19.2 49.1 29.82 40.44 49.1 29.82 49.1z"
                className="cls-1"
                data-name="Layer 1"
              ></path>
            </svg>
          )}
          <span className="text-xs ">{item.label}</span>
          {item.link && (
            // arrow
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-name="Layer 2"
              viewBox="0 0 20.88 20.88"
              width="10"
              height="10"
              className="fill-current"
            >
              <path
                d="M1.65 1.64c.41-.41.94-.69 1.56-.71L18.05 0c.73-.04 1.52.06 2.14.69s.73 1.41.69 2.14l-.92 14.83c-.02.62-.3 1.16-.71 1.56-.94.94-2.48.94-3.43 0-.49-.49-.75-1.13-.71-1.86l.54-8.71L4.13 20.17c-.94.94-2.48.94-3.43 0s-.94-2.48 0-3.43L12.22 5.23l-8.71.54a2.35 2.35 0 01-1.86-.71c-.94-.94-.94-2.48 0-3.43z"
                className="cls-1"
                data-name="Layer 1"
              ></path>
            </svg>
          )}
        </div>
      </Wrapper>

      {item.time && (
        <div className="bg-muted rounded-full  text-sm py-1 px-2 space-x-1 flex items-center whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 2"
            viewBox="0 0 59.64 59.64"
            width="16"
            height="16"
          >
            <g data-name="Layer 1">
              <circle cx="29.82" cy="29.82" r="26.25" fill="#fff"></circle>
              <path
                d="M47.35 29.82c0 .64.51 1.18 1.18 1.18h4.87c.64 0 1.18-.54 1.18-1.18s-.54-1.18-1.18-1.18h-4.87c-.67 0-1.18.51-1.18 1.18zm-2.36-8.78c.21.39.64.61 1.03.61.21 0 .42-.06.61-.15l4.21-2.42c.58-.33.76-1.06.42-1.63s-1.06-.76-1.6-.42l-4.21 2.42c-.58.33-.79 1.06-.45 1.6zm0 17.53c-.33.58-.12 1.3.45 1.63l4.21 2.42c.18.12.39.15.58.15.42 0 .82-.21 1.03-.58.33-.58.15-1.3-.42-1.63l-4.21-2.42c-.58-.33-1.3-.15-1.63.42zm-6.84-25.55c-.33.58-.12 1.3.42 1.63.21.09.39.15.61.15.39 0 .82-.21 1.03-.61l2.42-4.21c.33-.58.15-1.3-.42-1.6-.58-.33-1.3-.15-1.63.42l-2.42 4.21zm0 33.6l2.42 4.21c.21.36.64.58 1.03.58.21 0 .42-.03.61-.15.58-.33.76-1.06.42-1.63l-2.42-4.21c-.33-.54-1.06-.76-1.63-.42-.54.33-.76 1.06-.42 1.63zM17.01 9.99l2.42 4.21c.21.39.61.61 1.03.61.21 0 .39-.06.61-.15.54-.33.76-1.06.42-1.63l-2.42-4.21c-.33-.58-1.06-.76-1.63-.42-.58.3-.76 1.03-.42 1.6zm0 39.63c-.33.58-.15 1.3.42 1.63.18.12.39.15.61.15.39 0 .82-.21 1.03-.58l2.42-4.21c.33-.58.12-1.3-.42-1.63-.58-.33-1.3-.12-1.63.42l-2.42 4.21zm-2.18-23.61c-.24.94.33 1.94 1.27 2.18l11.99 3.12v22.31c0 .97.76 1.79 1.76 1.79s1.82-.76 1.82-1.76V29.89c0-.91-.73-1.73-1.63-1.79l-13.02-3.36c-.94-.21-1.94.3-2.18 1.27zm-6.45-8.57c-.33.58-.15 1.3.42 1.63l4.21 2.42c.18.09.39.15.61.15.39 0 .82-.21 1.03-.61.33-.54.12-1.27-.45-1.6l-4.21-2.42a1.16 1.16 0 00-1.6.42zm0 24.76c.21.36.61.58 1.03.58.18 0 .39-.03.58-.15l4.21-2.42c.58-.33.79-1.06.45-1.63s-1.06-.76-1.63-.42l-4.21 2.42c-.58.33-.76 1.06-.42 1.63zM5.05 29.82c0 .64.54 1.18 1.18 1.18h4.87c.67 0 1.18-.54 1.18-1.18s-.51-1.18-1.18-1.18H6.23c-.64 0-1.18.51-1.18 1.18zm-1.48 0c0-14.5 11.75-26.25 26.25-26.25s26.25 11.75 26.25 26.25-11.75 26.25-26.25 26.25S3.57 44.32 3.57 29.82zm-3.57 0c0 16.44 13.38 29.82 29.82 29.82s29.82-13.38 29.82-29.82S46.26 0 29.82 0 0 13.38 0 29.82zm29.82-17.53c.67 0 1.18-.51 1.18-1.18V6.24c0-.64-.51-1.18-1.18-1.18s-1.18.54-1.18 1.18v4.87c0 .67.51 1.18 1.18 1.18z"
                className="cls-1"
              ></path>
            </g>
          </svg>

          <div className="text-xs ">{item.time}</div>
        </div>
      )}
      {item.buttonComponent === ButtonComponent.Prove &&
        (isOptimismWithdrawal(tx) || isOptimismForcedWithdrawal(tx)) && (
          <Prove tx={tx} />
        )}
      {item.buttonComponent === ButtonComponent.Finalise &&
        (isOptimismWithdrawal(tx) || isOptimismForcedWithdrawal(tx)) && (
          <Finalise tx={tx} />
        )}
      {item.buttonComponent === ButtonComponent.Finalise &&
        (isArbitrumWithdrawal(tx) || isArbitrumForcedWithdrawal(tx)) && (
          <FinaliseArbitrum tx={tx} />
        )}
      {item.buttonComponent === ButtonComponent.Redeem &&
        (isArbitrumDeposit(tx) || isArbitrumForcedWithdrawal(tx)) && (
          <RedeemArbitrum tx={tx} />
        )}
      {item.buttonComponent === ButtonComponent.Mint && isCctpBridge(tx) && (
        <MintCctp tx={tx} />
      )}
    </div>
  );
};

const useInitiatingTx = (tx: Transaction) => {
  if (isAcrossBridge(tx)) return tx.deposit;
  if (isHyperlaneBridge(tx)) return tx.send;
  if (isDeposit(tx)) return tx.deposit;
  if (isWithdrawal(tx)) return tx.withdrawal;
  if (isForcedWithdrawal(tx)) return tx.deposit.deposit;
  return tx.bridge;
};

const useFinalisingTx = (tx: Transaction) => {
  if (isAcrossBridge(tx)) return tx.fill;
  if (isHyperlaneBridge(tx)) return tx.receive;
  if (isDeposit(tx)) return tx.relay;
  if (isWithdrawal(tx)) return tx.finalise;
  if (isForcedWithdrawal(tx)) return tx.withdrawal?.finalise;
  return tx.relay;
};

const useIsSuccessfulBridge = (tx: Transaction) => {
  const finalTx = useFinalisingTx(tx);
  return finalTx?.status === TransactionStatus.confirmed;
};

const useIsInProgress = (tx: Transaction) => {
  const finalTx = useFinalisingTx(tx);
  return !finalTx;
};

const useAction = (tx: Transaction) => {
  if (isAcrossBridge(tx) || isHyperlaneBridge(tx) || isDeposit(tx)) {
    return null;
  }

  if (isOptimismWithdrawal(tx) || isOptimismForcedWithdrawal(tx)) {
    const status = isOptimismWithdrawal(tx) ? tx.status : tx.withdrawal?.status;
    if (!status) {
      return null;
    }

    return status === MessageStatus.READY_TO_PROVE
      ? "prove"
      : status === MessageStatus.READY_FOR_RELAY
      ? "finalize"
      : null;
  }

  if (isArbitrumWithdrawal(tx)) {
    return tx.status === ArbitrumMessageStatus.CONFIRMED ? "finalize" : null;
  }

  if (isCctpBridge(tx)) {
    return tx.bridge.timestamp + tx.duration > Date.now() ? "mint" : null;
  }

  return null;
};

const useProgressBars = (
  tx: Transaction
): { status: "done" | "in-progress" | "not-started"; name: string }[] => {
  const initiatingTx = useInitiatingTx(tx);
  const finalisingTx = useFinalisingTx(tx);
  const proveTx = isOptimismWithdrawal(tx)
    ? tx.prove
    : isOptimismForcedWithdrawal(tx)
    ? tx.withdrawal?.prove
    : null;

  const bars: {
    status: "done" | "in-progress" | "not-started";
    name: string;
  }[] = [];
  if (initiatingTx.timestamp) {
    bars.push({ status: "done", name: "initiating" });
  } else {
    bars.push({ status: "in-progress", name: "initiating" });
  }

  if (proveTx) {
    if (proveTx.timestamp) {
      bars.push({ status: "done", name: "prove" });
    } else {
      bars.push({ status: "in-progress", name: "prove" });
    }
  }

  if (finalisingTx?.timestamp) {
    bars.push({ status: "done", name: "finalise" });
  } else {
    bars.push({ status: "in-progress", name: "finalise" });
  }

  return bars;
};

export const TransactionRowV2 = ({ tx }: { tx: Transaction }) => {
  const token = useTxToken(tx);

  const chains = useTxFromTo(tx);
  const openModal = useConfigState.useAddModal();
  const openActivityModal = useModalsState.useSetActivityId();
  const timestamp = useTxTimestamp(tx);
  const amount = useTxAmount(tx, token);

  const isSuccessful = useIsSuccessfulBridge(tx);
  const isInProgress = useIsInProgress(tx);
  const finalizingTx = useFinalisingTx(tx);
  const bars = useProgressBars(tx);
  const provider = useTxProvider(tx);

  return (
    <div className="flex flex-col p-6 border-b relative" key={tx.id}>
      <button
        className="border border-1"
        onClick={() => openActivityModal(tx.id)}
      >
        Open details
      </button>
      <div className="flex items-center gap-3">
        <span>Route:</span>
        <RouteProviderIcon provider={provider} />
      </div>
      <div>Initiated: {formatDistanceToNow(timestamp)} ago</div>
      <div className="flex items-center gap-3">
        <span>Token:</span>
        <TokenIcon token={token ?? null} className="h-6 w-6" />
      </div>
      <div className="flex items-center gap-3">
        <span>From:</span>
        <NetworkIcon chain={chains?.from} className="h-6 w-6" />
      </div>
      <div className="flex items-center gap-3">
        <span>To:</span>
        <NetworkIcon chain={chains?.to} className="h-6 w-6" />
      </div>
      <div>Amount: {amount}</div>

      {isSuccessful ? (
        <div>
          Bridge successful :{" "}
          {formatDistanceToNow(finalizingTx?.timestamp ?? 0)} ago
        </div>
      ) : isInProgress ? (
        <div>
          <div className="w-full flex items-center gap-2">
            {bars.map((bar) => (
              <div
                key={bar.status}
                className={clsx(
                  "w-full h-1",
                  bar.status === "done" && "bg-blue-500",
                  bar.status === "in-progress" && "bg-blue-400 animate-pulse",
                  bar.status === "not-started" && "bg-gray-500"
                )}
              ></div>
            ))}
          </div>

          <ActionRow tx={tx} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};