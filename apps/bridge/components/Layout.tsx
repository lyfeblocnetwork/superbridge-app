import clsx from "clsx";
import { motion } from "framer-motion";

import { useIsSuperbridge } from "@/hooks/apps/use-is-superbridge";
import { useInitialise } from "@/hooks/use-initialise/use-initialise";
import {
  useBackgroundIcon,
  useBackgroundImageBlendMode,
  useBackgroundImageOpacity,
  useBackgroundImagePosition,
  useBackgroundImageRepeat,
  useBackgroundImageSize,
} from "@/hooks/use-theme";

import { Activity } from "./activity/activity";
import { Header } from "./header";
import { Modals } from "./modals";

export function Layout({ children }: { children: any }) {
  useInitialise();

  const imageBackground = useBackgroundIcon();
  const backgroundImageBlendMode = useBackgroundImageBlendMode();
  const backgroundImagePosition = useBackgroundImagePosition();
  const backgroundImageSize = useBackgroundImageSize();
  const backgroundImageRepeat = useBackgroundImageRepeat();
  const backgroundImageOpacity = useBackgroundImageOpacity();

  const isSuperbridge = useIsSuperbridge();

  return (
    <div
      className={clsx(
        isSuperbridge && "tracking-tight",
        "bg-background w-screen h-screen overflow-hidden z-40 relative transition-colors duration-1000  flex justify-center"
      )}
    >
      {isSuperbridge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-t from-[rgba(168,130,253,0.27)] via-[rgba(168,130,253,0.05)] to-[rgba(168,130,253,0)] inset-0 z-0 fixed mix-blend-plus-lighter"
        />
      )}
      <div
        className={clsx(`inset-0 z-0 fixed transition-all bg-cover`)}
        style={{
          backgroundImage: imageBackground
            ? `url(${imageBackground})`
            : undefined,
          opacity:
            !!backgroundImageOpacity &&
            typeof backgroundImageOpacity === "string"
              ? parseInt(backgroundImageOpacity) / 100
              : undefined,
          mixBlendMode: backgroundImageBlendMode as any,
          backgroundSize: backgroundImageSize,
          backgroundRepeat: backgroundImageRepeat,
          backgroundPosition: backgroundImagePosition,
        }}
      />

      <Header />

      {/* bridge */}
      {children}

      <Activity />

      <Modals />
    </div>
  );
}
