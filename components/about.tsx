"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshTransmissionMaterial } from "@react-three/drei"
import { motion, useInView } from "framer-motion"
import { Zap, Target, Award, Users } from "lucide-react"
import type * as THREE from "three"

function RotatingTorus() {
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.5
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial
          color="#8b5cf6"
          thickness={0.5}
          roughness={0.2}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.5}
        />
      </mesh>
    </Float>
  )
}

function FloatingSpheres() {
  const spheres = [
    { position: [-2, 1, 0] as [number, number, number], color: "#8b5cf6" },
    { position: [2, -1, 0] as [number, number, number], color: "#06b6d4" },
    { position: [0, 2, -2] as [number, number, number], color: "#a78bfa" },
  ]

  return (
    <>
      {spheres.map((sphere, i) => (
        <Float key={i} speed={2 + i} rotationIntensity={1}>
          <mesh position={sphere.position}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial
              color={sphere.color}
              metalness={0.9}
              roughness={0.1}
              emissive={sphere.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

const features = [
  { icon: Zap, text: "24/7 Technical Support", color: "from-yellow-400 to-orange-500" },
  { icon: Users, text: "Certified Professionals", color: "from-blue-400 to-cyan-500" },
  { icon: Target, text: "Cutting-Edge Solutions", color: "from-purple-400 to-pink-500" },
  { icon: Award, text: "Proven Track Record", color: "from-green-400 to-emerald-500" },
]

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true })

  return (
    <section id="about" className="py-20 sm:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #8b5cf6 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block px-4 py-2 mb-4 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-primary rounded-full border border-primary/30 backdrop-blur-sm"
            >
              ⚡ About Us
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                Driving Innovation Through Technology
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              NITSAT TECHNOLOGY is your trusted partner for comprehensive technology solutions. With years of experience
              and a team of certified professionals, we deliver excellence in every project.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mission is to empower businesses with innovative technology solutions that drive growth, efficiency,
              and digital transformation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`p-2 rounded-lg bg-gradient-to-br ${feature.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </motion.div>
                    <span className="text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.text}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, x: 50, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20"
            >
              <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
                  <RotatingTorus />
                  <FloatingSpheres />
                </Canvas>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-background/90 to-cyan-900/80 backdrop-blur-sm" />

              <div className="relative z-10 p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isStatsInView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                    className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4"
                  >
                    <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                      10+
                    </span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="text-xl sm:text-2xl text-foreground mb-2 font-semibold"
                  >
                    Years of Experience
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                    className="text-muted-foreground"
                  >
                    Delivering Excellence
                  </motion.div>

                  <div className="mt-8 flex gap-4 justify-center flex-wrap">
                    {["500+ Projects", "100% Satisfaction", "50+ Clients"].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full text-sm border border-primary/30 backdrop-blur-sm"
                      >
                        {stat}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl -z-10 blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-2xl -z-10 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
