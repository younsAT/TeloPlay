"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Play, Pause, Volume2, Maximize, SkipBack, SkipForward } from "lucide-react"
import type { Movie } from "../types/user"
import { useLanguage } from "../hooks/use-language"

interface MoviePlayerProps {
  movie: Movie
  onClose: () => void
}

export default function MoviePlayer({ movie, onClose }: MoviePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(7200) // 2 hours in seconds
  const { t } = useLanguage()

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div>
          <h1 className="text-white text-xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 text-sm">
            {movie.year} • {movie.duration}
          </p>
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Video Player Area */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Play className="w-16 h-16 text-white ml-2" />
            </div>
            <p className="text-white text-lg mb-2">{t("player.video_player")}</p>
            <p className="text-gray-400 text-sm">
              {t("player.click_play")} {movie.title}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-t from-black/90 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div
              className="bg-purple-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <SkipBack className="w-6 h-6" />
          </Button>

          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-purple-500 hover:bg-purple-600 rounded-full w-12 h-12"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <SkipForward className="w-6 h-6" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Volume2 className="w-6 h-6" />
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Maximize className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
