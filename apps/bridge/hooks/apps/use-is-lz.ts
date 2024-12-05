import { useHost } from "../use-metadata";

export const useIsLzPlayground = () => {
  const host = useHost();
  return (
    host === "lz.superbridge.app" ||
    host === "c196f5f7-6eea-4ec1-8b19-55e15eb0e46f.bridges.rollbridge.app"
  );
};
