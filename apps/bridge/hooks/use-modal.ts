import { ModalName, useModalsState } from "@/state/modals";

export const useModal = (name: ModalName) => {
  const addModal = useModalsState.useAddModal();
  const removeModal = useModalsState.useRemoveModal();
  const modals = useModalsState.useModals();
  const setActiveId = useModalsState.useSetActiveId();
  const activeIds = useModalsState.useActiveIds();

  return {
    isOpen: !!modals[name],
    data: activeIds[name],
    open: (data?: string) => {
      if (data) setActiveId(name, data);
      addModal(name);
    },
    close: () => {
      removeModal(name);
    },
  };
};
