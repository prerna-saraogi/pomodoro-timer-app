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
        tomatoRed: { DEFAULT: '#922b21', shade: '#C05C5C' },
        green: { DEFAULT: '#0B3028', shade: '#1D5447' },
        blue: { DEFAULT: '#0b385f', shade: '#3373b0' },
        violet: { DEFAULT: '#5411AB', shade: '#c19af5' },
    };
    const gradientId = 'progressGradient';
    const { selectedTheme } = useTheme();
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
                    trailColor: '#232330',
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

