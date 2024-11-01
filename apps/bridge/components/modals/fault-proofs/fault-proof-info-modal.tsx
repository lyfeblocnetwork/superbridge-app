import { DialogTitle } from "@radix-ui/react-dialog";

import { IconAlert } from "@/components/icons";
import { NetworkIcon } from "@/components/network-icon";
import { optimismFaultProofs } from "@/constants/links";
import { useDeployments } from "@/hooks/deployments/use-deployments";
import { useModal } from "@/hooks/use-modal";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../../ui/dialog";

export const FaultProofInfoModal = () => {
  const modal = useModal("FaultProofInfo");

  const sonieum = useDeployments().find((x) => x.name === "soneium-minato");

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.close}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-4 pt-12">
          <div className="mx-auto relative drop-shadow-lg">
            <NetworkIcon chain={sonieum?.l2} className="h-20 w-20 rounded-xl" />
            <IconAlert className="w-8 h-8 animate-wiggle-waggle origin-center absolute -bottom-0.5 -right-3.5" />
          </div>
          <DialogTitle className="font-heading text-2xl text-center tracking-tight">
            Soneium Minato Fault Proof upgrade
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col px-6">
          <div className="text-xs text-left md:text-sm prose-sm leading-relaxed text-muted-foreground text-pretty">
            <p>
              The Soneium Minato Fault Proof upgrade has been targeted for
              November 4th.
            </p>
            <p>
              Any withdrawals initiated now should be proved before the upgrade
              is complete, otherwise they will need to be reproven.
            </p>
            <p>
              If you have withdrawals that are ready to finalize, you should do
              it before the upgrade is complete or you will need to prove again
              then wait a further 7 days.
            </p>
            <p>
              Find out more at{" "}
              <a
                href={optimismFaultProofs}
                target="_blank"
                className="text-foreground underline"
              >
                optimism.io
              </a>{" "}
              or check the{" "}
              <a
                href="https://help.superbridge.app/en/articles/9759328-fault-proof-upgrade"
                target="_blank"
                className="text-foreground underline"
              >
                FAQs
              </a>
              .
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={modal.close}>Ok</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
