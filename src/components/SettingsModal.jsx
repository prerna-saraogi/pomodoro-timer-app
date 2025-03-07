import { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';
import { useSoundSettings } from '../context/SoundContext';
import useSound from '../hooks/useSound';

const SettingsModal = ({ onClose, wasRunningRef }) => {
    const { durations, setDurations, resetTimer } = useTimer();
    const { selectedTheme, setSelectedTheme } = useTheme();
    const { isSoundOn, setIsSoundOn, toggleSound, volume, setVolume, selectedAlert, setSelectedAlert } = useSoundSettings();

    const [localDurations, setLocalDurations] = useState(durations);
    const [selectedColor, setSelectedColor] = useState(selectedTheme);
    const [localSelectedAlert, setLocalSelectedAlert] = useState(selectedAlert);

    const [selectedTab, setSelectedTab] = useState('Timers');
    const [showDropdown, setShowDropdown] = useState(false);

    const previewStart = useSound('startAlert.mp3');

    const sidebarItems = [
        'Timers', 'Theme Colors', 'Sounds'
    ];

    const soundOptions = [
        { label: 'Completion Alert', file: 'completionAlert.mp3' },
        { label: 'Soft Bell', file: 'softbell.mp3' },
        { label: 'Ding', file: 'ding.mp3' },
        { label: 'Flow', file: 'flow.mp3' },
    ];

    const handleChange = (type, value) => {
        setLocalDurations((prev) => ({
            ...prev,
            [type]: Number(value),
        }));
    };

    const handleSave = () => {
        setDurations(localDurations);
        setSelectedTheme(selectedColor);
        setSelectedAlert(localSelectedAlert);
        onClose();
    };

    const handleReset = () => {
        if (wasRunningRef.current) {
            wasRunningRef.current = false;
        }
        const defaultDurations = {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15,
        };
        setDurations(defaultDurations);
        setLocalDurations(defaultDurations);
        resetTimer();
        setSelectedColor('purple');
        setSelectedTheme('purple');
        setIsSoundOn(true); // Reset sound to on
        setVolume(50); // Reset volume to default
        setSelectedAlert('completionAlert.mp3');
        setLocalSelectedAlert('completionAlert.mp3');
        onClose();
    }

    //plays the sound when the user selects a sound from the dropdown
    const playPreviewSound = (file) => {
        if (!isSoundOn || !file) return;

        const audio = new Audio(`/assets/sounds/${file}`);
        audio.volume = volume / 100;
        audio.play().catch((err) => {
            console.warn('Preview sound failed:', err);
        });
    };


    return (
        <div className="fixed inset-0 bg-backgroundLight dark:bg-backgroundDark bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-panelLight dark:bg-panelDark text-textDark dark:text-textLight rounded-3xl flex flex-col w-full max-w-[600px] min-h-[400px] relative">
                {/* Modal Header */}
                <div className='flex justify-between items-center px-8 py-5'>
                    <h2 className="text-2xl font-bold">Settings</h2>
                    <button
                        className="w-10 h-10 text-4xl text-textDark dark:text-textLight dark:hover:text-white hover:scale-110 transition-transform duration-200"
                        onClick={onClose}
                        aria-label="Close Settings"
                    >
                        &times;
                    </button>
                </div>
                {/* Modal Body */}
                <div className='flex flex-1 px-8 py-5'>
                    {/* Modal Body - Sidebar */}
                    <div className='w-44'>
                        {sidebarItems.map((item) => (
                            <button
                                key={item}
                                className={`block w-full text-left py-2 px-3 text-md font-md transition
                                    ${selectedTab === item ? `bg-${selectedTheme} dark:text-white font-bold rounded-lg bg-opacity-50 focus: outline-none` : 'dark:hover:text-white'}`}
                                onClick={() => setSelectedTab(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Modal Body - Content */}
                    <div className='flex-1 px-6 font-bold dark:text-white'>
                        {selectedTab === 'Timers' && (
                            <div className="space-y-4">
                                {['pomodoro', 'shortBreak', 'longBreak'].map((type) => (
                                    <div key={type}>
                                        <label className='block mb-3'>{type.charAt(0).toUpperCase() + type.slice(1)} (minutes)</label>
                                        <input
                                            type="number"
                                            value={localDurations[type]}
                                            onChange={(e) => handleChange(type, e.target.value)}
                                            className="w-24 px-2 py-1 rounded-md bg-panelLight dark:bg-panelDark border-2 border-textDark dark:border-textLight focus:outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {selectedTab === 'Theme Colors' && (
                            <div className="space-y-4">
                                <label className="block">Select Theme Color</label>
                                <div className="flex justify-evenly items-center">

                                    {['purple', 'red', 'green', 'rose', 'violet'].map((color) => {
                                        return (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-10 h-10 rounded-md border-2 bg-${color} ${selectedColor === color ? 'border-2 border-textDark dark:border-textLight' : 'border-transparent'}`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        {selectedTab === 'Sounds' && (
                            <div className="space-y-6">
                                <label className="block">Sound Effects</label>

                                {/* Toggle for mute - unmute */}
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Sound</span>
                                    <div className="flex items-center gap-2">
                                        <span className='px-2'>
                                            {isSoundOn ? 'On' : 'Off'}
                                        </span>
                                        <label className="relative inline-flex items-center cursor-pointer">

                                            <input
                                                type="checkbox"
                                                checked={isSoundOn}
                                                onChange={toggleSound}
                                                className="sr-only peer"
                                            />

                                            <div className={`w-9 h-5 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 rounded-full peer 
                                        ${isSoundOn
                                                    ? `bg-${selectedColor}`
                                                    : 'bg-gray-400 dark:bg-gray-600'} transition-all duration-300`}></div>
                                            <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform peer-checked:translate-x-full" />
                                        </label>
                                    </div>

                                </div>

                                {/* Volume Slider */}
                                <div className="w-full">
                                    <label className="block mb-2 font-semibold text-left">Volume: {volume}%</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={volume}
                                        onChange={(e) => {
                                            setVolume(Number(e.target.value));
                                            previewStart(); // play sound on slide
                                        }}
                                        className="w-full h-2 bg-gray-400 dark:bg-white rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                {/* Custom Sound Selection for Timer Completion */}
                                <div className='w-full relative'>
                                    <label className='block mb-3 font-semibold text-left'>Select alert sound on Completion:</label>
                                    <button
                                        onClick={() => setShowDropdown((prev) => !prev)}
                                        className='w-full flex justify-between items-center px-4 py-2 rounded-md border border-textDark dark:border-textLight '
                                    >
                                        {soundOptions.find((opt) => opt.file === localSelectedAlert)?.label || 'Select Sound'}
                                        <svg
                                            className={`w-6 h-6 ml-2 transform transition-transform duration-400 ${showDropdown ? 'rotate-180' : ''
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {showDropdown && (
                                        <ul className='absolute left-0 w-full z-10 max-h-48 overflow-auto rounded-md border border-panelDark dark:border-panelLight bg-panelLight dark:bg-panelDark text-sm mt-1'>
                                            {soundOptions.map((option) => {
                                                return (
                                                    <li
                                                        key={option.label}
                                                        onClick={() => {
                                                            setLocalSelectedAlert(option.file);
                                                            setShowDropdown(false);
                                                            playPreviewSound(option.file); //plays the selected sound
                                                        }}
                                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-400 dark:hover:bg-blue-600
                                                            ${localSelectedAlert === option.file ? 'font-bold bg-gray-400 dark:bg-blue-600' : 'font-normal'}`}
                                                    >
                                                        {option.label}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Modal Footer */}
                <div className='flex gap-4 px-8 pt-4 pb-7'>
                    <button onClick={handleReset} className="px-4 py-2 mr-auto text-md font-bold rounded-3xl bg-dark hover:bg-danger text-danger hover:text-white border border-danger">
                        Reset all
                    </button>
                    <button onClick={onClose} className="px-4 py-2 text-md font-bold rounded-3xl bg-gray-700 text-white hover:bg-gray-600">
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        className={`px-4 py-2 text-md font-bold rounded-3xl bg-${selectedColor} text-white`}
                    >
                        Save changes
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsModal;