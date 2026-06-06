import React from 'react';
import { useEEGStore } from '../store/eeg';
const CHANNELS = ['Fp1','Fp2','F3','F4','C3','C4','P3','P4','O1','O2'];
export const ChannelSelector: React.FC = () => {
  const { selectedChannel, setChannel } = useEEGStore();
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 12px' }}>Channels</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {CHANNELS.map(ch => (
          <button key={ch} onClick={() => setChannel(ch)} style={{
            padding: '6px 12px', borderRadius: '16px', border: '1px solid #ddd',
            background: selectedChannel === ch ? '#1565c0' : '#fff',
            color: selectedChannel === ch ? '#fff' : '#333', cursor: 'pointer', fontSize: '12px'
          }}>{ch}</button>
        ))}
      </div>
    </div>
  );
};
