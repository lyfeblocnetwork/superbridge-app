import { useHost } from "../use-metadata";

export const useIsHyperlanePlayground = () => {
  const host = useHost();
  return host === "hyperlane.superbridge.app" || host === "hl.superbridge.app";
};
