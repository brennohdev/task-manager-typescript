import { cn } from '@/lib/utils';
import { SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go';

const routes = [
  {
    label: 'Home',
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
  return (
    <div className="flex flex-col">
      {routes.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                'flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:bg-slate-300 transition text-blue-950',
                isActive && 'bg-slate-400 shadow-lg hover:opacity-100 text-primary',
              )}
            >
              <Icon className="size-5 text-blue-600" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
