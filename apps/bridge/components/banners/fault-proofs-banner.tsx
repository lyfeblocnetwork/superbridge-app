import clsx from "clsx";

import { useDeployments } from "@/hooks/deployments/use-deployments";
import { useHasWithdrawalReadyToFinalize } from "@/hooks/use-has-withdrawal-ready-to-finalize";
import { useIsWidget } from "@/hooks/use-is-widget";
import { useModal } from "@/hooks/use-modal";

import { IconAlert } from "../icons";
import { NetworkIcon } from "../network-icon";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export const FaultProofsBanner = () => {
  const modal = useModal("FaultProofInfo");

  const hasWithdrawalReadyToFinalize = useHasWithdrawalReadyToFinalize();

  const soneium = useDeployments().find((x) => x.name === "soneium-minato");
  const isWidget = useIsWidget();
  if (!soneium) {
    return null;
  }

  return null;

  // return (
  //   <Alert
  //     className={clsx("flex gap-3 md:pl-5", isWidget && "bg-muted shadow-none")}
  //   >
  //     <div className="relative drop-shadow-lg w-8 h-8 shrink-0 mr-1.5">
  //       <NetworkIcon
  //         chain={soneium.l2}
  //         className="h-8 w-8 rounded-sm shrink-0"
  //       />
  //       <IconAlert className="w-5 h-5 animate-wiggle-waggle origin-center absolute -bottom-0.5 -right-2" />
  //     </div>

  //     {/* className="h-8 w-auto shrink-0 mt-0.5 ml-0.5 animate-wiggle-waggle origin-center" */}

  //     <div className="flex items-start justify-between gap-6 w-full">
  //       <div>
  //         <AlertTitle>Soneium Minato Fault Proof upgrade</AlertTitle>
  //         <AlertDescription className="text-foreground opacity-60">
  //           {/* {hasWithdrawalReadyToFinalize
  //             ? "Be sure sure to finalize any pending withdrawals before October 30th."
  //             : "Withdrawals from Soneium Minato via the Native Bridge are paused until after the upgrade is complete."} */}
  //           {hasWithdrawalReadyToFinalize
  //             ? "Be sure sure to finalize any pending withdrawals before November 4th."
  //             : "Withdrawals not proved before the upgrade will need to be reproven."}
  //         </AlertDescription>
  //       </div>
  //       <Button
  //         // variant={"secondary"}
  //         size={"xs"}
  //         onClick={() => modal.open()}
  //         className="ml-auto"
  //       >
  //         More
  //       </Button>
  //     </div>
  //   </Alert>
  // );
};
