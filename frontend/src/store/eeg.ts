import { create } from 'zustand';
import { EEGData, BandPower, BrainState } from '../types';
interface EEGState { eegData: EEGData | null; selectedChannel: string; bandPower: BandPower | null; isStreaming: boolean; brainState: BrainState | null;
  setEEGData: (d: EEGData | null) => void; setChannel: (c: string) => void; setBandPower: (b: BandPower | null) => void; setStreaming: (v: boolean) => void; setBrainState: (s: BrainState | null) => void; }
export const useEEGStore = create<EEGState>((set) => ({
  eegData: null, selectedChannel: 'Fp1', bandPower: null, isStreaming: false, brainState: null,
  setEEGData: (d) => set({ eegData: d }), setChannel: (c) => set({ selectedChannel: c }),
  setBandPower: (b) => set({ bandPower: b }), setStreaming: (v) => set({ isStreaming: v }),
  setBrainState: (s) => set({ brainState: s }),
}));
