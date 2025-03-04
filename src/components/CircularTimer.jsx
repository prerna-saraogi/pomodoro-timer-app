import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import GradientSVG from './GradientSVG';

const CircularTimer = ({ minutes, seconds, percentage }) => {
    const timeString = `${String(minutes).padStart(2, '0')}:${String(
        seconds
    ).padStart(2, '0')}`;

    const gradientId = 'progressGradient';
    const startColor = '#a084ff';
    const endColor = '#573288';

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
                <div className="flex items-center justify-center w-48 h-48 rounded-full bg-dark">
                    <span className="text-white text-3xl font-bold">{timeString}</span>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default CircularTimer;

