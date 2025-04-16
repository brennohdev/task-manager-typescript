'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isLogin = pathname === '/login';
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(false);
    const timeout = setTimeout(() => setShowContent(true), 100); // pequeno delay
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-scren-2x1 p-4">
        <nav className="flex justify-between items-center">
        </nav>

        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center pt-4 md:pt-40"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default AuthLayout;
