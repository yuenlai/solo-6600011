import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useEEGStore } from '../store/eeg';
const COLORS = ['#1565c0','#2e7d32','#f9a825','#e53935','#6a1b9a'];
const LABELS = ['Delta','Theta','Alpha','Beta','Gamma'];
export const BandPowerChart: React.FC = () => {
  const { bandPower } = useEEGStore();
  if (!bandPower) return <div style={{ padding: '16px', color: '#999' }}>No data</div>;
  const data = LABELS.map((label, i) => ({ name: label, power: (bandPower as any)[label.toLowerCase()] || 0, color: COLORS[i] }));
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 12px' }}>Band Power</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip />
          <Bar dataKey="power">{data.map((d, i) => <Cell key={i} fill={d.color} />)}</Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
