import {create} from 'zustand';

export const useScanQRStore = create(set => ({
  barcode: '',
  setBarcode: (barcode: string) => set({barcode}),
  isScanned: false,
  setIsScanned: (isScanned: boolean) => set({isScanned}),
}));
