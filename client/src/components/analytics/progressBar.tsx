'use client';

import { Progress } from '../ui/progress';

interface ProgressBarProps {
  value: number;
  label: string;
}

const ProgressBar = ({ value, label }: ProgressBarProps) => {
  let progressColor = 'bg-blue-800';

  if (value >= 75) {
    progressColor = 'bg-blue-500';
  } else if (value >= 40) {
    progressColor = 'bg-blue-500';
  } else {
    progressColor = 'bg-blue-500';
  }

  return (
    <div className="flex flex-col items-center w-full mt-4 gap-2 sm:gap-4">
      <div className="text-sm font-medium text-zinc-600">{label}</div>
      <div className="w-4/5 sm:w-2/3 md:w-1/2">
        <Progress value={value} max={100} className={`h-2 sm:h-3 rounded-full ${progressColor}`} />
      </div>
      <div className="w-4/5 sm:w-2/3 md:w-1/2 flex justify-between text-xs text-zinc-500 mt-2">
        <span className="pl-1">0%</span>
        <span className="text-center">{value}%</span>
        <span className="pr-1">100%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
