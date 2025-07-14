'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const { user, token, checkAuth } = useAuthStore()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        router.push('/login')
        return
      }

      if (!user) {
        const isAuthenticated = await checkAuth()
        if (!isAuthenticated) {
          router.push('/login')
          return
        }
      }

      setIsChecking(false)
    }

    verifyAuth()
  }, [token, user, checkAuth, router])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    )
  }

  return <>{children}</>
} 