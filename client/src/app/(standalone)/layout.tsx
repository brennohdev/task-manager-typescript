import { UserButton } from '@/features/auth/components/userButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface StandAloneLayoutProps {
  children: React.ReactNode;
}

const StandAloneLayout = ({ children }: StandAloneLayoutProps) => {
  return (
    <main className="bg-slate-100 min-h-screen">
      <div className='mx-auto max-w-screen p-4'>
        <nav className='flex justify-between items-center h-[73px]'>
            <Link href="/">
                <Image src="/logo.svg" alt='Logo' height={50} width={100}/>
            </Link>
            <UserButton />
        </nav>
        <div className="flex flex-co items-center justify-center py-4">{children}</div>
      </div>
    </main>
  );
};

export default StandAloneLayout;
