"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import type { User } from "../types/user"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  adminLogin: (username: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Add these admin credentials (you can change these)
  const ADMIN_CREDENTIALS = {
    username: "younsAvami",
    password: "younsAT55",
  }

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("teloplay-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        subscription: "premium",
      }
      setUser(mockUser)
      localStorage.setItem("teloplay-user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password && name) {
      const mockUser: User = {
        id: "1",
        email,
        name,
        subscription: "free",
      }
      setUser(mockUser)
      localStorage.setItem("teloplay-user", JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        id: "admin-1",
        email: "younsavami@teloplay.com",
        name: "Youns Avami",
        subscription: "premium",
        role: "admin",
      }
      setUser(adminUser)
      localStorage.setItem("teloplay-user", JSON.stringify(adminUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("teloplay-user")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, adminLogin, logout, loading }}>{children}</AuthContext.Provider>
  )
}
