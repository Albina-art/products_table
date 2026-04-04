import { Text } from './GradientText.styles';

export function GradientText({ text, width, height, fontSize, className }: { text: string, width: string, height: string, fontSize: string, className?: string }) {
    return (
        <svg
            width={width}
            viewBox={`0 0 ${width.replace('px', '')} ${height.replace('px', '')}`}
            preserveAspectRatio="xMidYMid meet"
            className={className}
        >
            <defs>
                <filter id="loginSubtitleInnerShadow">
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite operator="arithmetic" k2="-1" k3="1" in2="SourceAlpha" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.17 0" />
                    <feBlend mode="normal" in2="SourceGraphic" />
                </filter>
            </defs>
            <Text $fontSize={fontSize} x="0" y="20" filter="url(#loginSubtitleInnerShadow)">
                {text}
            </Text>
        </svg>
    );
}
