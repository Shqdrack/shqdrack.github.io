"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Mail, User } from "lucide-react"
import { WireframeCubeScene } from "@/components/3d/wireframe-cube"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-align-start"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20">
        {mounted && <WireframeCubeScene isDark={resolvedTheme === "dark"} />}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-10 mt-4 text-black dark:text-white tracking-tight leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Shadrack Kambanga
          </motion.h1>

          <motion.div
            className="space-y-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-2">
              📍 Dar es Salaam, Tanzania
            </p>
            <p className="text-lg md:text-2xl font-medium text-black dark:text-white leading-relaxed max-w-2xl mx-auto mb-6">
              I'm a Tanzanian teenage developer on a mission to empower Africa with innovative, tech-driven solutions.
              From smart hospitals to educational platforms, I build systems that spark change.
            </p>
            <motion.div
              className="text-xl md:text-2xl font-bold text-black dark:text-white mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              Code. Change. Connect.
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="px-8 py-4 text-lg bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black border-0 transition-all duration-300 hover:scale-105"
            >
              <Github className="w-5 h-5 mr-2" />
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="px-8 py-4 text-lg border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 bg-transparent hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToAbout}
              className="px-8 py-4 text-lg border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 bg-transparent hover:scale-105"
            >
              <User className="w-5 h-5 mr-2" />
              About Me
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-500">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-gray-500 dark:text-gray-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
