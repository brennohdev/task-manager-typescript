import Image from 'next/image';
import Link from 'next/link';
import { DottedSeparator } from '../separator';
import { Navigation } from './navigation';
import { UserButton } from '@/features/auth/components/userButton';
import { WorkspaceSwitcher } from './workspaceSwitcher';

export const Sidebar = () => {
  return (
    <aside className="h-full bg-slate-100 p-4 min-w-60 flex flex-col ">
      <div className="flex flex-col items-center justify-center">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={130} height={30} />
        </Link>
      </div>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />

      <Navigation />
    </aside>
  );
};
