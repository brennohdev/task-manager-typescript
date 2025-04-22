'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DottedSeparator } from '../separator';
import { Navigation } from './navigation';
import { WorkspaceSwitcher } from './workspaceSwitcher';
import { Projects } from './projects';

export const Sidebar = () => {
  return (
    <aside className="h-full bg-gray-100 border-r border-gray-300 p-4 min-w-60 flex flex-col shadow-sm rounded-tr-2xl rounded-br-2xl overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center justify-center pb-4">
        <Link href="/" className="hover:opacity-80 transition">
          <Image src="/logo.svg" alt="Logo" width={130} height={30} />
        </Link>
      </div>

      <DottedSeparator className="my-4" />

      {/* Workspace Switcher */}
      <div className="mb-2">
        <WorkspaceSwitcher />
      </div>

      <DottedSeparator className="my-4" />

      {/* Navigation */}
      <Navigation />

      <DottedSeparator className="my-4" />

      {/* Projects List */}
      <Projects />
    </aside>
  );
};
