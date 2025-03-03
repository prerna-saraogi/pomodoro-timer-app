import React from 'react';
const tabs = [
    { label: 'Pomodoro', value: 'pomodoro' },
    { label: 'Short Break', value: 'shortBreak' },
    { label: 'Long Break', value: 'longBreak' },
];

const TimerTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex justify-center gap-4 py-4 bg-dark rounded-full shadow-lg">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={`px-4 py-2 rounded-full font-bold transition-colors duration-200 ${activeTab === tab.value
                        ? 'bg-theme-purple text-white'
                        : 'text-gray-400'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TimerTabs;
