import {
  AcrossTransactionType,
  ActiveDeploymentStatus,
  AmountTooLargeRouteErrorDto,
  AmountTooSmallRouteErrorDto,
  ArbitrumDepositEthDto,
  ArbitrumDepositRetryableDto,
  ArbitrumForcedWithdrawalDto,
  ArbitrumTransactionType,
  ArbitrumWithdrawalDto,
  BridgeWithdrawalDto,
  CctpBridgeDto,
  CctpTransactionType,
  DeploymentStatus,
  DisabledRouteErrorDto,
  ForcedWithdrawalDto,
  GenericRouteErrorDto,
  OptimismTransactionType,
  PausedRouteErrorDto,
  PortalDepositDto,
  RouteQuoteDto,
  TrialDeploymentStatus,
} from "@/codegen/model";
import { AcrossBridgeDto } from "@/types/across";
import { ArbitrumToken, CctpToken, OptimismToken, Token } from "@/types/token";
import {
  AbritrumTransaction,
  OptimismTransaction,
  Transaction,
} from "@/types/transaction";

import { isEth } from "./is-eth";

export const isArbitrumTx = (tx: Transaction): tx is AbritrumTransaction => {
  return Object.values(ArbitrumTransactionType).includes(
    tx.type as ArbitrumTransactionType
  );
};

export const isOptimismTx = (tx: Transaction): tx is OptimismTransaction => {
  return Object.values(OptimismTransactionType).includes(
    tx.type as OptimismTransactionType
  );
};

export const isDeposit = (
  tx: Transaction
): tx is
  | PortalDepositDto
  | ArbitrumDepositEthDto
  | ArbitrumDepositRetryableDto => {
  return [
    OptimismTransactionType.deposit,
    ArbitrumTransactionType["arbitrum-deposit-eth"],
    ArbitrumTransactionType["arbitrum-deposit-retryable"],
  ].includes(tx.type as any);
};
export const isWithdrawal = (
  tx: Transaction
): tx is BridgeWithdrawalDto | ArbitrumWithdrawalDto => {
  return [
    OptimismTransactionType.withdrawal,
    ArbitrumTransactionType["arbitrum-withdrawal"],
  ].includes(tx.type as any);
};

export const isForcedWithdrawal = (
  tx: Transaction
): tx is ForcedWithdrawalDto | ArbitrumForcedWithdrawalDto => {
  return [
    OptimismTransactionType["forced-withdrawal"],
    ArbitrumTransactionType["arbitrum-forced-withdrawal"],
  ].includes(tx.type as any);
};

export const isArbitrumDeposit = (
  tx: Transaction
): tx is ArbitrumDepositEthDto | ArbitrumDepositRetryableDto => {
  return [
    ArbitrumTransactionType["arbitrum-deposit-eth"],
    ArbitrumTransactionType["arbitrum-deposit-retryable"],
  ].includes(tx.type as any);
};

export const isArbitrumWithdrawal = (
  tx: Transaction
): tx is ArbitrumWithdrawalDto => {
  return tx.type === ArbitrumTransactionType["arbitrum-withdrawal"];
};

export const isArbitrumForcedWithdrawal = (
  tx: Transaction
): tx is ArbitrumForcedWithdrawalDto => {
  return tx.type === ArbitrumTransactionType["arbitrum-forced-withdrawal"];
};

export const isOptimismDeposit = (tx: Transaction): tx is PortalDepositDto => {
  return tx.type === OptimismTransactionType.deposit;
};

export const isOptimismWithdrawal = (
  tx: Transaction
): tx is BridgeWithdrawalDto => {
  return tx.type === OptimismTransactionType.withdrawal;
};

export const isOptimismForcedWithdrawal = (
  tx: Transaction
): tx is ForcedWithdrawalDto => {
  return tx.type === OptimismTransactionType["forced-withdrawal"];
};

export const isCctpBridge = (tx: Transaction): tx is CctpBridgeDto => {
  return tx.type === CctpTransactionType["cctp-bridge"];
};

export const isAcrossBridge = (tx: Transaction): tx is AcrossBridgeDto => {
  return tx.type === AcrossTransactionType["across-bridge"];
};

export const isOptimismToken = (t: Token): t is OptimismToken => {
  return isEth(t) || !!(t as OptimismToken).standardBridgeAddresses;
};

export const isArbitrumToken = (t: Token): t is ArbitrumToken => {
  return isEth(t) || !!(t as ArbitrumToken).arbitrumBridgeInfo;
};

export const isCctpToken = (t: Token): t is CctpToken => {
  return (t as CctpToken).isCctp;
};

export const isActive = (
  s: TrialDeploymentStatus | ActiveDeploymentStatus
): s is ActiveDeploymentStatus => {
  return s.status === DeploymentStatus.active;
};

export const isTrial = (
  s: TrialDeploymentStatus | ActiveDeploymentStatus
): s is TrialDeploymentStatus => {
  return s.status === DeploymentStatus.trial;
};

type RouteQuote =
  | RouteQuoteDto
  | GenericRouteErrorDto
  | AmountTooLargeRouteErrorDto
  | AmountTooSmallRouteErrorDto
  | PausedRouteErrorDto
  | DisabledRouteErrorDto;

type RouteQuoteError =
  | GenericRouteErrorDto
  | AmountTooLargeRouteErrorDto
  | AmountTooSmallRouteErrorDto
  | PausedRouteErrorDto
  | DisabledRouteErrorDto;

export const isRouteQuoteError = (a: RouteQuote): a is RouteQuoteError => {
  return !!(a as any).type;
};

export const isAmountTooLargeRouteError = (
  a: RouteQuote
): a is AmountTooLargeRouteErrorDto => {
  return isRouteQuoteError(a) && a.type === "AmountTooLarge";
};

export const isAmountTooSmallRouteError = (
  a: RouteQuote
): a is AmountTooSmallRouteErrorDto => {
  return isRouteQuoteError(a) && a.type === "AmountTooSmall";
};

export const isRouteQuote = (
  a: RouteQuoteDto | GenericRouteErrorDto
): a is RouteQuoteDto => {
  return !!(a as RouteQuoteDto).initiatingTransaction;
};
