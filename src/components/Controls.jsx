import { useState } from 'react';
import { useTimer } from '../context/TimerContext';
import { useTheme } from '../context/ThemeContext';
import useSound from '../hooks/useSound';

const ResetIcon = ({ className = '' }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="arcs"
    >
        <path d="M2.5 2v6h6M2.66 15.57a10 10 0 1 0 .57-8.38" />
    </svg>
);

const SettingsIcon = ({ className = '' }) => (
    <svg
        className={className}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.0378 15.365L26.9654 17.682C27.229 17.899 27.3054 18.2771 27.1318 18.578L24.3568 23.429C24.1834 23.73 23.8226 23.849 23.5104 23.73L20.0555 22.323C19.341 22.883 18.557 23.345 17.7106 23.702L17.1903 27.412C17.1348 27.741 16.8504 28 16.5035 28H10.9535C10.6066 28 10.3221 27.741 10.2666 27.412L9.74633 23.702C8.89997 23.345 8.11604 22.8761 7.40145 22.323L3.94654 23.73C3.63435 23.856 3.27364 23.73 3.10018 23.429L0.325132 18.578C0.151671 18.27 0.228028 17.892 0.491634 17.682L3.41927 15.365C3.36379 14.917 3.32216 14.462 3.32216 14C3.32216 13.538 3.36379 13.083 3.41927 12.635L0.491634 10.318C0.228028 10.101 0.151671 9.72302 0.325132 9.42199L3.10025 4.57099C3.27364 4.26996 3.63442 4.15098 3.94661 4.26996L7.40152 5.67697C8.11604 5.11699 8.90003 4.65499 9.74639 4.29799L10.2667 0.588001C10.3222 0.259022 10.6067 0 10.9535 0H16.5036C16.8504 0 17.1348 0.259022 17.1973 0.588001L17.7177 4.29799C18.564 4.65499 19.3479 5.12394 20.0625 5.67697L23.5174 4.26996C23.8296 4.14396 24.1903 4.26996 24.3638 4.57099L27.1389 9.42199C27.3123 9.72997 27.236 10.108 26.9724 10.318L24.0378 12.635C24.0932 13.083 24.1349 13.538 24.1349 14C24.1349 14.462 24.0932 14.917 24.0378 15.365ZM8.8722 14C8.8722 16.709 11.0437 18.9 13.7285 18.9C16.4134 18.9 18.5848 16.7091 18.5848 14.0001C18.5848 11.2911 16.4134 9.10004 13.7285 9.10004C11.0437 9.10004 8.8722 11.291 8.8722 14Z"
        />
    </svg>
);

const Controls = ({ onSettingsClick }) => {
    const { isRunning, setIsRunning, resetTimer } = useTimer();
    const [isRotating, setIsRotating] = useState(false);

    const { selectedTheme } = useTheme();
    const playStart = useSound('startAlert.mp3');
    const playPause = useSound('pauseAlert.mp3');

    const handleStartStop = () => {
        isRunning ? playPause() : playStart();
        setIsRunning((prev) => !prev);
    };

    const handleReset = () => {
        resetTimer();
        setIsRunning(false);
        setIsRotating(true);
        setTimeout(() => setIsRotating(false), 1000);
    };

    return (
        <div className="flex justify-center items-center gap-10 my-10 ">
            <button
                onClick={handleReset}
                aria-label="Reset Timer"
                title="Reset"
                className="focus:outline-none"
            >
                <ResetIcon className={`w-7 h-7 ${isRotating ? 'rotate-once' : ''} text-textDark dark:text-textLight dark:hover:text-white`} />
            </button>
            <button
                onClick={handleStartStop}
                className={`text-white px-6 py-2 rounded-full text-lg font-bold min-w-32 bg-${selectedTheme} 
                hover:opacity-90 active:scale-95 
                transform transition duration-300 focus:outline-none`}
            >
                {isRunning ? 'Pause' : 'Start'}
            </button>

            <button
                onClick={onSettingsClick}
                aria-label="Open Settings"
                title="Settings"
                className="hover:scale-125 hover:rotate-45 transition-transform duration-300 focus:outline-none"
            >
                <SettingsIcon className="w-7 h-7 text-textDark dark:text-textLight dark:hover:text-white" />
            </button>

        </div>
    );
};

export default Controls;
