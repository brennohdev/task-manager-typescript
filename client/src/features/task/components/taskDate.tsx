
import { cn } from '@/lib/utils';

interface TaskDateProps {
  value: string;
  classname?: string;
}

export const TaskDate = ({ value, classname }: TaskDateProps) => {
    
  const today = new Date();
  const endDate = new Date(value!); 
  const diffInTime = endDate.getTime() - today.getTime(); 
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  let textColor = 'text-muted-foreground';
  if (diffInDays <= 3) {
    textColor = 'text-red-500';
  } else if (diffInDays <= 7) {
    textColor = 'text-orange-500';
  } else if (diffInDays <= 14) {
    textColor = 'text-yellow-500';
  }

  
  const formattedDate = `${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getDate()}, ${endDate.getFullYear()}`;

  return (
    <div className={textColor}>
      <span>{formattedDate}</span> 
    </div>
  );
};
