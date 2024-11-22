import { useTranslation } from "react-i18next";

import { useIsCctpRoute } from "@/hooks/cctp/use-is-cctp-route";
import { useFromChain } from "@/hooks/use-chain";
import { useModal } from "@/hooks/use-modal";
import {
  useIsArbitrumWithdrawal,
  useIsOptimismWithdrawal,
} from "@/hooks/use-withdrawing";

import { IconGas } from "../icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const GasInfoModal = () => {
  const { t } = useTranslation();
  const from = useFromChain();

  const modal = useModal("GasInfo");

  const isOptimismWithdrawal = useIsOptimismWithdrawal();
  const isArbitrumWithdrawal = useIsArbitrumWithdrawal();
  const isCctp = useIsCctpRoute();

  const description = isOptimismWithdrawal
    ? t("gasInfoModal.opWithdrawal")
    : isArbitrumWithdrawal
      ? t("gasInfoModal.arbWithdrawal")
      : isCctp
        ? t("gasInfoModal.cctp")
        : null;

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.close}>
      <DialogContent>
        <div className="flex flex-col gap-4 p-6">
          <DialogHeader className="flex flex-col gap-2 items-center text-center pt-10 pb-0">
            <div className="animate-wiggle-waggle">
              <IconGas className="w-16 h-auto mb-4" />
            </div>
            <DialogTitle className="font-heading text-2xl text-pretty">
              {t("gasInfoModal.title")}
            </DialogTitle>
            <DialogDescription className="text-xs md:text-sm prose-sm text-pretty text-center text-muted-foreground">
              {t("gasInfoModal.description", {
                from: from?.name,
                symbol: from?.nativeCurrency.symbol,
              })}
            </DialogDescription>
          </DialogHeader>
          {description && (
            <div className="rounded-xl bg-muted p-3">
              <p className="text-xs md:text-sm prose-sm text-pretty text-center text-muted-foreground">
                {description}
              </p>
            </div>
          )}
          <Button onClick={modal.close}>{t("ok")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
