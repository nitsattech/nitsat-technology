"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, MeshDistortMaterial, Stars } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRef, useState } from "react"
import type * as THREE from "three"
import { CompanyModal } from "./company-modal"

function ParticleRing() {
  const ringRef = useRef<THREE.Group>(null)
  const particlesCount = 50

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={ringRef}>
      {Array.from({ length: particlesCount }).map((_, i) => {
        const angle = (i / particlesCount) * Math.PI * 2
        const radius = 5
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#3b82f6"}
              emissive={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#3b82f6"}
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
    </mesh>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
      <pointLight position={[10, -10, 5]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#3b82f6" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Central animated sphere */}
      <CentralSphere />

      {/* Particle ring */}
      <ParticleRing />

      {/* Floating geometric shapes with enhanced colors */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 1, -2]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial
            color="#8b5cf6"
            speed={2}
            distort={0.4}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#8b5cf6"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[3, -1, -1]}>
          <torusGeometry args={[0.6, 0.3, 16, 100]} />
          <MeshDistortMaterial
            color="#06b6d4"
            speed={2}
            distort={0.4}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#06b6d4"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[0, 2, -3]}>
          <octahedronGeometry args={[0.8]} />
          <MeshDistortMaterial
            color="#3b82f6"
            speed={2}
            distort={0.5}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#3b82f6"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-2, -2, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color="#a78bfa"
            speed={2}
            distort={0.3}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#a78bfa"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1} floatIntensity={2.2}>
        <mesh position={[2.5, 1.5, -2]}>
          <coneGeometry args={[0.5, 1, 32]} />
          <MeshDistortMaterial
            color="#0ea5e9"
            speed={2}
            distort={0.4}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#0ea5e9"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.9} rotationIntensity={1.3} floatIntensity={2.1}>
        <mesh position={[-1.5, 0.5, 1]}>
          <dodecahedronGeometry args={[0.6]} />
          <MeshDistortMaterial
            color="#ec4899"
            speed={2}
            distort={0.35}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#ec4899"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={2.3} rotationIntensity={0.9} floatIntensity={1.9}>
        <mesh position={[1, -1.5, -0.5]}>
          <tetrahedronGeometry args={[0.7]} />
          <MeshDistortMaterial
            color="#14b8a6"
            speed={2}
            distort={0.45}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#14b8a6"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <Environment preset="night" />
    </>
  )
}

export function Hero3D() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-transparent bg-clip-text rounded-full border border-purple-500/30 animate-glow">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Innovation in Technology
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            NITSAT{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 animate-gradient bg-clip-text text-transparent">
              TECHNOLOGY
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl leading-relaxed">
            Empowering businesses with cutting-edge technology support and innovative solutions for a digital future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-base group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-gradient hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-110 hover:rotate-1"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="text-base relative overflow-hidden bg-transparent border-2 border-purple-500/50 hover:bg-purple-500/10 hover:border-cyan-500/50 hover:scale-105 hover:-rotate-1 transition-all duration-500 group"
            >
              <span className="relative z-10">Learn More</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background pointer-events-none" />

      {/* Company Modal */}
      <CompanyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
