import {create} from 'zustand';

interface IUiStore {
  showResultModal: boolean;
  setShowResultModal: (showResultModal: boolean) => void;
}

export const useUiStore = create<IUiStore>(set => ({
  showResultModal: false,
  setShowResultModal: (showResultModal: boolean) => set({showResultModal}),
}));
