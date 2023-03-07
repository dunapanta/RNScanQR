import {create} from 'zustand';

export type SelectedTab =
  | 'Home'
  | 'Favorites'
  | 'History'
  | 'Settings'
  | 'About';
interface IUiStore {
  showResultModal: boolean;
  setShowResultModal: (showResultModal: boolean) => void;

  selectedTab: SelectedTab;
  setSelectedTab: (selectedTab: SelectedTab) => void;
}

export const useUiStore = create<IUiStore>(set => ({
  showResultModal: false,
  setShowResultModal: (showResultModal: boolean) => set({showResultModal}),

  selectedTab: 'Home',
  setSelectedTab: (selectedTab: SelectedTab) => set({selectedTab}),
}));
