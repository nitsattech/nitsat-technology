import Navigation from "@/components/navigation"
import Hero3D from "@/components/hero-3d";
import {Services} from "@/components/services";
import About from "@/components/about";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero3D />
      <Services />
      <About />
      <Contact />
      
    </main>
  );
}