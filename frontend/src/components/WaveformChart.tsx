import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEEGStore } from '../store/eeg';
import axios from 'axios';

export const WaveformChart: React.FC = () => {
  const { eegData, selectedChannel, setEEGData, setBandPower } = useEEGStore();
  const [loading, setLoading] = useState(false);
  const fetchEEG = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/eeg/stream?duration=3');
      setEEGData(data);
      const { data: bd } = await axios.get(`/api/eeg/bands/${selectedChannel}`);
      setBandPower(bd.bands);
    } catch {}
    setLoading(false);
  };
  useEffect(() => { fetchEEG(); }, [selectedChannel]);
  const chartData = eegData?.data[selectedChannel]?.map((v: number, i: number) => ({
    t: eegData.time[i]?.toFixed(3), value: v.toFixed(4)
  })) || [];
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 12px' }}>{selectedChannel} Waveform</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="t" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1565c0" dot={false} strokeWidth={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
