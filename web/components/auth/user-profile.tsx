'use client'

import { useAuthStore } from '@/lib/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, User } from 'lucide-react'

export function UserProfile() {
  const { user, logout } = useAuthStore()

  if (!user) {
    return null
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Account Details
        </CardTitle>
        <CardDescription>
          View and manage your profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Email</div>
          <div className="text-sm">{user.email}</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Name</div>
          <div className="text-sm">{user.full_name || 'No name provided'}</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">User ID</div>
          <div className="text-sm font-mono text-xs">{user.id}</div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Status</div>
          <div className="text-sm">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              user.is_active 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {user.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <Button 
          onClick={logout} 
          variant="destructive" 
          className="w-full"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </CardContent>
    </Card>
  )
} 