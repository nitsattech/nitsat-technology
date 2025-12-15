"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Linkedin, Award, GraduationCap, Briefcase } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere } from "@react-three/drei"
import type * as THREE from "three"

function FloatingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} emissive={color} emissiveIntensity={0.5} />
      </Sphere>
    </Float>
  )
}

interface Leader {
  name: string
  role: string
  image: string
  bio: string
  achievements: string[]
  linkedin: string
  email: string
  gradient: string
  education?: string[]
  expertise?: string[]
}

interface LeaderProfileModalProps {
  leader: Leader
  isOpen: boolean
  onClose: () => void
}

export function LeaderProfileModal({ leader, isOpen, onClose }: LeaderProfileModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl bg-card/95 backdrop-blur-xl rounded-3xl border border-border shadow-2xl overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 3D Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
                  <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
                  <FloatingSphere position={[-3, 2, 0]} color="#8b5cf6" />
                  <FloatingSphere position={[3, -2, 0]} color="#06b6d4" />
                  <FloatingSphere position={[0, 3, -2]} color="#ec4899" />
                </Canvas>
              </div>

              {/* Close Button */}
              <button
                type="button"
                aria-label="Close profile"
                onClick={onClose}
                className="absolute top-6 right-6 z-[200] p-2 bg-background/80 hover:bg-background rounded-full transition-colors duration-200 group"
              >
                <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Left Column - Image */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative h-[500px] rounded-2xl overflow-hidden">
                    <img
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

                    {/* Floating Award Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                      className="absolute top-6 right-6"
                    >
                      <div className={`p-4 bg-gradient-to-br ${leader.gradient} rounded-full shadow-2xl`}>
                        <Award className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right Column - Content */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col gap-6 overflow-y-auto max-h-[600px] pr-2"
                >
                  {/* Header */}
                  <div>
                    <h2 className="text-4xl font-bold text-foreground mb-2">{leader.name}</h2>
                    <div
                      className={`inline-block px-4 py-2 text-sm font-semibold bg-gradient-to-r ${leader.gradient} text-white rounded-full`}
                    >
                      {leader.role}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-muted-foreground leading-relaxed text-lg">{leader.bio}</p>

                  {/* Achievements */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-semibold text-foreground">Key Achievements</h3>
                    </div>
                    <div className="space-y-3">
                      {leader.achievements.map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${leader.gradient} mt-2`} />
                          <span className="text-muted-foreground">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  {leader.education && leader.education.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold text-foreground">Education</h3>
                      </div>
                      <div className="space-y-2">
                        {leader.education.map((edu, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                            className="flex items-start gap-3 p-3 bg-background/50 rounded-lg"
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${leader.gradient} mt-2`} />
                            <span className="text-muted-foreground">{edu}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expertise */}
                  {leader.expertise && leader.expertise.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold text-foreground">Areas of Expertise</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {leader.expertise.map((skill, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + idx * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            className={`px-4 py-2 bg-gradient-to-r ${leader.gradient} text-white rounded-full text-sm font-medium shadow-lg`}
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">Get In Touch</h3>
                    <div className="flex gap-4">
                      <motion.a
                        href={leader.linkedin}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${leader.gradient} text-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                      >
                        <Linkedin className="w-5 h-5" />
                        <span className="font-medium">LinkedIn</span>
                      </motion.a>
                      <motion.a
                        href={`mailto:${leader.email}`}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${leader.gradient} text-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                      >
                        <Mail className="w-5 h-5" />
                        <span className="font-medium">Email</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
