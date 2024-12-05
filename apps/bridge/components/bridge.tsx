import clsx from "clsx";

import { useIsWidget } from "@/hooks/use-is-widget";
import { useDeletedAt } from "@/hooks/use-metadata";

import { Banners } from "./banners";
import { BridgeBody } from "./bridge-body";
import { BridgeDeleted } from "./bridge-deleted";
import { BridgeHeader } from "./bridge-header";
import { InlinePromoContent } from "./inline-promo-content";
import { UpgradePromo } from "./upgrade-promo";

export const Bridge = () => {
  const deletedAt = useDeletedAt();
  const isWidget = useIsWidget();

  return (
    <main
      className="relative flex flex-col items-center justify-start w-screen h-screen fixed inset-0 overflow-y-auto overflow-x-hidden"
      key="bridgeMain"
    >
      <div
        className={clsx(
          "w-full",
          isWidget
            ? "absolute inset-0 h-full"
            : "relative px-2 md:px-0  md:w-[468px] mb-24 mt-24 2xl:mt-32"
        )}
      >
        <div className="flex flex-col gap-2 items-center h-full">
          {deletedAt && deletedAt < Date.now() ? (
            <div className="w-full bg-card mx-auto rounded-[24px] md:rounded-[32px] shadow-sm shrink-0">
              <BridgeDeleted />
            </div>
          ) : (
            <>
              {!isWidget && <BridgeHeader />}
              <div
                className={clsx(
                  "bg-card",
                  !isWidget &&
                    "rounded-t-[24px] rounded-b-[32px] shadow-sm w-full",
                  isWidget && "h-screen w-screen"
                )}
              >
                {/* TODO: maybe make this separate component called WidgetHeader */}
                {isWidget && <BridgeHeader />}
                <BridgeBody />
                {isWidget && (
                  <div className="flex flex-col gap-2 w-full mt-2 px-4">
                    <Banners />
                    <UpgradePromo />
                  </div>
                )}
              </div>
            </>
          )}
          {!isWidget && (
            <div className="flex flex-col gap-2 w-full mt-2">
              <Banners />
              <UpgradePromo />
            </div>
          )}
        </div>
      </div>

      <InlinePromoContent />
    </main>
  );
};
