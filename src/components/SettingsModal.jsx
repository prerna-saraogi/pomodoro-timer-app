import { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';

const SettingsModal = ({ onClose, wasRunningRef }) => {
    const { durations, setDurations, resetTimer } = useTimer();
    const { selectedTheme, setSelectedTheme } = useTheme();

    const [localDurations, setLocalDurations] = useState(durations);
    const [selectedColor, setSelectedColor] = useState(selectedTheme);

    const [selectedTab, setSelectedTab] = useState('Timers');
    const sidebarItems = [
        'Timers', 'Theme Color'
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
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-panelLight dark:bg-panelDark text-textDark dark:text-textLight rounded-3xl flex flex-col w-full max-w-[600px] min-h-[400px] relative overflow-hidden">
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
                    <div className='flex-1 p-6 font-bold dark:text-white'>
                        {selectedTab === 'Timers' && (
                            <div className="space-y-4">
                                {['pomodoro', 'shortBreak', 'longBreak'].map((type) => (
                                    <div key={type}>
                                        <label className='block mb-2'>{type.charAt(0).toUpperCase() + type.slice(1)} (minutes)</label>
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
                        {selectedTab === 'Theme Color' && (
                            <div className="space-y-4">
                                <label className="block text-md mb-3">Choose Theme Color</label>
                                <div className="flex gap-4 mx-4">

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