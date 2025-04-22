
import { cn } from '@/lib/utils';

interface TaskDateProps {
  value: string;
  classname?: string;
}

export const TaskDate = ({ value, classname }: TaskDateProps) => {
    
  const today = new Date();
  const endDate = new Date(value!); // Converte o valor para objeto Date
  const diffInTime = endDate.getTime() - today.getTime(); // Diferença em milissegundos
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)); // Converte milissegundos para dias

  let textColor = 'text-muted-foreground';
  if (diffInDays <= 3) {
    textColor = 'text-red-500';
  } else if (diffInDays <= 7) {
    textColor = 'text-orange-500';
  } else if (diffInDays <= 14) {
    textColor = 'text-yellow-500';
  }

  // Formatar data (como "MMM dd, yyyy")
  const formattedDate = `${endDate.toLocaleString('default', { month: 'short' })} ${endDate.getDate()}, ${endDate.getFullYear()}`;

  return (
    <div className={textColor}>
      <span>{formattedDate}</span> {/* Mostra a data formatada */}
    </div>
  );
};
