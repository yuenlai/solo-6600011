import { create } from 'zustand';
import { EEGData, BandPower } from '../types';
interface EEGState { eegData: EEGData | null; selectedChannel: string; bandPower: BandPower | null; isStreaming: boolean;
  setEEGData: (d: EEGData | null) => void; setChannel: (c: string) => void; setBandPower: (b: BandPower | null) => void; setStreaming: (v: boolean) => void; }
export const useEEGStore = create<EEGState>((set) => ({
  eegData: null, selectedChannel: 'Fp1', bandPower: null, isStreaming: false,
  setEEGData: (d) => set({ eegData: d }), setChannel: (c) => set({ selectedChannel: c }),
  setBandPower: (b) => set({ bandPower: b }), setStreaming: (v) => set({ isStreaming: v }),
}));
