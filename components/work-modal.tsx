"use client"

import { useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { X } from 'lucide-react'
import type * as THREE from "three"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  color: string
}

interface WorkModalProps {
  isOpen: boolean
  onClose: () => void
  service: string
  projects: Project[]
}

function AnimatedBackground({ color }: { color: string }) {
  const sphereRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.4
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={color} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <Sphere ref={sphereRef} args={[2, 32, 32]} position={[-3, 0, -5]}>
          <MeshDistortMaterial color={color} attach="material" distort={0.6} speed={3} roughness={0.1} metalness={0.9} />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <Torus ref={torusRef} args={[1.5, 0.4, 16, 100]} position={[3, 2, -3]}>
          <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>

      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
    </>
  )
}

export default function WorkModal({ isOpen, onClose, service, projects }: WorkModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 opacity-30">
              <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <AnimatedBackground color={projects[0]?.color || "#8b5cf6"} />
              </Canvas>
            </div>

            <div className="relative h-full bg-card/95 backdrop-blur-xl border border-border/50 flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-border/50">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                    {service}
                  </h2>
                  <p className="text-muted-foreground mt-1">Our Featured Work</p>
                </motion.div>

                <motion.button
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors"
                >
                  <X className="text-primary" size={20} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30, rotateX: -15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                      className="group relative bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500"
                      style={{ perspective: "1000px" }}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="w-full h-full"
                        >
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      <div className="p-4">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 * i + 0.3 }}
                              whileHover={{ scale: 1.1 }}
                              className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at top right, ${project.color}60, transparent)`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
