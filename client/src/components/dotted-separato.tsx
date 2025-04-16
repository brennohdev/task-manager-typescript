import { cn } from '@/lib/utils';

interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  dashLength?: string;
  gapSize?: string;
  direction?: 'horizontal' | 'vertical';
  animated?: boolean;
  speed?: string; // ex: '2s', '1s'
}

export const DottedSeparator = ({
  className,
  color = '#cbd5e1',
  height = '2px',
  dashLength = '8px',
  gapSize = '4px',
  direction = 'horizontal',
  animated = false,
  speed = '2s',
}: DottedSeparatorProps) => {
  const isHorizontal = direction === 'horizontal';
  const animationName = isHorizontal ? 'dash-scroll-x' : 'dash-scroll-y';

  return (
    <div
      className={cn(
        isHorizontal ? 'w-full flex items-center' : 'h-full flex flex-col items-center',
        className
      )}
    >
      <div
        className={cn(
          isHorizontal ? 'flex-grow' : 'flex-grow-0',
          animated && 'animated-dash'
        )}
        style={{
          width: isHorizontal ? '100%' : height,
          height: isHorizontal ? height : '100%',
          backgroundImage: isHorizontal
            ? `repeating-linear-gradient(to right, ${color}, ${color} ${dashLength}, transparent ${dashLength}, transparent calc(${dashLength} + ${gapSize}))`
            : `repeating-linear-gradient(to bottom, ${color}, ${color} ${dashLength}, transparent ${dashLength}, transparent calc(${dashLength} + ${gapSize}))`,
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
          animation: animated ? `${animationName} ${speed} linear infinite` : undefined,
        }}
      ></div>

      {/* Inline keyframes via global style */}
      <style jsx global>{`
        @keyframes dash-scroll-x {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: calc(${dashLength} + ${gapSize}) 0;
          }
        }

        @keyframes dash-scroll-y {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 calc(${dashLength} + ${gapSize});
          }
        }
      `}</style>
    </div>
  );
};
