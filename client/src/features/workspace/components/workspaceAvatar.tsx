import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface WorkspaceAvatarProps {
  name: string;
  className?: string;
}

export const WorkspaceAvatar = ({ name, className }: WorkspaceAvatarProps) => {
  return (
    <Avatar className={cn('size-10 relative rounded-md overflow-hidden')}>
      <AvatarFallback className="text-white bg-blue-800 font-semibold text-lg uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
