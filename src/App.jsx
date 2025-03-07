import React, { useState, useRef } from 'react';
import './App.css';
import TimerTabs from './components/TimerTabs';
import CircularTimer from './components/CircularTimer';
import Controls from './components/Controls';
import SettingsModal from './components/SettingsModal';
import { useTimer } from './context/TimerContext';
import { useTheme } from './context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const App = () => {
  const { activeTab, setActiveTab, timeLeft, durations, isRunning, setIsRunning } = useTimer();
  const { selectedTheme, mode, setMode } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const wasRunningRef = useRef(false);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / (durations[activeTab] * 60)) * 100;

  const openSettings = () => {
    wasRunningRef.current = isRunning;
    setIsRunning(false); // Pause the timer when opening settings
    setShowSettings(true);
  }

  const closeSettings = () => {
    setShowSettings(false);
    // If the timer was running before opening settings, resume it
    if (wasRunningRef.current) {
      setIsRunning(true);
      wasRunningRef.current = false; // Reset the reference after resuming
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition bg-backgroundLight dark:bg-backgroundDark ">
      <div className="w-full max-w-md rounded-xl p-6 text-center">
        <h1 className={`text-3xl text-${selectedTheme} font-bold mb-6 `}>Pomodoro Timer</h1>
        <TimerTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CircularTimer minutes={minutes} seconds={seconds} percentage={percentage} />
        <Controls onSettingsClick={openSettings} />
        {showSettings && <SettingsModal onClose={closeSettings} wasRunningRef={wasRunningRef} />}
        <button
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded hover:bg-panelLight dark:hover:bg-panelDark transition"
          aria-label="Toggle mode"
        >
          {mode === 'dark' ? (
            <Sun size={30} className="text-yellow-500 fill-current" />
          ) : (
            <Moon size={30} className="text-gray-800 fill-current" />
          )}
        </button>
      </div>
      <div className='w-full max-w-md text-center mt-12'>
        <footer className="text-base font-medium text-black dark:text-white">
          Developed with ❤️ by{' '}
          <a
            href="https://github.com/prerna-saraogi"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-${selectedTheme} hover:underline font-bold`}
          >
            Prerna Saraogi
          </a>
        </footer>
      </div>
    </div>
  );
};

export default App;
