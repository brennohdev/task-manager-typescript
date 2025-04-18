

import { QueryProvider } from '@/features/auth/provider/providers'
import { AuthProvider } from '@/features/auth/provider/authProvider'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </QueryProvider>
  )
}