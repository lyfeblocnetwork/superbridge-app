import { DialogTitle } from "@radix-ui/react-dialog";
import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";

import { FiatOnrampTokenList } from "./fiat-onramp-token-list";

export const FiatOnrampTokensModal = () => {
  const { t } = useTranslation();

  const modal = useModal("FiatOnrampTokenSelector");

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.close}>
      <DialogContent onOpenAutoFocus={(event: Event) => event.preventDefault()}>
        <DialogHeader className="flex flex-col space-y-1.5 text-left px-6 py-6">
          <DialogTitle className="text-lg font-heading">
            {t("tokens.selectToken")}
          </DialogTitle>
        </DialogHeader>

        <FiatOnrampTokenList />
      </DialogContent>
    </Dialog>
  );
};
