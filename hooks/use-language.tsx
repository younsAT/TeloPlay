"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fa"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations = {
  en: {
    // Auth Form
    "auth.welcome_back": "Welcome Back",
    "auth.create_account": "Create Account",
    "auth.sign_in_continue": "Sign in to continue watching",
    "auth.join_today": "Join TeloPlay today",
    "auth.full_name": "Full Name",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.sign_in": "Sign In",
    "auth.create_account_btn": "Create Account",
    "auth.no_account": "Don't have an account? Sign up",
    "auth.have_account": "Already have an account? Sign in",
    "auth.admin_login": "Administrator Login",
    "auth.admin_only": "For system administrators only",
    "auth.access_admin": "Access Admin Panel",
    "auth.admin_username": "Admin Username",
    "auth.admin_password": "Admin Password",
    "auth.admin_login_btn": "Admin Login",
    "auth.cancel": "Cancel",
    "auth.authenticating": "Authenticating...",
    "auth.please_wait": "Please wait...",
    "auth.auth_failed": "Authentication failed. Please try again.",

    // Main App
    "app.search_movies": "Search movies...",
    "app.welcome_teloplay": "Welcome to TeloPlay",
    "app.stream_description": "Stream thousands of movies and TV shows in HD and 4K quality",
    "app.start_watching": "Start Watching",
    "app.popular_movies": "Popular Movies",
    "app.recently_added": "Recently Added",
    "app.view_all": "View All",
    "app.loading": "Loading TeloPlay...",

    // Movie Player
    "player.video_player": "Video Player",
    "player.click_play": "Click play to start watching",

    // Admin Dashboard
    "admin.teloplay_admin": "TeloPlay Admin",
    "admin.admin_dashboard": "Administrator Dashboard",
    "admin.administrator": "Administrator",
    "admin.overview": "Overview",
    "admin.users": "Users",
    "admin.movies": "Movies",
    "admin.settings": "Settings",
    "admin.total_users": "Total Users",
    "admin.total_movies": "Total Movies",
    "admin.active_subscriptions": "Active Subscriptions",
    "admin.monthly_revenue": "Monthly Revenue",
    "admin.recent_activity": "Recent Activity",
    "admin.user_management": "User Management",
    "admin.movie_management": "Movie Management",
    "admin.add_new_movie": "Add New Movie",
    "admin.movie_title": "Movie title",
    "admin.add_movie": "Add Movie",
    "admin.platform_settings": "Platform Settings",
    "admin.maintenance_mode": "Maintenance Mode",
    "admin.maintenance_desc": "Enable to temporarily disable user access",
    "admin.new_registration": "New User Registration",
    "admin.registration_desc": "Allow new users to create accounts",
    "admin.content_moderation": "Content Moderation",
    "admin.moderation_desc": "Automatic content filtering",
    "admin.admin_credentials": "Admin Credentials",
    "admin.current_credentials": "Current Admin Credentials",
    "admin.change_credentials": "Change Credentials",
    "admin.name": "Name",
    "admin.email": "Email",
    "admin.subscription": "Subscription",
    "admin.join_date": "Join Date",
    "admin.actions": "Actions",
    "admin.enabled": "Enabled",
    "admin.disabled": "Disabled",
    "admin.active": "Active",

    // Common
    "common.premium": "Premium",
    "common.free": "Free",
    "common.username": "Username",
    "common.language": "Language",
    "common.english": "English",
    "common.persian": "Persian",

    // Activity Messages
    "activity.new_user": "New user registered:",
    "activity.movie_watched": "was watched 45 times",
    "activity.subscription_purchased": "Premium subscription purchased",
    "activity.minutes_ago": "minutes ago",
    "activity.hour_ago": "hour ago",
    "activity.hours_ago": "hours ago",
  },
  fa: {
    // Auth Form
    "auth.welcome_back": "خوش آمدید",
    "auth.create_account": "ایجاد حساب کاربری",
    "auth.sign_in_continue": "برای ادامه تماشا وارد شوید",
    "auth.join_today": "همین امروز به تلوپلی بپیوندید",
    "auth.full_name": "نام کامل",
    "auth.email": "ایمیل",
    "auth.password": "رمز عبور",
    "auth.sign_in": "ورود",
    "auth.create_account_btn": "ایجاد حساب",
    "auth.no_account": "حساب کاربری ندارید؟ ثبت نام کنید",
    "auth.have_account": "حساب کاربری دارید؟ وارد شوید",
    "auth.admin_login": "ورود مدیران",
    "auth.admin_only": "فقط برای مدیران سیستم",
    "auth.access_admin": "دسترسی به پنل مدیریت",
    "auth.admin_username": "نام کاربری مدیر",
    "auth.admin_password": "رمز عبور مدیر",
    "auth.admin_login_btn": "ورود مدیر",
    "auth.cancel": "لغو",
    "auth.authenticating": "در حال احراز هویت...",
    "auth.please_wait": "لطفا صبر کنید...",
    "auth.auth_failed": "احراز هویت ناموفق. دوباره تلاش کنید.",

    // Main App
    "app.search_movies": "جستجوی فیلم...",
    "app.welcome_teloplay": "به تلوپلی خوش آمدید",
    "app.stream_description": "هزاران فیلم و سریال را با کیفیت HD و 4K تماشا کنید",
    "app.start_watching": "شروع تماشا",
    "app.popular_movies": "فیلم‌های محبوب",
    "app.recently_added": "اضافه شده اخیر",
    "app.view_all": "مشاهده همه",
    "app.loading": "در حال بارگذاری تلوپلی...",

    // Movie Player
    "player.video_player": "پخش کننده ویدیو",
    "player.click_play": "برای شروع تماشا کلیک کنید",

    // Admin Dashboard
    "admin.teloplay_admin": "مدیریت تلوپلی",
    "admin.admin_dashboard": "داشبورد مدیریت",
    "admin.administrator": "مدیر",
    "admin.overview": "نمای کلی",
    "admin.users": "کاربران",
    "admin.movies": "فیلم‌ها",
    "admin.settings": "تنظیمات",
    "admin.total_users": "کل کاربران",
    "admin.total_movies": "کل فیلم‌ها",
    "admin.active_subscriptions": "اشتراک‌های فعال",
    "admin.monthly_revenue": "درآمد ماهانه",
    "admin.recent_activity": "فعالیت‌های اخیر",
    "admin.user_management": "مدیریت کاربران",
    "admin.movie_management": "مدیریت فیلم‌ها",
    "admin.add_new_movie": "افزودن فیلم جدید",
    "admin.movie_title": "عنوان فیلم",
    "admin.add_movie": "افزودن فیلم",
    "admin.platform_settings": "تنظیمات پلتفرم",
    "admin.maintenance_mode": "حالت تعمیر",
    "admin.maintenance_desc": "برای غیرفعال کردن موقت دسترسی کاربران فعال کنید",
    "admin.new_registration": "ثبت نام کاربران جدید",
    "admin.registration_desc": "اجازه ایجاد حساب کاربری جدید",
    "admin.content_moderation": "نظارت بر محتوا",
    "admin.moderation_desc": "فیلتر خودکار محتوا",
    "admin.admin_credentials": "اطلاعات ورود مدیر",
    "admin.current_credentials": "اطلاعات ورود فعلی مدیر",
    "admin.change_credentials": "تغییر اطلاعات ورود",
    "admin.name": "نام",
    "admin.email": "ایمیل",
    "admin.subscription": "اشتراک",
    "admin.join_date": "تاریخ عضویت",
    "admin.actions": "عملیات",
    "admin.enabled": "فعال",
    "admin.disabled": "غیرفعال",
    "admin.active": "فعال",

    // Common
    "common.premium": "پریمیوم",
    "common.free": "رایگان",
    "common.username": "نام کاربری",
    "common.language": "زبان",
    "common.english": "انگلیسی",
    "common.persian": "فارسی",

    // Activity Messages
    "activity.new_user": "کاربر جدید ثبت نام کرد:",
    "activity.movie_watched": "۴۵ بار تماشا شد",
    "activity.subscription_purchased": "اشتراک پریمیوم خریداری شد",
    "activity.minutes_ago": "دقیقه پیش",
    "activity.hour_ago": "ساعت پیش",
    "activity.hours_ago": "ساعت پیش",
  },
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("teloplay-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fa")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("teloplay-language", lang)

    // Update document direction
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const isRTL = language === "fa"

  useEffect(() => {
    // Set initial direction
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language, isRTL])

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}
