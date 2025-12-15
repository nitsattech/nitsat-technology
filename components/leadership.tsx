"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei"
import { Linkedin, Mail, Award, Sparkles } from "lucide-react"
import type * as THREE from "three"

function FloatingCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  )
}

const leaders = [
  {
    name: "Neha Mishra",
    role: "CEO & Founder",
    image: "/professional-ceo-male-portrait.jpeg",
    bio: "Visionary leader with 15+ years in tech innovation. Passionate about transforming businesses through cutting-edge solutions.",
    achievements: ["Forbes 40 Under 40", "Tech Innovation Award 2024", "Global Leadership Excellence"],
    linkedin: "#",
    email: "Neha@nitsat.tech",
    gradient: "from-purple-600 via-pink-600 to-red-600",
  },
  {
    name: "Rajni Mishra",
    role: "Director of Operations",
    image: "/professional-director-female-portrait.jpg",
    bio: "Strategic operations expert driving excellence across all departments. Committed to operational efficiency and client satisfaction.",
    achievements: ["Best Director Award 2023", "Operations Excellence Champion", "Industry Leadership Medal"],
    linkedin: "#",
    email: "Rajni@nitsat.tech",
    gradient: "from-cyan-600 via-blue-600 to-indigo-600",
  },
]

export function Leadership() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
          <FloatingCube position={[-4, 2, 0]} color="#8b5cf6" />
          <FloatingCube position={[4, -2, 0]} color="#06b6d4" />
          <FloatingCube position={[0, 3, -2]} color="#ec4899" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-primary rounded-full border border-primary/30 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Meet Our Leadership</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              The Minds Behind Innovation
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Meet the visionary leaders driving NITSAT TECHNOLOGY forward with passion, expertise, and unwavering
            commitment to excellence.
          </p>
        </motion.div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateY: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
              style={{ perspective: "1500px" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: index % 2 === 0 ? 5 : -5, z: 50 }}
                transition={{ duration: 0.5 }}
                className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl hover:shadow-primary/30 transition-shadow duration-500"
              >
                {/* Gradient Overlay */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className={`absolute inset-0 bg-gradient-to-br ${leader.gradient} opacity-20 blur-3xl`}
                />

                {/* Image Section */}
                <div className="relative h-143 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2, type: "spring", bounce: 0.5 }}
                    className="absolute top-6 right-6"
                  >
                    <div className={`p-3 bg-gradient-to-br ${leader.gradient} rounded-full shadow-2xl`}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="relative p-6 sm:p-8">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="text-2xl sm:text-3xl font-bold text-foreground mb-2"
                  >
                    {leader.name}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.2 }}
                    className={`inline-block px-4 py-1 mb-4 text-sm font-semibold bg-gradient-to-r ${leader.gradient} text-white rounded-full`}
                  >
                    {leader.role}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="text-muted-foreground leading-relaxed mb-6"
                  >
                    {leader.bio}
                  </motion.p>

                  {/* Achievements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.2 }}
                    className="space-y-2 mb-6"
                  >
                    {leader.achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.2 + idx * 0.1 }}
                        whileHover={{ x: 10, scale: 1.05 }}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${leader.gradient}`} />
                        <span>{achievement}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className="flex gap-4"
                  >
                    <motion.a
                      href={leader.linkedin}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-gradient-to-br ${leader.gradient} rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </motion.a>
                    <motion.a
                      href={`mailto:${leader.email}`}
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-gradient-to-br ${leader.gradient} rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
