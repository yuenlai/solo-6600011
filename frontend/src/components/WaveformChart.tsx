import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEEGStore } from '../store/eeg';
import axios from 'axios';

export const WaveformChart: React.FC = () => {
  const { eegData, selectedChannel, setEEGData, setBandPower, setBrainState } = useEEGStore();
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const fetchEEG = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/eeg/sample/${selectedChannel}?duration=3`);
      setEEGData(data.eeg);
      setBandPower(data.bands);
      setBrainState(data.brainState);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchEEG();
    intervalRef.current = window.setInterval(fetchEEG, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [selectedChannel]);

  const chartData = eegData?.data[selectedChannel]?.map((v: number, i: number) => ({
    t: eegData.time[i]?.toFixed(3), value: v.toFixed(4)
  })) || [];

  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {selectedChannel} 波形
        {loading && <span style={{ fontSize: '12px', color: '#999' }}>刷新中...</span>}
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="t" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1565c0" dot={false} strokeWidth={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
