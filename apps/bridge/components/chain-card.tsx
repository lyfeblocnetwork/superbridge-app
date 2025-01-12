import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler } from "react";

import { ChainDto } from "@/codegen/model";
import {
  cardThemes,
  defaultCardTheme,
  moltenTheme,
  shapeTheme,
} from "@/config/card-themes";
import { useHyperlaneMailboxes } from "@/hooks/hyperlane/use-hyperlane-mailboxes";

import { NetworkIcon } from "./network-icon";

const item = {
  hidden: { opacity: 0, scale: 0.85, x: [0, 0, 0] },
  show: {
    opacity: 1,
    scale: 1,
    x: [0, 0, 0],
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 12,
    },
  },
};

export const ChainCard = ({
  chain,
  onSelect,
  comingSoon,
}: {
  chain: Pick<ChainDto, "id" | "name">;
  onSelect: MouseEventHandler<HTMLDivElement>;
  comingSoon?: boolean;
}) => {
  const hyperlaneMailboxes = useHyperlaneMailboxes();

  let theme = cardThemes[chain.id] ?? defaultCardTheme;
  if (chain.id === 360) {
    if (hyperlaneMailboxes.length) {
      theme = moltenTheme;
    } else {
      theme = shapeTheme;
    }
  }

  return (
    <motion.div
      key={`chain-${chain.id}`}
      onClick={onSelect}
      variants={item}
      // hovers must **NOT** be a variant or stagger animation will fail
      whileHover={{
        scale: comingSoon ? 1 : 1.03,
      }}
      whileTap={{
        scale: comingSoon ? [1, 1] : 0.95,
        x: comingSoon ? [5, 0] : 0,
        transition: { x: { type: "spring", stiffness: 600, damping: 8 } },
      }}
      className={clsx(
        "relative w-full  aspect-[3.25/4] shrink-0 flex flex-col shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-sm",
        theme.card.className
      )}
    >
      {/* overlay */}
      {theme.card.overlay?.image ? (
        <img
          src={theme.card.overlay?.image}
          className={clsx(
            "inset-0 z-0 absolute",
            theme.card.overlay?.className
          )}
          alt={chain.name}
          // fill
          loading="eager"
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
        />
      ) : (
        <div
          className={clsx(
            "inset-0 z-0 absolute",
            theme.card.overlay?.className
          )}
        />
      )}
      <div className="flex gap-4 flex-col capitalize items-center justify-center px-3 md:px-6 grow w-full relative z-10">
        {theme.icon ? (
          <Image
            alt={chain.name}
            src={theme.icon}
            width={96}
            height={96}
            className={clsx("pointer-events-none w-16 h-16 md:w-20 md:h-20")}
          />
        ) : (
          <NetworkIcon
            chain={chain}
            width={96}
            height={96}
            className="pointer-events-none w-16 h-16 md:w-24 md:h-24"
          />
        )}
        <h3
          className={clsx(
            `text-xs md:text-sm text-center font-heading`,
            theme.card.title
          )}
        >
          {chain.name}
        </h3>

        {comingSoon && (
          <span className="rounded-full absolute bottom-4 py-1 px-2 py-0 text-[9px] bg-black/30 text-white leading-none inline-flex">
            Coming soon
          </span>
        )}
      </div>
    </motion.div>
  );
};
