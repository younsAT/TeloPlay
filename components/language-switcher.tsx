"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "../hooks/use-language"

interface LanguageSwitcherProps {
  variant?: "default" | "ghost"
  size?: "default" | "sm" | "lg"
}

export default function LanguageSwitcher({ variant = "ghost", size = "default" }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fa" : "en")
  }

  return (
    <Button onClick={toggleLanguage} variant={variant} size={size} className="flex items-center gap-2">
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">{language === "en" ? t("common.persian") : t("common.english")}</span>
    </Button>
  )
}
