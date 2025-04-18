'use client';

import { LoaderCircle } from 'lucide-react';
import { useAutoRedirectToWorkspace } from '@/features/workspace/hooks/useAutoRedirectToWorkspace';

export default function ClientRedirectPage() {
  useAutoRedirectToWorkspace();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        Redirecionando...
      </div>
    </div>
  );
}
