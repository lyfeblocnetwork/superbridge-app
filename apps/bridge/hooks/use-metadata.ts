import { useInjectedStore } from "@/state/injected";

export const useMetadata = () => {
  return useInjectedStore((s) => s.app);
};

export const useId = () => {
  return useInjectedStore((s) => s.id);
};

export const useApp = () => {
  return useInjectedStore((s) => s.app);
};

export const useHost = () => useInjectedStore((s) => s.host);
export const useIsPaid = () => useInjectedStore((s) => s.isPaid);
export const useDeletedAt = () => useInjectedStore((s) => s.deletedAt);
export const useSupportsOnRamp = () =>
  useInjectedStore((s) => s.supportsOnRamp);
