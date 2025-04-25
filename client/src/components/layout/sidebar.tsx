'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DottedSeparator } from '../separator';
import { Navigation } from './navigation';
import { WorkspaceSwitcher } from './workspaceSwitcher';
import { Projects } from './projects';

export const Sidebar = () => {
  return (
    <aside className="flex flex-col h-full min-w-60 p-4 bg-gray-100 border-r border-gray-300 shadow-sm rounded-tr-2xl rounded-br-2xl overflow-y-auto">
      {/* Logo */}
      <div className="flex justify-center pb-4">
        <Link href="/" className="transition hover:opacity-80">
          <Image src="/logo.svg" alt="Logo" width={125} height={30} />
        </Link>
      </div>

      <DottedSeparator className="my-4" />

      {/* Workspace Selector */}
      <div className="mb-2">
        <WorkspaceSwitcher />
      </div>

      {/* Navigation Menu */}
      <Navigation />

      <DottedSeparator className="my-4" />

      {/* Projects Section */}
      <Projects />
    </aside>
  );
};
