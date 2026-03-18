"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, MeshDistortMaterial, Stars } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight, BadgeCheck } from "lucide-react"
import { useRef, useState } from "react"
import type * as THREE from "three"
import { CompanyModal } from "./company-modal"

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const nodes = 30

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: nodes }).map((_, i) => {
        const theta = (i / nodes) * Math.PI * 2
        const radius = 6 + Math.sin(i * 0.5) * 2
        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius
        const y = Math.sin(i * 0.3) * 3

        return (
          <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={2}>
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial
                color={i % 3 === 0 ? "#0ea5e9" : i % 3 === 1 ? "#10b981" : "#38bdf8"}
                emissive={i % 3 === 0 ? "#0ea5e9" : i % 3 === 1 ? "#10b981" : "#38bdf8"}
                emissiveIntensity={0.8}
                metalness={1}
                roughness={0}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function DataStreams() {
  const linesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <group ref={linesRef}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 7
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.05, 12, 0.05]} />
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0ea5e9"
              emissiveIntensity={0.6}
              transparent
              opacity={0.4}
            />
          </mesh>
        )
      })}
    </group>
  )
}

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
              color={i % 3 === 0 ? "#0ea5e9" : i % 3 === 1 ? "#10b981" : "#38bdf8"}
              emissive={i % 3 === 0 ? "#0ea5e9" : i % 3 === 1 ? "#10b981" : "#38bdf8"}
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
      <MeshDistortMaterial color="#0ea5e9" attach="material" distort={0.5} speed={2} roughness={0.2} metalness={0.8} />
    </mesh>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#0ea5e9" />
      <pointLight position={[10, -10, 5]} intensity={1} color="#10b981" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#38bdf8" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <NeuralNetwork />
      <DataStreams />

      {/* Central animated sphere */}
      <CentralSphere />

      {/* Particle ring */}
      <ParticleRing />

      {/* Floating geometric shapes with enhanced colors */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 1, -2]}>
          <boxGeometry args={[1, 1, 1]} />
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

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[3, -1, -1]}>
          <torusGeometry args={[0.6, 0.3, 16, 100]} />
          <MeshDistortMaterial
            color="#10b981"
            speed={2}
            distort={0.4}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#10b981"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2.5}>
        <mesh position={[0, 2, -3]}>
          <octahedronGeometry args={[0.8]} />
          <MeshDistortMaterial
            color="#38bdf8"
            speed={2}
            distort={0.5}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#38bdf8"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-2, -2, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial
            color="#0284c7"
            speed={2}
            distort={0.3}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#0284c7"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={1} floatIntensity={2.2}>
        <mesh position={[2.5, 1.5, -2]}>
          <coneGeometry args={[0.5, 1, 32]} />
          <MeshDistortMaterial
            color="#2dd4bf"
            speed={2}
            distort={0.4}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#2dd4bf"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.9} rotationIntensity={1.3} floatIntensity={2.1}>
        <mesh position={[-1.5, 0.5, 1]}>
          <dodecahedronGeometry args={[0.6]} />
          <MeshDistortMaterial
            color="#059669"
            speed={2}
            distort={0.35}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#059669"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={2.3} rotationIntensity={0.9} floatIntensity={1.9}>
        <mesh position={[1, -1.5, -0.5]}>
          <tetrahedronGeometry args={[0.7]} />
          <MeshDistortMaterial
            color="#0369a1"
            speed={2}
            distort={0.45}
            radius={1}
            metalness={0.9}
            roughness={0.1}
            emissive="#0369a1"
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

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-20 sm:pt-24">
        <div className="max-w-4xl">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium bg-gradient-to-r from-sky-500/20 to-emerald-500/20 text-transparent bg-clip-text rounded-full border border-sky-400/30 animate-glow">
            <span className="bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
              Healthcare Product Platform
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-bold text-foreground mb-6 text-balance leading-tight">
            Building Advanced Hospital Management Systems (HMS) for Digital Healthcare in India
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-2xl leading-relaxed">
            ABDM-compliant healthcare software with ABHA integration, OPD/IPD management, billing, and digital patient
            records.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {["ABDM Ready", "ABHA Integration Supported", "Secure Health Data Handling"].map((badge) => (
              <div
                key={badge}
                className="px-3 py-1.5 text-sm rounded-full border border-sky-400/40 bg-gradient-to-r from-sky-500/15 to-emerald-500/15 text-foreground flex items-center gap-2"
              >
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                {badge}
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="text-base group relative overflow-hidden bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 animate-gradient hover:shadow-2xl hover:shadow-sky-500/50 transition-all duration-500 hover:scale-110 hover:rotate-1"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
              <span className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-emerald-600 blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="text-base relative overflow-hidden bg-transparent border-2 border-sky-500/50 hover:bg-sky-500/10 hover:border-emerald-500/50 hover:scale-105 hover:-rotate-1 transition-all duration-500 group"
            >
              <span className="relative z-10">Learn More</span>
              <span className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Button>
          </div>
        </div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background pointer-events-none" />

      <CompanyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
