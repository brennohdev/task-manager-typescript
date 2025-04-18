"use client"

import Image from 'next/image';
import Link from 'next/link';
import { DottedSeparator } from '../separator';
import { MobileSideBar } from './mobileSidebar';
import { UserButton } from '@/features/auth/components/userButton';

export const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">Here you can watch all of your projects and tasks!!</p>
      </div>
      <MobileSideBar />
      <UserButton />
    </nav>
  );
};
