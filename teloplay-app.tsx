"use client"

import { AuthProvider, useAuth } from "./hooks/use-auth"
import AuthForm from "./components/auth-form"
import MainApp from "./components/main-app"
import AdminDashboard from "./components/admin-dashboard"
import { LanguageProvider } from "./hooks/use-language"
import { useLanguage } from "./hooks/use-language"

function AppContent() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg mb-4 inline-block">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-white">{t("app.loading")}</p>
        </div>
      </div>
    )
  }

  // Show admin dashboard for admin users
  if (user?.role === "admin") {
    return <AdminDashboard />
  }

  // Show main app for regular users, auth form for non-authenticated
  return user ? <MainApp /> : <AuthForm />
}

export default function TeloPlayApp() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  )
}
