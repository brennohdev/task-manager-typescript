'use client';

import { UserButton } from '@/features/auth/components/userButton';
import { MobileSideBar } from './mobileSidebar';

export const Navbar = () => {
  return (
    <nav className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border bg-background/60 backdrop-blur-md">
      {/* Left - Title and Description */}
      <div className="hidden lg:flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Home</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Keep track of all your projects and tasks in one place.
        </p>
      </div>

      {/* Right - Mobile Menu and User Button */}
      <div className="flex items-center gap-2">
        <MobileSideBar />
        <UserButton />
      </div>
    </nav>
  );
};
