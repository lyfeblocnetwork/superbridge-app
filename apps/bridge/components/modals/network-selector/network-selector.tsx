import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { ChainDto } from "@/codegen/model";

import { ChainCard } from "../../chain-card";
import { IconClose } from "../../icons";

// Animations
const container = {
  hidden: {
    y: "5vh",
    opacity: 0,
    transition: {
      type: "easeIn",
      duration: 0.15,
    },
  },
  show: {
    opacity: 1,
    y: "0vh",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 16,
      staggerChildren: 0.05,
      delayChildren: 0.1,
      // staggerDirection: -1,
    },
  },
};

const PlacehoderItem = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 0.2,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 12,
    },
  },
};

export const NetworkSelector = ({
  onSelect,
  onClose,
  networks,
  comingSoonNetworks,
}: {
  onSelect: (n: ChainDto) => void;
  onClose: () => void;
  networks: ChainDto[];
  comingSoonNetworks: Pick<ChainDto, "id" | "name">[];
}) => {
  const { t } = useTranslation();

  return (
    <main
      className="flex items-start justify-center scroll-smooth overflow-y-scroll w-screen h-dvh fixed inset-0 px-2 md:px-0 py-16 md:py-20 z-[25]"
      key="bridgeMain"
      onClick={onClose}
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
        whileHover={{ scale: 1.1 }}
        key="close-activity-button"
        className={`flex items-center cursor-pointer w-10 h-10 shrink-0 flex items-center justify-center rounded-full shadow-sm bg-card fixed top-6 right-6 z-10`}
      >
        <IconClose className="fill-foreground w-3.5 h-3.5" />
      </motion.button>
      <motion.div
        variants={container}
        initial={"hidden"}
        animate={"show"}
        exit={"hidden"}
        className="flex flex-col items-center gap-10 w-full"
      >
        <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full shadow-sm">
          <h1 className="text-2xl font-heading">
            {t("networkSelectorModal.title")}
          </h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full px-4 max-w-3xl">
          {networks.map((chain) => (
            <ChainCard
              key={chain.id}
              chain={chain}
              onSelect={(e) => {
                e.stopPropagation();
                onSelect(chain);
              }}
            />
          ))}
          {comingSoonNetworks.map((chain) => (
            <ChainCard
              key={chain.id}
              chain={chain}
              onSelect={(e) => e.stopPropagation()}
              comingSoon
            />
          ))}
          {comingSoonNetworks.length + networks.length < 4 &&
            [...Array(4 - (comingSoonNetworks.length + networks.length))].map(
              (_, i) => {
                return (
                  <motion.div
                    variants={PlacehoderItem}
                    className="bg-card border relative w-full aspect-[3.25/4] rounded-2xl shadow-sm"
                    key={i}
                  ></motion.div>
                );
              }
            )}
        </div>
      </motion.div>
    </main>
  );
};
