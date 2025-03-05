import { useState } from 'react';
import { useTimer } from '../context/TimerContext';

const SettingsModal = ({ onClose }) => {
    const { durations, setDurations } = useTimer();

    const [localDurations, setLocalDurations] = useState(durations);
    const [selectedColor, setSelectedColor] = useState('purple');

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
        // TODO: handle color change later
        onClose();
    };

    const handleReset = () => {
        setLocalDurations({
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15,
        });

    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-dark text-white rounded-3xl flex flex-col w-full max-w-[600px] min-h-[400px] relative overflow-hidden">
                {/* Modal Header */}
                <div className='flex justify-between items-center px-8 py-5'>
                    <h2 className="text-2xl font-bold">Settings</h2>
                    <button
                        className="w-10 h-10 text-3xl text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200"
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
                                className={`block w-full text-left py-2 px-3 text-md font-medium transition
                                    ${selectedTab === item ? 'text-white border-b-2 border-white' : 'text-text hover:text-white'}`}
                                onClick={() => setSelectedTab(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Modal Body - Content */}
                    <div className='flex-1 p-6'>
                        {selectedTab === 'Timers' && (
                            <div className="space-y-4">
                                {['pomodoro', 'shortBreak', 'longBreak'].map((type) => (
                                    <div key={type}>
                                        <label className='block text-md mb-2'>{type.charAt(0).toUpperCase() + type.slice(1)} (minutes)</label>
                                        <input
                                            type="number"
                                            value={localDurations[type]}
                                            onChange={(e) => handleChange(type, e.target.value)}
                                            className="w-24 px-2 py-1 rounded-md bg-dark text-white border border-white font-bold focus:outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {selectedTab === 'Theme Color' && (
                            <div className="space-y-4">
                                <label className="block text-md mb-3 font-medium">Choose Theme Color</label>
                                <div className="flex gap-4 mx-4">
                                    {/* Temporary color selection */}
                                    {['purple', 'blue', 'red'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-md border-2 ${selectedColor === color ? 'border-white' : 'border-transparent'}`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Modal Footer */}
                <div className='flex gap-4 px-8 pt-4 pb-7'>
                    <button onClick={handleReset} className="px-4 py-2 mr-auto text-md font-bold rounded-3xl bg-dark hover:bg-[#dc3545] text-[#dc3545] hover:text-white border border-[#dc3545]">
                        Reset all
                    </button>
                    <button onClick={onClose} className="px-4 py-2 text-md font-bold rounded-3xl bg-gray-700 text-white hover:bg-gray-600">
                        Close
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-md font-bold rounded-3xl bg-theme-purple text-white hover:bg-purple-700"
                    >
                        Save changes
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsModal;