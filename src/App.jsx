import React, { useState } from 'react';
import './App.css';
import TimerTabs from './components/TimerTabs';
import CircularTimer from './components/CircularTimer';
import Controls from './components/Controls';
import SettingsModal from './components/SettingsModal';
import { useTimer } from './context/TimerContext';
import { useTheme } from './context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const App = () => {
  const { activeTab, setActiveTab, timeLeft, durations } = useTimer();
  const { selectedTheme, mode, setMode } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / (durations[activeTab] * 60)) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 flex-col transition bg-backgroundLight dark:bg-backgroundDark ">
      <div className="w-full max-w-md rounded-xl p-6 text-center">
        <h1 className={`text-3xl text-${selectedTheme} font-bold mb-6 `}>Pomodoro Timer</h1>
        <TimerTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CircularTimer minutes={minutes} seconds={seconds} percentage={percentage} />
        <Controls onSettingsClick={() => setShowSettings(true)} />
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
        <button
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle mode"
        >
          {mode === 'dark' ? (
            <Sun size={30} className="text-yellow-500 fill-current" />
          ) : (
            <Moon size={30} className="text-gray-800 fill-current" />
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
