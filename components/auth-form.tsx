"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Mail, Lock, User } from "lucide-react"
import { useAuth } from "../hooks/use-auth"
import { useLanguage } from "../hooks/use-language"
import LanguageSwitcher from "./language-switcher"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [isAdminLogin, setIsAdminLogin] = useState(false)
  const [adminUsername, setAdminUsername] = useState("")
  const [adminPassword, setAdminPassword] = useState("")

  const { login, signup, adminLogin } = useAuth()
  const { t, isRTL } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      let success = false
      if (isAdminLogin) {
        success = await adminLogin(adminUsername, adminPassword)
      } else if (isLogin) {
        success = await login(email, password)
      } else {
        success = await signup(email, password, name)
      }

      if (!success) {
        setError("Authentication failed. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 ${isRTL ? "font-arabic" : ""}`}
    >
      <Card className="w-full max-w-md bg-gray-900/90 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center gap-2 flex-1">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TeloPlay
              </h1>
            </div>
            <LanguageSwitcher />
          </div>
          <CardTitle className="text-white">{isLogin ? t("auth.welcome_back") : t("auth.create_account")}</CardTitle>
          <p className="text-gray-400">{isLogin ? t("auth.sign_in_continue") : t("auth.join_today")}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t("auth.full_name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="email"
                placeholder={t("auth.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                type="password"
                placeholder={t("auth.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm">{t("auth.auth_failed")}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? t("auth.please_wait") : isLogin ? t("auth.sign_in") : t("auth.create_account_btn")}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-red-400">{t("auth.admin_login")}</h3>
              <p className="text-sm text-gray-400">{t("auth.admin_only")}</p>
            </div>

            {!isAdminLogin ? (
              <Button
                type="button"
                onClick={() => setIsAdminLogin(true)}
                variant="outline"
                className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                {t("auth.access_admin")}
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-red-400" />
                  <Input
                    type="text"
                    placeholder={t("auth.admin_username")}
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="pl-10 bg-red-900/20 border-red-600 text-white placeholder-red-300"
                    required
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-red-400" />
                  <Input
                    type="password"
                    placeholder={t("auth.admin_password")}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="pl-10 bg-red-900/20 border-red-600 text-white placeholder-red-300"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading} className="flex-1 bg-red-600 hover:bg-red-700">
                    {loading ? t("auth.authenticating") : t("auth.admin_login_btn")}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsAdminLogin(false)
                      setAdminUsername("")
                      setAdminPassword("")
                      setError("")
                    }}
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-700"
                  >
                    {t("auth.cancel")}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-purple-400 hover:text-purple-300 text-sm">
              {isLogin ? t("auth.no_account") : t("auth.have_account")}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
