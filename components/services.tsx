"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Monitor, Shield, Cloud, Zap, Database, Code } from "lucide-react"
import WorkModal from "./work-modal"
import type * as THREE from "three"

function FloatingSphere({ color, position }: { color: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
        <MeshDistortMaterial color={color} attach="material" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
      </Sphere>
    </Float>
  )
}

const services = [
  {
    icon: Monitor,
    title: "Tech Support",
    description:
      "Expert technical assistance for hardware and software issues, ensuring your systems run smoothly 24/7.",
    color: "#8b5cf6",
    gradient: "from-purple-500 to-purple-700",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your data and infrastructure from emerging threats.",
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services to modernize your business operations.",
    color: "#a78bfa",
    gradient: "from-violet-400 to-purple-600",
  },
  {
    icon: Zap,
    title: "IT Consulting",
    description: "Strategic technology guidance to optimize your IT infrastructure and drive business growth.",
    color: "#fbbf24",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Efficient data storage, backup, and recovery solutions to safeguard your critical information.",
    color: "#10b981",
    gradient: "from-emerald-400 to-green-600",
  },
  {
    icon: Code,
    title: "Custom Development",
    description: "Tailored software solutions designed to meet your unique business requirements.",
    color: "#f472b6",
    gradient: "from-pink-400 to-rose-600",
  },
]

export function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  const handleLearnMore = (service: (typeof services)[0]) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  return (
    <section id="services" className="py-20 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-cyan-500/5 to-background pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block px-4 py-2 mb-4 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-primary rounded-full border border-primary/30 backdrop-blur-sm"
          >
            ✨ Our Services
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Comprehensive Tech Solutions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            We provide a full spectrum of technology services to help your business thrive in the digital age.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return <ServiceCard key={index} service={service} index={index} Icon={Icon} onLearnMore={handleLearnMore} />
          })}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedService && (
          <WorkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} service={selectedService} />
        )}
      </AnimatePresence>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  Icon,
  onLearnMore,
}: {
  service: (typeof services)[0]
  index: number
  Icon: any
  onLearnMore: (service: (typeof services)[0]) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 },
      }}
      className="group relative"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color={service.color} />
          <FloatingSphere color={service.color} position={[0, 0, 0]} />
        </Canvas>
      </div>

      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.color}40, transparent)`,
          filter: "blur(20px)",
        }}
      />

      <div className="relative bg-card/80 backdrop-blur-xl border border-border group-hover:border-primary/50 rounded-xl p-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20">
        <motion.div
          whileHover={{ scale: 1.2, rotateZ: 360 }}
          transition={{ duration: 0.6 }}
          className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/50 transition-all duration-500`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLearnMore(service)}
          className={`mt-4 px-4 py-2 bg-gradient-to-r ${service.gradient} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          Learn More
        </motion.button>

        <motion.div
          className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at top right, ${service.color}40, transparent)`,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at bottom left, ${service.color}40, transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}
