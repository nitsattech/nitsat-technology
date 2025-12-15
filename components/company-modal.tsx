"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei"
import { X, Award, Users, Globe, TrendingUp, Shield, Zap, Heart, Target, Sparkles, ChevronRight } from "lucide-react"
import type * as THREE from "three"

interface CompanyModalProps {
  isOpen: boolean
  onClose: () => void
}

function AnimatedTorus() {
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.5
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={3} floatIntensity={2}>
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0}
          metalness={0.9}
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  )
}

function FloatingIcosahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

const companyStats = [
  { icon: Users, label: "Happy Clients", value: "15+", color: "from-purple-500 to-purple-700" },
  { icon: Award, label: "Projects Completed", value: "60+", color: "from-cyan-500 to-blue-600" },
  { icon: Globe, label: "Countries Served", value: "2+", color: "from-green-500 to-emerald-600" },
  { icon: TrendingUp, label: "Years Experience", value: "2+", color: "from-orange-500 to-red-600" },
]

const coreValues = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your data and systems are safe with our enterprise-grade security measures.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Lightning-fast solutions that don't compromise on quality or reliability.",
  },
  {
    icon: Heart,
    title: "Client-Focused",
    description: "Your success is our priority. We go above and beyond for every client.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "Measurable outcomes and tangible results that drive your business forward.",
  },
]

export function CompanyModal({ isOpen, onClose }: CompanyModalProps) {
  const [activeTab, setActiveTab] = useState<"about" | "values">("about")

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
        >
          <motion.div
            initial={{ scale: 0.5, rotateX: -30, opacity: 0, y: 100 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, rotateX: 30, opacity: 0, y: -100 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl rounded-3xl border border-border shadow-2xl"
            style={{ perspective: "2000px" }}
          >
            {/* 3D Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none rounded-3xl overflow-hidden">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#06b6d4" />
                <pointLight position={[0, 10, 0]} intensity={1.5} color="#3b82f6" />
                <AnimatedTorus />
                <FloatingIcosahedron position={[-3, 2, -2]} color="#8b5cf6" />
                <FloatingIcosahedron position={[3, -2, -1]} color="#06b6d4" />
                <FloatingIcosahedron position={[0, 3, 1]} color="#3b82f6" />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
              </Canvas>
            </div>

            {/* Close Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.2, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCloseClick}
              className="absolute top-6 right-6 z-[200] p-3 bg-background/90 backdrop-blur-sm rounded-full border-2 border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/50"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-foreground" />
            </motion.button>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12">
              {/* Header */}
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-center mb-12"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="inline-block mb-4"
                >
                  <Sparkles className="w-16 h-16 text-primary" />
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                    NITSAT TECHNOLOGIES
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Pioneering the future of technology with innovation, expertise, and unwavering dedication to
                  excellence
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              >
                {companyStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring", bounce: 0.5 }}
                      whileHover={{ scale: 1.1, y: -10, rotateY: 15 }}
                      className={`relative p-6 bg-gradient-to-br ${stat.color} rounded-2xl text-center overflow-hidden group cursor-pointer`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ scale: 0, borderRadius: "100%" }}
                        whileHover={{ scale: 2, borderRadius: "0%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <Icon className="w-8 h-8 text-white mx-auto mb-2 relative z-10" />
                      <p className="text-3xl font-bold text-white mb-1 relative z-10">{stat.value}</p>
                      <p className="text-sm text-white/90 relative z-10">{stat.label}</p>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-4 mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("about")}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "about"
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/50"
                      : "bg-background/50 text-muted-foreground hover:bg-background/80"
                  }`}
                >
                  About Us
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("values")}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "values"
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/50"
                      : "bg-background/50 text-muted-foreground hover:bg-background/80"
                  }`}
                >
                  Core Values
                </motion.button>
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "about" ? (
                  <motion.div
                    key="about"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <motion.div
                      className="p-8 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl border border-border backdrop-blur-sm"
                      whileHover={{ scale: 1.02, borderColor: "rgba(139, 92, 246, 0.5)" }}
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Target className="text-primary" />
                        Our Mission
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        To empower businesses worldwide with cutting-edge technology solutions that drive innovation,
                        efficiency, and sustainable growth. We believe in making technology accessible, reliable, and
                        transformative for organizations of all sizes.
                      </p>
                    </motion.div>

                    <motion.div
                      className="p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl border border-border backdrop-blur-sm"
                      whileHover={{ scale: 1.02, borderColor: "rgba(6, 182, 212, 0.5)" }}
                    >
                      <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Sparkles className="text-primary" />
                        What Sets Us Apart
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "2+ years of proven expertise in diverse technology domains",
                          "24/7 dedicated support team ready to assist you anytime",
                          "Custom-tailored solutions designed for your unique needs",
                          "Cutting-edge technology stack with latest industry standards",
                          "Transparent communication and collaborative partnership approach",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="flex items-start gap-3 text-muted-foreground text-lg"
                          >
                            <ChevronRight className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="values"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    {coreValues.map((value, index) => {
                      const Icon = value.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2 + index * 0.1, type: "spring", bounce: 0.4 }}
                          whileHover={{ scale: 1.05, y: -10, rotateY: 10 }}
                          className="p-6 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border backdrop-blur-sm hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
                        >
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                            className="w-14 h-14 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <h4 className="text-xl font-bold text-foreground mb-2">{value.title}</h4>
                          <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
