//import {StateStorage} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';
import {create} from 'zustand';
interface IQRScanned {
  id: string;
  value: string;
  type: 'text' | 'url';
  date: Date;
  isFavorite: boolean;
}
interface IStorage {
  scanned: IQRScanned[];
  setScanned: (scanned: IQRScanned) => void;
}
const storage = new MMKV();
//get QRScanned from storage
const initialJsonScannedArray = storage.getString('scanned');
const initialScannedArray = initialJsonScannedArray
  ? JSON.parse(initialJsonScannedArray)
  : [];
export const useStorage = create<IStorage>(set => ({
  scanned: initialScannedArray,
  setScanned: (scanned: IQRScanned) => {
    //get scanned from storage
    const jsonScannedArray = storage.getString('scanned');
    const scannedArray = jsonScannedArray ? JSON.parse(jsonScannedArray) : [];
    //update scanned
    let updatedScanned = scannedArray.map((item: IQRScanned) => item);
    updatedScanned.push(scanned);
    console.log('updatedScanned:', updatedScanned);
    storage.set('scanned', JSON.stringify(updatedScanned));
    set({scanned: updatedScanned});
  },
}));
