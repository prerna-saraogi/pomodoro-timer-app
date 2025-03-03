import React, { useState } from 'react';
import './App.css';
import TimerTabs from './components/TimerTabs';

const App = () => {
  const [activeTab, setActiveTab] = useState('pomodoro');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl p-6 text-center">
        <h1 className="text-2xl text-theme-purple font-bold mb-4">Pomodoro Timer</h1>
        <TimerTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
