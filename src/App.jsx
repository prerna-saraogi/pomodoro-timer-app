import React, { useState } from 'react';
import './App.css';
import TimerTabs from './components/TimerTabs';
import CircularTimer from './components/CircularTimer';
import Controls from './components/Controls';
import SettingsModal from './components/SettingsModal';
import { useTimer } from './context/TimerContext';

const App = () => {
  const { activeTab, setActiveTab, timeLeft, durations } = useTimer();
  const [showSettings, setShowSettings] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / (durations[activeTab] * 60)) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-md rounded-xl p-6 text-center">
        <h1 className="text-2xl text-theme-purple font-bold mb-4">Pomodoro Timer</h1>
        <TimerTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CircularTimer minutes={minutes} seconds={seconds} percentage={percentage} />
        <Controls onSettingsClick={() => setShowSettings(true)} />
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </div>
    </div>
  );
};

export default App;
