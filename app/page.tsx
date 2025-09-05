import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Globe, Eye, Zap, Navigation, Headphones } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/RegenCreatives/test-repo/refs/heads/master/Your%20website%20is%20a%20couch%20potato.mp4?height=800&width=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-purple-100 text-purple-800">
              Interactive 3D Experience
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Explore Our
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Solar System
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Journey through space with our immersive 3D visualization. Discover planets, moons, and celestial objects
              in stunning detail with VR support and guided tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/solar-system">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Launch Explorer
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Discover the Universe</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our solar system explorer offers cutting-edge features for an unforgettable cosmic journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Interactive 3D Planets</CardTitle>
                <CardDescription className="text-gray-300">
                  Explore all planets, dwarf planets, and major moons with detailed information and realistic rendering
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
              <CardHeader>
                <Navigation className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">Guided Tours</CardTitle>
                <CardDescription className="text-gray-300">
                  Take a comprehensive tour through the solar system with educational content and smooth camera
                  transitions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
              <CardHeader>
                <Headphones className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">VR & AR Ready</CardTitle>
                <CardDescription className="text-gray-300">
                  Experience the solar system in virtual and augmented reality for the ultimate immersive experience
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">Real-time Simulation</CardTitle>
                <CardDescription className="text-gray-300">
                  Watch planets orbit in real-time with adjustable speed controls and pause functionality
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
              <CardHeader>
                <Eye className="h-12 w-12 text-red-400 mb-4" />
                <CardTitle className="text-white">Detailed Information</CardTitle>
                <CardDescription className="text-gray-300">
                  Click on any celestial object to learn fascinating facts and scientific details
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors">
              <CardHeader>
                <Rocket className="h-12 w-12 text-orange-400 mb-4" />
                <CardTitle className="text-white">Asteroid Belt & Beyond</CardTitle>
                <CardDescription className="text-gray-300">
                  Explore the asteroid belt, Kuiper belt objects, and the theoretical Oort cloud
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Solar System Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What You'll Discover</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From the scorching surface of Mercury to the icy depths of the Oort Cloud
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Mercury", color: "bg-gray-400", description: "Closest to the Sun" },
              { name: "Venus", color: "bg-orange-400", description: "Hottest planet" },
              { name: "Earth", color: "bg-blue-500", description: "Our home planet" },
              { name: "Mars", color: "bg-red-500", description: "The Red Planet" },
              { name: "Jupiter", color: "bg-yellow-600", description: "Largest planet" },
              { name: "Saturn", color: "bg-yellow-400", description: "Beautiful rings" },
              { name: "Uranus", color: "bg-cyan-400", description: "Tilted ice giant" },
              { name: "Neptune", color: "bg-blue-600", description: "Windiest planet" },
            ].map((planet) => (
              <Card
                key={planet.name}
                className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-all hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${planet.color} mx-auto mb-4 shadow-lg`}></div>
                  <h3 className="text-white font-semibold text-lg mb-2">{planet.name}</h3>
                  <p className="text-gray-400 text-sm">{planet.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore the Cosmos?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Embark on an educational journey through our solar system. Perfect for students, educators, and space
            enthusiasts.
          </p>
          <Link href="/solar-system">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <Rocket className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">Built with Three.js, WebXR, and modern web technologies</p>
          <p className="text-gray-500 mt-2">© 2024 Solar System Explorer. Educational use encouraged.</p>
        </div>
      </footer>
    </div>
  )
}
