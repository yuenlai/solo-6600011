export interface EEGData { channels: string[]; sample_rate: number; data: Record<string, number[]>; time: number[]; duration: number; }
export interface BandPower { delta: number; theta: number; alpha: number; beta: number; gamma: number; }
