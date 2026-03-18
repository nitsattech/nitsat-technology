import { Hero3D } from "@/components/hero-3d"
import { HealthcareHmsSolution } from "@/components/healthcare-hms-solution"
import { Services } from "@/components/services"
import { OurProduct } from "@/components/our-product"
import { Leadership } from "@/components/leadership"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero3D />
      <HealthcareHmsSolution />
      <Services />
      <OurProduct />
      <Leadership />
      <About />
      <Contact />
    </main>
  )
}
