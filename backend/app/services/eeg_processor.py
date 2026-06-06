import numpy as np
from scipy import signal

CHANNELS = ['Fp1','Fp2','F3','F4','C3','C4','P3','P4','O1','O2']
SAMPLE_RATE = 256
BANDS = {'delta': (0.5,4), 'theta': (4,8), 'alpha': (8,13), 'beta': (13,30), 'gamma': (30,100)}

def generate_mock_eeg(duration_sec: float = 5.0) -> dict:
    t = np.linspace(0, duration_sec, int(SAMPLE_RATE * duration_sec))
    data = {}
    for ch in CHANNELS:
        sig = 0.5*np.sin(2*np.pi*10*t) + 0.3*np.sin(2*np.pi*20*t) + 0.2*np.random.randn(len(t))
        data[ch] = sig.tolist()
    return {'channels': CHANNELS, 'sample_rate': SAMPLE_RATE, 'data': data, 'time': t.tolist(), 'duration': duration_sec}

def compute_band_power(channel_data: list, sample_rate: int) -> dict:
    freqs, psd = signal.welch(channel_data, fs=sample_rate, nperseg=256)
    result = {}
    for name, (low, high) in BANDS.items():
        mask = (freqs >= low) & (freqs <= high)
        result[name] = float(np.trapz(psd[mask], freqs[mask])) if mask.any() else 0.0
    return result

def compute_spectrogram(channel_data: list, sample_rate: int) -> dict:
    f, t, Sxx = signal.spectrogram(channel_data, fs=sample_rate, nperseg=128, noverlap=64)
    return {'frequencies': f.tolist(), 'time': t.tolist(), 'power': (10*np.log10(Sxx+1e-10)).tolist()}
