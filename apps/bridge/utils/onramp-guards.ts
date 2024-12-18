import {
  OnrampQuote,
  OnrampQuoteAmountTooLargeErrorDto,
  OnrampQuoteAmountTooSmallErrorDto,
  OnrampQuoteErrorType,
  OnrampQuoteGenericErrorDto,
  OnrampQuoteResponseDto,
} from "@/codegen/model";

export const isOnrampQuote = (
  q: OnrampQuoteResponseDto["result"]
): q is OnrampQuote => {
  return !!(q as OnrampQuote).fees;
};

export const isOnrampQuoteGenericError = (
  q: OnrampQuoteResponseDto["result"]
): q is OnrampQuoteGenericErrorDto => {
  return (
    (q as OnrampQuoteGenericErrorDto).type == OnrampQuoteErrorType.GenericError
  );
};

export const isOnrampQuoteAmountTooLargeError = (
  q: OnrampQuoteResponseDto["result"]
): q is OnrampQuoteAmountTooLargeErrorDto => {
  return (
    (q as OnrampQuoteAmountTooLargeErrorDto).type ==
    OnrampQuoteErrorType.AmountTooLarge
  );
};

export const isOnrampQuoteAmountTooSmallError = (
  q: OnrampQuoteResponseDto["result"]
): q is OnrampQuoteAmountTooSmallErrorDto => {
  return (
    (q as OnrampQuoteAmountTooSmallErrorDto).type ==
    OnrampQuoteErrorType.AmountTooSmall
  );
};
