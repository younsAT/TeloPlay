"use client"

import { useState } from "react"
import { Star, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import MoviePlayer from "./movie-player"
import type { Movie } from "../types/user"

const movies: Movie[] = [
  {
    id: "1",
    title: "Justice Society",
    year: "2021",
    rating: 4.2,
    quality: "HD",
    poster: "/placeholder.svg?height=300&width=200",
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
    poster: "/placeholder.svg?height=300&width=200",
    trailer: "",
    duration: "1h 54m",
    genre: ["Comedy", "Adventure"],
    description: "Barbie embarks on an adventure in the real world.",
  },
  {
    id: "3",
    title: "Age of Heroes",
    year: "2024",
    rating: 4.5,
    quality: "HD",
    poster: "/placeholder.svg?height=300&width=200",
    trailer: "",
    duration: "2h 30m",
    genre: ["Action", "Sci-Fi"],
    description: "In a world where heroes are needed most, a new generation rises.",
  },
  {
    id: "4",
    title: "Stand by Me",
    year: "1986",
    rating: 4.7,
    quality: "HD",
    poster: "/placeholder.svg?height=300&width=200",
    trailer: "",
    duration: "1h 29m",
    genre: ["Drama", "Adventure"],
    description: "Four boys embark on a journey to find a missing person.",
  },
  {
    id: "5",
    title: "The Shining",
    year: "1980",
    rating: 4.6,
    quality: "4K",
    poster: "/placeholder.svg?height=300&width=200",
    trailer: "",
    duration: "2h 26m",
    genre: ["Horror", "Thriller"],
    description: "A family heads to an isolated hotel where sinister forces await.",
  },
  {
    id: "6",
    title: "The Elephant Man",
    year: "1980",
    rating: 4.4,
    quality: "HD",
    poster: "/placeholder.svg?height=300&width=200",
    trailer: "",
    duration: "2h 4m",
    genre: ["Drama", "Biography"],
    description: "The story of John Merrick, a severely deformed man in Victorian London.",
  },
]

export default function MovieGrid() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredMovie(movie.id)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800 transition-transform duration-300 group-hover:scale-105">
              <img src={movie.poster || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />

              {/* Quality Badge */}
              <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded font-bold">
                {movie.quality}
              </div>

              {/* Rating */}
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-white">{movie.rating}</span>
              </div>

              {/* Hover Overlay */}
              {hoveredMovie === movie.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedMovie(movie)}
                      className="bg-purple-500 hover:bg-purple-600 rounded-full w-12 h-12 p-0"
                    >
                      <Play className="w-5 h-5 ml-1" />
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white hover:text-black rounded-full w-12 h-12 p-0"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Movie Info */}
            <div className="mt-3">
              <h3 className="text-white font-medium text-sm truncate">{movie.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-xs">{movie.year}</span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-gray-400 text-xs">{movie.duration}</span>
              </div>
              <div className="flex gap-1 mt-1">
                {movie.genre.slice(0, 2).map((g) => (
                  <span key={g} className="text-purple-400 text-xs bg-purple-500/20 px-2 py-1 rounded">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Movie Player Modal */}
      {selectedMovie && <MoviePlayer movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  )
}
