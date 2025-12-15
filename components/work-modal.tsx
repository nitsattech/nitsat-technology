"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, OrbitControls } from "@react-three/drei"
import { X, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import type * as THREE from "three"

interface WorkModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    title: string
    description: string
    color: string
    gradient: string
  }
}

// Sample portfolio items - you can customize these
const portfolioWork = {
  "Tech Support": [
    {
      title: "Enterprise IT Infrastructure",
      client: "TechCorp Global",
      description: "Managed 24/7 support for 500+ workstations with 99.9% uptime",
      stats: ["500+ Devices", "99.9% Uptime", "24/7 Support"],
      image: "/modern-office-technology-infrastructure.jpg",
    },
    {
      title: "Remote Support System",
      client: "StartupHub",
      description: "Implemented automated ticketing system reducing response time by 60%",
      stats: ["60% Faster", "100+ Tickets/Day", "AI-Powered"],
      image: "/remote-support-dashboard.jpg",
    },
    {
      title: "Hardware Maintenance",
      client: "Manufacturing Co.",
      description: "Preventive maintenance program for critical manufacturing equipment",
      stats: ["50+ Systems", "Zero Downtime", "Predictive Analysis"],
      image: "/technology-maintenance-equipment.jpg",
    },
  ],
  Cybersecurity: [
    {
      title: "Network Security Audit",
      client: "FinanceFirst Bank",
      description: "Comprehensive security assessment and penetration testing",
      stats: ["Zero Breaches", "99% Threat Blocked", "ISO Certified"],
      image: "/cybersecurity-network-protection.png",
    },
    {
      title: "Data Encryption Solution",
      client: "HealthCare Plus",
      description: "End-to-end encryption for patient data and HIPAA compliance",
      stats: ["256-bit Encryption", "HIPAA Compliant", "100% Secure"],
      image: "/data-encryption-security.jpg",
    },
  ],
  "Cloud Solutions": [
    {
      title: "Cloud Migration",
      client: "RetailMax",
      description: "Seamless migration of 50TB data to AWS cloud infrastructure",
      stats: ["50TB Migrated", "Zero Downtime", "40% Cost Savings"],
      image: "/cloud-computing-infrastructure.jpg",
    },
    {
      title: "Scalable Cloud Architecture",
      client: "SocialApp Inc.",
      description: "Auto-scaling infrastructure handling 10M+ daily users",
      stats: ["10M+ Users", "Auto-Scaling", "99.99% Uptime"],
      image: "/cloud-server-architecture.jpg",
    },
  ],
  "IT Consulting": [
    {
      title: "Digital Transformation",
      client: "Legacy Industries",
      description: "Complete IT infrastructure modernization and strategy",
      stats: ["3 Months", "100% Digital", "ROI: 300%"],
      image: "/digital-transformation.png",
    },
  ],
  "Data Management": [
    {
      title: "Big Data Analytics",
      client: "E-Commerce Giant",
      description: "Real-time data pipeline processing 5PB+ annually",
      stats: ["5PB+ Data", "Real-Time", "AI Analytics"],
      image: "/big-data-analytics-dashboard.jpg",
    },
  ],
  "Custom Development": [
    {
      title: "Custom CRM Platform",
      client: "SalesForce Pro",
      description: "Built custom CRM with AI-powered lead scoring",
      stats: ["50K+ Users", "AI-Powered", "Mobile-First"],
      image: "/modern-crm-software-interface.jpg",
    },
    {
      title: "Mobile App Development",
      client: "FitLife Wellness",
      description: "Cross-platform fitness app with real-time tracking",
      stats: ["100K+ Downloads", "4.8★ Rating", "IoT Integration"],
      image: "/mobile-app-development-fitness.jpg",
    },
  ],
}

function AnimatedSphere({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  )
}

export default function WorkModal({ isOpen, onClose, service }: WorkModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const works = portfolioWork[service.title as keyof typeof portfolioWork] || []

  const nextWork = () => {
    setCurrentIndex((prev) => (prev + 1) % works.length)
  }

  const prevWork = () => {
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length)
  }

  if (works.length === 0) return null

  const currentWork = works[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.8, rotateX: -20, opacity: 0 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotateX: 20, opacity: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-card/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-border shadow-2xl"
        style={{ perspective: "1000px" }}
      >
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color={service.color} />
            <pointLight position={[-10, -10, -10]} intensity={1} color={service.color} />
            <AnimatedSphere color={service.color} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:border-primary transition-colors"
        >
          <X className="w-6 h-6 text-foreground" />
        </motion.button>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div
              className={`inline-block px-4 py-2 bg-gradient-to-r ${service.gradient} text-white rounded-full text-sm font-semibold mb-4`}
            >
              {service.title}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Our Work</h2>
            <p className="text-muted-foreground text-lg">
              Real projects, real results. See how we help our clients succeed.
            </p>
          </motion.div>

          {/* Portfolio Item */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 300, opacity: 0, rotateY: -20 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              exit={{ x: -300, opacity: 0, rotateY: 20 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative rounded-xl overflow-hidden shadow-2xl border border-border"
              >
                <img
                  src={currentWork.image || "/placeholder.svg"}
                  alt={currentWork.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-primary font-semibold text-sm mb-2"
                  >
                    CLIENT: {currentWork.client}
                  </motion.p>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-foreground mb-4"
                  >
                    {currentWork.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-muted-foreground text-lg leading-relaxed"
                  >
                    {currentWork.description}
                  </motion.p>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-3 gap-4"
                >
                  {currentWork.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className={`p-3 bg-gradient-to-br ${service.gradient} rounded-lg text-center`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-white mx-auto mb-1" />
                      <p className="text-white font-bold text-sm">{stat}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {works.length > 1 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-between mt-8 pt-8 border-t border-border"
            >
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevWork}
                className="flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Previous</span>
              </motion.button>

              <div className="flex gap-2">
                {works.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: currentIndex === index ? 1.2 : 1,
                      opacity: currentIndex === index ? 1 : 0.5,
                    }}
                    className={`w-2 h-2 rounded-full ${
                      currentIndex === index ? `bg-gradient-to-r ${service.gradient}` : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextWork}
                className="flex items-center gap-2 px-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-border hover:border-primary transition-colors"
              >
                <span className="font-semibold">Next</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
