import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardDescription, CardTitle } from '../ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface AnalyticsCardProps {
  title: string;
  value: number;
  variant: 'up' | 'down';
  increaseValue: number;
}

export const AnalyticsCard = ({ title, value, variant, increaseValue }: AnalyticsCardProps) => {
  const iconColor = variant === 'up' ? 'text-teal-800' : 'text-red-800';
  const increaseValueColor = variant === 'up' ? 'text-teal-800' : 'text-red-800';
  const Icon = variant === 'up' ? TrendingUp : TrendingDown;

  const isPercentage = ['Completed tasks', 'Overdue tasks', 'Incomplete tasks'].includes(title);

  // Tooltip messages
  let tooltipMessage = '';

  if (title === 'Total tasks') {
    tooltipMessage =
      increaseValue > 0
        ? `${increaseValue} more tasks completed than overdue`
        : increaseValue === 0
          ? 'Same number of completed and overdue tasks'
          : `${Math.abs(increaseValue)} more tasks overdue than completed`;
  } else if (title === 'Completed tasks') {
    tooltipMessage = `${increaseValue}% of tasks have been completed`;
  } else if (title === 'Overdue tasks') {
    tooltipMessage = `${increaseValue}% of tasks are overdue`;
  } else if (title === 'Incomplete tasks') {
    tooltipMessage = `${increaseValue}% of tasks are incomplete but not overdue`;
  }

  return (
    <Card className="bg-gray-100 w-full border border-gray-200 shadow-sm rounded-xl">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
            <span className="truncate text-base">{title}</span>
          </CardDescription>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-x-1 cursor-help">
                  <Icon className={cn(iconColor, 'size-4')} />
                  <span className={cn(increaseValueColor, 'truncate text-base font-medium')}>
                    {isPercentage ? `${increaseValue}%` : Math.abs(increaseValue)}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">{tooltipMessage}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};
