"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, Home, Briefcase, Info, Mail, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"


export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ["home", "services", "team", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
  { id: "home", label: "Home", icon: Home, type: "scroll" },
  { label: "Services", icon: Briefcase, type: "link", href: "/services" },
  { id: "team", label: "Team", icon: Users, type: "scroll" },
  { id: "about", label: "About", icon: Info, type: "scroll" },
  { id: "contact", label: "Contact", icon: Mail, type: "scroll" },
]


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg shadow-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 animate-gradient rounded-lg flex items-center justify-center animate-glow shadow-lg shadow-purple-500/50">
              <Sparkles className="text-white w-4 h-4 animate-pulse" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 animate-gradient bg-clip-text text-transparent">
              NITSAT TECHNOLOGIES
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
  const Icon = item.icon

  // 👉 LINK TYPE (Services)
  if (item.type === "link") {
    return (
      <Link key={item.label} href={item.href!}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="px-4 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-cyan-400 hover:bg-clip-text flex items-center gap-2 cursor-pointer"
        >
          <Icon className="w-4 h-4" />
          {item.label}
        </motion.div>
      </Link>
    )
  }

  // 👉 SCROLL TYPE
  const isActive = activeSection === item.id

  return (
    <motion.button
      key={item.id}
      onClick={() => scrollToSection(item.id!)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`px-4 py-2 text-sm font-medium rounded-lg ${
        isActive
          ? "text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text"
          : "text-muted-foreground hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-cyan-400 hover:bg-clip-text"
      }`}
    >
      <span className="flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {item.label}
      </span>
    </motion.button>
  )
})}


            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => scrollToSection("contact")}
                className="ml-2 relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-gradient hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 group"
              >
                <span className="relative z-10">Get Started</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <Mail className="ml-2 w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
       {/* Mobile Menu */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      className="md:hidden py-4 border-t border-border"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = item.type === "scroll" && activeSection === item.id

          // 👉 LINK TYPE (Services)
          if (item.type === "link") {
            return (
              <Link
                key={item.label}
                href={item.href!}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 text-muted-foreground hover:bg-purple-500/10 hover:text-foreground"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            )
          }

          // 👉 SCROLL TYPE
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id!)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text"
                  : "text-muted-foreground hover:bg-purple-500/10 hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-purple-400" : ""}`} />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          )
        })}

        {/* CTA BUTTON */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            onClick={() => {
              scrollToSection("contact")
              setIsMobileMenuOpen(false)
            }}
            className="w-full mt-2 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-gradient hover:shadow-lg hover:shadow-purple-500/50"
          >
            <Mail className="mr-2 w-4 h-4" />
            Get Started
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </nav>
  )
}
