export interface User {
  id: string
  email: string
  name: string
  subscription: "free" | "premium"
  role: "user" | "admin"
}

export interface Movie {
  id: string
  title: string
  year: string
  rating: number
  quality: string
  poster: string
  trailer: string
  duration: string
  genre: string[]
  description: string
}

export interface AdminCredentials {
  username: string
  password: string
}
