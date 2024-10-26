import clsx from 'clsx';
import { memo } from 'preact/compat';

interface RippleProps {
    mainCircleSize?: number;
    mainCircleOpacity?: number;
    numCircles?: number;
    className?: string;
}

export const Ripple = memo(function Ripple({
    mainCircleSize = 20,
    mainCircleOpacity = 0.02,
    numCircles = 8,
    className,
}: RippleProps) {
    return (
        <div
            className={clsx(
                "absolute -top-1/2 -left-1/2 translate-x-1/2 translate-y-1/2 flex justify-center items-center w-full h-full pointer-events-none select-none z-0",
                className
            )}
        >
            {Array.from({ length: numCircles }, (_, i) => {
                const size = mainCircleSize + i * 70;
                const opacity = mainCircleOpacity - i * 0.01;
                const animationDelay = `${i * 0.06}s`;
                const borderStyle = i === numCircles - 1 ? "border-dashed" : "border-solid";
                const borderOpacity = 5 + i * 5;

                return (
                    <div
                        key={i}
                        className={clsx(
                            "absolute animate-ripple rounded-full bg-moderateBlue/5 shadow-xl h-full",
                            borderStyle
                        )}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity,
                            animationDelay,
                            borderWidth: "1px",
                            borderColor: `hsl(238 40% 52%), ${borderOpacity / 100}`,
                        }}
                    />
                );
            })}
        </div>
    );
});

Ripple.displayName = "Ripple";
