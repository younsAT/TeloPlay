"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Film, Settings, BarChart3, Plus, Edit, Trash2, Eye, LogOut, Shield } from "lucide-react"
import { useAuth } from "../hooks/use-auth"
import type { Movie } from "../types/user"
import { useLanguage } from "../hooks/use-language"
import LanguageSwitcher from "./language-switcher"

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", subscription: "premium", joinDate: "2024-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", subscription: "free", joinDate: "2024-02-20" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", subscription: "premium", joinDate: "2024-03-10" },
]

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "Justice Society",
    year: "2021",
    rating: 4.2,
    quality: "HD",
    poster: "/placeholder.svg?height=200&width=150",
    trailer: "",
    duration: "2h 15m",
    genre: ["Action", "Adventure"],
    description: "A team of superheroes fights to save the world from evil forces.",
  },
  {
    id: "2",
    title: "Barbie: The Very Best",
    year: "2023",
    rating: 4.8,
    quality: "4K",
    poster: "/placeholder.svg?height=200&width=150",
    trailer: "",
    duration: "1h 54m",
    genre: ["Comedy", "Adventure"],
    description: "Barbie embarks on an adventure in the real world.",
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const { user, logout } = useAuth()
  const { t, isRTL } = useLanguage()

  const stats = {
    totalUsers: 1247,
    totalMovies: 856,
    activeSubscriptions: 892,
    monthlyRevenue: 45670,
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{t("admin.total_users")}</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{t("admin.total_movies")}</p>
                <p className="text-2xl font-bold text-white">{stats.totalMovies}</p>
              </div>
              <Film className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{t("admin.active_subscriptions")}</p>
                <p className="text-2xl font-bold text-white">{stats.activeSubscriptions}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{t("admin.monthly_revenue")}</p>
                <p className="text-2xl font-bold text-white">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{t("admin.recent_activity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-white">{t("admin.new_user_registered")}: john.doe@email.com</span>
              <span className="text-gray-400 text-sm ml-auto">2 {t("admin.minutes_ago")}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-white">
                {t("admin.movie_watched")} "Justice Society" {t("admin.times")} 45 {t("admin.times_watched")}
              </span>
              <span className="text-gray-400 text-sm ml-auto">1 {t("admin.hour_ago")}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-white">{t("admin.premium_subscription_purchased")}</span>
              <span className="text-gray-400 text-sm ml-auto">3 {t("admin.hours_ago")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderUsers = () => (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{t("admin.user_management")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 pb-3">{t("admin.name")}</th>
                <th className="text-left text-gray-400 pb-3">{t("admin.email")}</th>
                <th className="text-left text-gray-400 pb-3">{t("admin.subscription")}</th>
                <th className="text-left text-gray-400 pb-3">{t("admin.join_date")}</th>
                <th className="text-left text-gray-400 pb-3">{t("admin.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="py-3 text-white">{user.name}</td>
                  <td className="py-3 text-gray-300">{user.email}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.subscription === "premium"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {user.subscription}
                    </span>
                  </td>
                  <td className="py-3 text-gray-300">{user.joinDate}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/20">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-yellow-400 hover:bg-yellow-500/20">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/20">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )

  const renderMovies = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{t("admin.add_new_movie")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder={t("admin.movie_title")}
              value={newMovieTitle}
              onChange={(e) => setNewMovieTitle(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              {t("admin.add_movie")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{t("admin.movie_management")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-700 rounded-lg p-4">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-white font-medium mb-2">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  {movie.year} • {movie.duration}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-blue-500/20">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-yellow-400 hover:bg-yellow-500/20">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/20">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{t("admin.platform_settings")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div>
              <h4 className="text-white font-medium">{t("admin.maintenance_mode")}</h4>
              <p className="text-gray-400 text-sm">{t("admin.maintenance_mode_description")}</p>
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              {t("admin.disabled")}
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div>
              <h4 className="text-white font-medium">{t("admin.new_user_registration")}</h4>
              <p className="text-gray-400 text-sm">{t("admin.new_user_registration_description")}</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">{t("admin.enabled")}</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div>
              <h4 className="text-white font-medium">{t("admin.content_moderation")}</h4>
              <p className="text-gray-400 text-sm">{t("admin.content_moderation_description")}</p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">{t("admin.active")}</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">{t("admin.admin_credentials")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <h4 className="text-red-400 font-medium mb-2">{t("admin.current_credentials")}</h4>
            <p className="text-gray-300 text-sm mb-1">
              <strong>{t("common.username")}:</strong> younsAvami
            </p>
            <p className="text-gray-300 text-sm mb-3">
              <strong>{t("auth.password")}:</strong> younsAT55
            </p>
            <Button className="bg-red-600 hover:bg-red-700">{t("admin.change_credentials")}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${isRTL ? "font-arabic" : ""}`}>
      {/* Admin Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{t("admin.teloplay_admin")}</h1>
                <p className="text-gray-400 text-sm">{t("admin.admin_dashboard")}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-red-400 text-sm">{t("admin.administrator")}</p>
              </div>
              <Button onClick={logout} variant="ghost" className="text-red-400 hover:bg-red-500/20">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            <Button
              onClick={() => setActiveTab("overview")}
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              {t("admin.overview")}
            </Button>
            <Button
              onClick={() => setActiveTab("users")}
              variant={activeTab === "users" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Users className="w-4 h-4 mr-2" />
              {t("admin.users")}
            </Button>
            <Button
              onClick={() => setActiveTab("movies")}
              variant={activeTab === "movies" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Film className="w-4 h-4 mr-2" />
              {t("admin.movies")}
            </Button>
            <Button
              onClick={() => setActiveTab("settings")}
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Settings className="w-4 h-4 mr-2" />
              {t("admin.settings")}
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "users" && renderUsers()}
            {activeTab === "movies" && renderMovies()}
            {activeTab === "settings" && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  )
}
