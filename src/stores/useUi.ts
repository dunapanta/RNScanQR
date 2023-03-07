import {create} from 'zustand';

type SelectedTab = 'Home' | 'Favorites' | 'History' | 'Settings' | 'About';
interface IUiStore {
  showResultModal: boolean;
  setShowResultModal: (showResultModal: boolean) => void;

  selectedTab: SelectedTab;
}

export const useUiStore = create<IUiStore>(set => ({
  showResultModal: false,
  setShowResultModal: (showResultModal: boolean) => set({showResultModal}),
  selectedTab: 'Home',
  setSelectedTab: (selectedTab: SelectedTab) => set({selectedTab}),
}));
