import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MemberAvatarProps {
  name: string;
  profilePicture?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export const MemberAvatar = ({
  name,
  profilePicture,
  className,
  fallbackClassName,
}: MemberAvatarProps) => {
  return (
    <Avatar
      className={cn(
        'size-10 transition border border-none neutrrelative rounded-md overflow-hidden',
        className,
      )}
    >
      {profilePicture && (
        <AvatarImage src={profilePicture} alt={name} className="object-cover w-full h-full" />
      )}
      <AvatarFallback
        className={cn('text-white bg-blue-600 font-semibold text-lg uppercase', fallbackClassName)}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
