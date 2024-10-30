import clsx from "clsx";

import { useIsWidget } from "@/hooks/use-is-widget";
import { useDeletedAt } from "@/hooks/use-metadata";

import { Banners } from "./banners";
import { BridgeBody } from "./bridge-body";
import { BridgeDeleted } from "./bridge-deleted";
import { BridgeHeader } from "./bridge-header";
import { UpgradePromo } from "./upgrade-promo";

export const Bridge = () => {
  const deletedAt = useDeletedAt();
  const isWidget = useIsWidget();

  return (
    <main
      className="relative flex items-start justify-center w-screen h-screen fixed inset-0 overflow-y-auto overflow-x-hidden"
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
        <div className="flex flex-col gap-4 items-center h-full">
          <div className="flex flex-col gap-2">
            {deletedAt && deletedAt < Date.now() ? (
              <div className="w-full bg-card mx-auto rounded-[24px] md:rounded-[32px] shadow-sm shrink-0 backdrop-blur-sm">
                <BridgeDeleted />
              </div>
            ) : (
              <>
                {!isWidget && <BridgeHeader />}
                <div
                  className={clsx(
                    "bg-card backdrop-blur-sm",
                    !isWidget &&
                      "rounded-t-[24px] rounded-b-[32px] shadow-sm w-full",
                    isWidget && "h-screen w-screen"
                  )}
                >
                  {/* TODO: maybe make this separate component called WidgetHeader */}
                  {isWidget && <BridgeHeader />}
                  <BridgeBody />
                  {isWidget && (
                    <div className="flex flex-col gap-2 px-4">
                      <Banners />
                      <UpgradePromo />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {!isWidget && (
            <div className="flex flex-col gap-2 w-full">
              <Banners />
              <UpgradePromo />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
