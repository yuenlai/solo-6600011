import React from 'react';
import { WaveformChart } from './components/WaveformChart';
import { BandPowerChart } from './components/BandPowerChart';
import { ChannelSelector } from './components/ChannelSelector';
import { BrainStateDashboard } from './components/BrainStateDashboard';
const App: React.FC = () => (
  <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
    <nav style={{ width: '200px', background: '#0d1b2a', color: '#fff', padding: '20px 0' }}>
      <h2 style={{ margin: '0 0 20px', padding: '0 16px', fontSize: '15px' }}>EEG Lab</h2>
      <ChannelSelector />
    </nav>
    <main style={{ flex: 1, overflow: 'auto', background: '#fafafa' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px', minWidth: 0 }}>
          <WaveformChart />
          <BandPowerChart />
        </div>
        <div style={{ flex: '0 0 320px', maxWidth: '380px' }}>
          <BrainStateDashboard />
        </div>
      </div>
    </main>
  </div>
);
export default App;
