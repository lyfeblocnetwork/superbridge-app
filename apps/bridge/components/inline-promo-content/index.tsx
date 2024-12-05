import { useIsHyperlanePlayground } from "@/hooks/apps/use-is-hyperlane";
import { useIsLzPlayground } from "@/hooks/apps/use-is-lz";
import { useIsWidget } from "@/hooks/use-is-widget";
import { useDeletedAt } from "@/hooks/use-metadata";

import { HLContent } from "./HLcontent";
import { LZContent } from "./LZcontent";
import { Footer } from "./footer";

export const InlinePromoContent = () => {
  const isHyperlane = useIsHyperlanePlayground();
  const isLz = useIsLzPlayground();
  const deletedAt = useDeletedAt();
  const isWidget = useIsWidget();

  if (isHyperlane) {
    return (
      <div className="w-full px-3 md:px-8">
        <HLContent />
        <Footer />
      </div>
    );
  }

  if (isLz) {
    return (
      <div className="w-full px-3 md:px-8">
        <LZContent />
        <Footer />
      </div>
    );
  }

  return null;
};
