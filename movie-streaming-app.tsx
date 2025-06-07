"use client"

import { Search, Menu, Star } from "lucide-react"

const movies = [
  {
    id: 1,
    title: "Justice Society",
    year: "2021",
    rating: 4.2,
    quality: "HD",
    poster: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 2,
    title: "Barbie: The Very Best",
    year: "2023",
    rating: 4.8,
    quality: "4K",
    poster: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 3,
    title: "Age of Heroes",
    year: "2024",
    rating: 4.5,
    quality: "HD",
    poster: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 4,
    title: "Stand by Me",
    year: "1986",
    rating: 4.7,
    quality: "HD",
    poster: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 5,
    title: "The Shining",
    year: "1980",
    rating: 4.6,
    quality: "4K",
    poster: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 6,
    title: "The Elephant Man",
    year: "1980",
    rating: 4.4,
    quality: "HD",
    poster: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 7,
    title: "Beauty and the Beast",
    year: "2017",
    rating: 4.3,
    quality: "BluRay 3D",
    poster: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 8,
    title: "Ready Player One",
    year: "2018",
    rating: 4.5,
    quality: "BluRay 3D",
    poster: "/placeholder.svg?height=200&width=150",
  },
  {
    id: 9,
    title: "Deadpool",
    year: "2016",
    rating: 4.6,
    quality: "BluRay 3D",
    poster: "/placeholder.svg?height=200&width=150",
  },
]

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-orange-500" />
          <div className="text-orange-500 font-bold text-lg">MOVIE.JAVAN</div>
        </div>
        <Menu className="w-6 h-6 text-orange-500" />
      </div>

      {/* Persian subtitle */}
      <div className="px-4 py-2 text-right text-sm text-gray-400">دسترسی برای همه</div>

      {/* Movie Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {movies.map((movie) => (
            <div key={movie.id} className="relative group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                {/* Quality Badge */}
                <div className="absolute top-2 left-2 bg-orange-500 text-black text-xs px-2 py-1 rounded font-bold">
                  {movie.quality}
                </div>

                {/* Rating */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-white">{movie.rating}</span>
                </div>
              </div>

              {/* Movie Info */}
              <div className="mt-2">
                <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile VR & TV Section */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="text-orange-500 text-sm font-bold">MOBILE VR</div>
            <div className="text-orange-500 text-sm">و</div>
            <div className="text-orange-500 text-sm font-bold">TV 3D</div>
            <div className="text-gray-400 text-sm">کیفیت عالی</div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {movies.slice(6, 9).map((movie) => (
              <div key={`vr-${movie.id}`} className="relative">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />

                  {/* BluRay 3D Badge */}
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-bold">
                    BluRay 3D
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-white">{movie.rating}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-sm font-medium text-white truncate">{movie.title}</h3>
                  <p className="text-xs text-gray-400">{movie.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className="flex justify-center gap-2 py-4">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  )
}
