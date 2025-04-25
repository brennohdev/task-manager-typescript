"use client"

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Calendar1Icon, SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go';
import { useWorkspaceId } from '@/features/workspace/hooks/useWorkspaceId';

const routes = [
  {
    label: 'Dashboard',
    href: '',
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: 'Tasks',
    href: '/tasks',
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: 'Members',
    href: '/members',
    icon: UserIcon,
    activeIcon: UserIcon,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      {routes.map((item) => {
        const fullHref = `/workspace/${workspaceId}${item.href}`
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={fullHref}>
            <div
              className={cn(
                'flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:bg-slate-200 transition text-black',
                isActive && 'bg-slate-300 shadow-lg hover:opacity-100 text-primary',
              )}
            >
              <Icon className="size-5 text-blue-700" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
