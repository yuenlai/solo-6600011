from fastapi import APIRouter
from ..services.eeg_processor import generate_mock_eeg, compute_band_power, compute_spectrogram, SAMPLE_RATE

router = APIRouter(prefix="/eeg", tags=["eeg"])

@router.get("/stream")
async def stream_eeg(duration: float = 5.0):
    return generate_mock_eeg(duration)

@router.get("/bands/{channel}")
async def band_power(channel: str):
    data = generate_mock_eeg(5.0)
    if channel in data['data']:
        return {'channel': channel, 'bands': compute_band_power(data['data'][channel], SAMPLE_RATE)}
    return {'error': 'Channel not found'}

@router.get("/spectrogram/{channel}")
async def spectrogram(channel: str):
    data = generate_mock_eeg(5.0)
    if channel in data['data']:
        return {'channel': channel, 'spectrogram': compute_spectrogram(data['data'][channel], SAMPLE_RATE)}
    return {'error': 'Channel not found'}

@router.get("/channels")
async def list_channels():
    from ..services.eeg_processor import CHANNELS
    return {'channels': CHANNELS}
