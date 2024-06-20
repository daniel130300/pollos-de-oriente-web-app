import { create } from 'zustand';
import React from 'react';

interface ModalState {
  open: boolean;
  title: string;
  description: string;
  buttons: React.ReactNode;
  handleOpen: (data: {
    title: string;
    description: string;
    buttons: React.ReactNode;
  }) => void;
  handleClose: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  open: false,
  title: '',
  description: '',
  buttons: null,
  handleOpen: ({ title, description, buttons }) =>
    set(() => ({ open: true, title, description, buttons })),
  handleClose: () => set(() => ({ open: false })),
}));
