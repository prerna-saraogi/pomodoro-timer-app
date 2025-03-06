import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GradientSVG from './GradientSVG';
import { useTheme } from '../context/ThemeContext';

const CircularTimer = ({ minutes, seconds, percentage }) => {
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const { selectedTheme, mode } = useTheme();

    const colorMap = {
        purple: { DEFAULT: '#573288', shade: '#a084ff' },
        red: { DEFAULT: '#ab4342', shade: '#9566cf' },
        green: { DEFAULT: '#355245', shade: '#648374' },
        rose: { DEFAULT: '#9b5372', shade: '#bf7896' },
        violet: { DEFAULT: '#4b1b8f', shade: '#c19af5' },
    };
    const gradientId = 'progressGradient';
    const startColor = colorMap[selectedTheme].shade;
    const endColor = colorMap[selectedTheme].DEFAULT;

    const glowColor = `${endColor}66`; // 40% opacity

    return (
        <div className="relative w-64 h-64 mx-auto my-10">
            <GradientSVG idCSS={gradientId} startColor={startColor} endColor={endColor} />

            <CircularProgressbarWithChildren
                value={percentage}
                strokeWidth={5}
                styles={buildStyles({
                    pathColor: `url(#${gradientId})`,
                    trailColor: mode === 'dark' ? '#282828' : '#CCCCCC',
                    strokeLinecap: 'round',
                })}

            >
                <div
                    className="flex items-center justify-center w-48 h-48 rounded-full animate-gradient-slow shadow-inner dark:shadow-none transition-all duration-700"
                    style={{
                        background: mode === 'dark'
                            ? 'linear-gradient(120deg, #1c1c1c, #282828)'
                            : 'linear-gradient(120deg, #d1d1d1, #CCCCCC)',
                        boxShadow: `0 0 105px 100px ${glowColor}`,
                        backgroundSize: '400% 400%',
                    }}
                >
                    <span className="text-textDark dark:text-white text-3xl font-bold">
                        {timeString}
                    </span>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default CircularTimer;

