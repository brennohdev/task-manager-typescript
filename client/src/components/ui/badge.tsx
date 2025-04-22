import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { TaskStatusEnum, TaskPriorityEnum } from '@/domain/enums/taskEnums';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        [TaskStatusEnum.TODO]: 'border-transparent bg-rose-400 text-primary hover:bg-rose-400/80',
        [TaskStatusEnum.IN_PROGRESS]:
          'border-transparent bg-emerald-400 text-primary hover:bg-emerald-400/80',
        [TaskStatusEnum.IN_REVIEW]:
          'border-transparent bg-amber-200 text-primary hover:bg-amber-200/80',
        [TaskStatusEnum.BACKLOG]:
          'border-transparent bg-gray-300 text-primary hover:bg-gray-300/80',
        [TaskStatusEnum.DONE]:
          'border-transparent bg-sky-400 text-primary hover:bg-sky-400/80',
        [TaskPriorityEnum.LOW]: 'border-transparent bg-sky-200 text-primary hover:bg-sky-400/80',
        [TaskPriorityEnum.MEDIUM]:
          'border-transparent bg-sky-600 text-primary hover:bg-cyan-600/80',
        [TaskPriorityEnum.HIGH]: 'border-transparent bg-rose-500 text-primary hover:bg-cyan-800/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
