import {create} from 'zustand';

interface IScanQRStore {
  barcode: string;
  setBarcode: (barcode: string) => void;
  isScanned: boolean;
  setIsScanned: (isScanned: boolean) => void;
}

export const useScanQRStore = create<IScanQRStore>(set => ({
  barcode: '',
  setBarcode: (barcode: string) => set({barcode}),
  isScanned: false,
  setIsScanned: (isScanned: boolean) => set({isScanned}),
}));
