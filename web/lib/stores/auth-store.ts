import { create } from 'zustand'
import { loginLoginAccessToken, loginTestToken } from '@/lib/api/login/login'
import { usersReadUserMe } from '@/lib/api/users/users'
import type { Token, UserPublic } from '@/lib/api/models'

interface AuthState {
  // State
  user: UserPublic | null
  token: string | null
  isLoading: boolean
  error: string | null
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => Promise<boolean>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  isLoading: false,
  error: null,

  // Login action
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await loginLoginAccessToken({
        username,
        password,
        grant_type: 'password'
      })
      
      if (response.status === 200) {
        const { access_token } = response.data
        
        // Store token in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', access_token)
        }
        
        // Get user data
        const userResponse = await usersReadUserMe()
        
        if (userResponse.status === 200) {
          set({
            user: userResponse.data,
            token: access_token,
            isLoading: false,
            error: null
          })
          return true
        }
      }
      
      set({ isLoading: false, error: 'Login failed' })
      return false
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      })
      return false
    }
  },

  // Logout action
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
    }
    set({
      user: null,
      token: null,
      isLoading: false,
      error: null
    })
  },

  // Check authentication status
  checkAuth: async () => {
    const { token } = get()
    if (!token) return false
    
    try {
      const response = await loginTestToken()
      
      if (response.status === 200) {
        const userResponse = await usersReadUserMe()
        
        if (userResponse.status === 200) {
          set({ user: userResponse.data })
          return true
        }
      }
      
      // Token is invalid, clear it
      get().logout()
      return false
    } catch (error) {
      // Token is invalid, clear it
      get().logout()
      return false
    }
  },

  // Clear error
  clearError: () => {
    set({ error: null })
  }
})) 