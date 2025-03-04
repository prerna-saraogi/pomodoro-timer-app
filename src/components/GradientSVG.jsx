
const GradientSVG = ({ idCSS, startColor, endColor, rotation = 90 }) => {
    const gradientTransform = `rotate(${rotation})`;
    return (
        <svg style={{ height: 0 }}>
            <defs>
                <linearGradient id={idCSS} gradientTransform={gradientTransform}>
                    <stop offset="0%" stopColor={startColor} />
                    <stop offset="100%" stopColor={endColor} />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default GradientSVG;
