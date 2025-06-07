"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, Play, LogOut } from "lucide-react"
import { useAuth } from "../hooks/use-auth"
import MovieGrid from "./movie-grid"
import { useLanguage } from "../hooks/use-language"
import LanguageSwitcher from "./language-switcher"

export default function MainApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()
  const { t, isRTL } = useLanguage()

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${isRTL ? "font-arabic" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TeloPlay
              </h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t("app.search_movies")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Search className="w-5 h-5" />
              </Button>

              <LanguageSwitcher />

              <div className="relative">
                <Button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  variant="ghost"
                  className="flex items-center gap-2 text-white hover:bg-gray-800"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-white font-medium">{user?.name}</p>
                      <p className="text-gray-400 text-sm">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                        {user?.subscription === "premium" ? t("common.premium") : t("common.free")}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex items-center justify-center text-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t("app.welcome_teloplay")}
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">{t("app.stream_description")}</p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3">
                  {t("app.start_watching")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Movies Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">{t("app.popular_movies")}</h3>
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
              {t("app.view_all")}
            </Button>
          </div>
          <MovieGrid />
        </section>

        {/* Additional Sections */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">{t("app.recently_added")}</h3>
          <MovieGrid />
        </section>
      </main>
    </div>
  )
}
