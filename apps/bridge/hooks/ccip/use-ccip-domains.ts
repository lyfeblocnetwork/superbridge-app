import { useInjectedStore } from "@/state/injected";

export const useCcipDomains = () => {
  return useInjectedStore((s) => s.ccipDomains);
};
