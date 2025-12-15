import { Hero3D } from "@/components/hero-3d"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero3D />
      <Services />
      <About />
      <Contact />
    </main>
  )
}
