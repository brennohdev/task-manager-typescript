'use client';

import { cn } from '@/lib/utils';

interface DottedSeparatorProps {
  className?: string;
  color?: string;
  height?: string;
  direction?: 'horizontal' | 'vertical';
}

export const DottedSeparator = ({
  className,
  color = '#cbd5e1',
  height = '2px',
  direction = 'horizontal',
}: DottedSeparatorProps) => {
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={cn(
        isHorizontal ? 'w-full' : 'h-full',
        'flex items-center justify-center',
        className,
      )}
    >
      <div
        style={{
          width: isHorizontal ? '100%' : height,
          height: isHorizontal ? height : '100%',
          backgroundColor: color,
          borderRadius: '9999px', // para deixar suave, como uma linha sutil
        }}
      />
    </div>
  );
};
