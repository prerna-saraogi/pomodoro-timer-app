import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GradientSVG from './GradientSVG';
import { useTheme } from '../context/ThemeContext';

const CircularTimer = ({ minutes, seconds, percentage }) => {
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const colorMap = {
        purple: { DEFAULT: '#573288', shade: '#a084ff' },
        red: { DEFAULT: '#ab4342', shade: '#9566cf' },
        green: { DEFAULT: '#355245', shade: '#648374' },
        rose: { DEFAULT: '#9b5372', shade: '#bf7896' },
        violet: { DEFAULT: '#4b1b8f', shade: '#c19af5' },
    };
    const gradientId = 'progressGradient';
    const { selectedTheme, mode } = useTheme();
    const startColor = colorMap[selectedTheme].shade; // shade color of theme
    const endColor = colorMap[selectedTheme].DEFAULT; // default color of theme

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
                <div className="flex items-center justify-center w-48 h-48 rounded-full bg-panelLight dark:bg-panelDark shadow-lg">
                    <span className="text-textDark dark:text-white text-3xl font-bold">{timeString}</span>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default CircularTimer;

