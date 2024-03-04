import { create } from 'zustand';

interface ModalState {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  handleOpen: () => set(() => ({ open: true})),
  handleClose: () => set(() => ({ open: false }))
}));