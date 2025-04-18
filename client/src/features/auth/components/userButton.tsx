'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DottedSeparator } from '@/components/separator';
import { useLogout } from '../hooks/useLogout';
import { useCurrentUser } from '../repositories/userCurrent';
import { Loader, LogOut } from 'lucide-react';

export const UserButton = () => {
  const { data: user, isLoading } = useCurrentUser();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-slate-200 border border-slate-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email } = user;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-slate-300">
          <AvatarFallback className="bg-slate-200 font-medium text-slate-500 flex items-center justify-center">
            {name.charAt(0).toUpperCase() || email.charAt(0).toUpperCase() || 'U'}{' '}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] text-xl border border-slate-300">
            <AvatarFallback className="bg-slate-200 font-medium text-slate-500 flex items-center justify-center">
              {name.charAt(0).toUpperCase() || email.charAt(0).toUpperCase() || 'U'}{' '}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-slate-900">{name || 'User'}</p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={() => logout()}
          className="h-10 flex items-center justify-center text-sky-950 font-medium cursor-pointer"
        >
          <LogOut className="size-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
