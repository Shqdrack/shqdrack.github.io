"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Mail, MapPin } from "lucide-react"
import { memo, useCallback, lazy, Suspense } from "react"
import { Badge } from "@/components/ui/badge"

// Lazy load 3D scene
const OptimizedCubeScene = lazy(() =>
  import("@/components/3d/optimized-cube").then((module) => ({ default: module.OptimizedCubeScene })),
)

const CubeFallback = lazy(() =>
  import("@/components/3d/optimized-cube").then((module) => ({ default: module.CubeFallback })),
)

export const ProfessionalHeroSection = memo(() => {
  const scrollToProjects = useCallback(() => {
    const element = document.getElementById("projects")
    if (element) {
      document.documentElement.style.scrollSnapType = "none"
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setTimeout(() => {
        document.documentElement.style.scrollSnapType = "y mandatory"
      }, 1000)
    }
  }, [])

  const scrollToContact = useCallback(() => {
    const element = document.getElementById("contact")
    if (element) {
      document.documentElement.style.scrollSnapType = "none"
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setTimeout(() => {
        document.documentElement.style.scrollSnapType = "y mandatory"
      }, 1000)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-align-start bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[size:24px_24px]" />
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <Suspense fallback={<CubeFallback />}>
          <OptimizedCubeScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Dar es Salaam, Tanzania
            </Badge>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-10 mt-4 bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent tracking-tight leading-tight"
          >
            Shadrack Kambanga
          </motion.h1>

          {/* Professional Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium mb-4">
              Full-Stack Developer & Tech Entrepreneur
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6">
              Building innovative solutions for African communities through modern web technologies and strategic
              thinking.
            </p>
          </motion.div>

          {/* Professional Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12 space-y-2"
          >
            <p className="text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">General Manager</span> at Codebloom
              Technologies
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              Specialized in React, Next.js, Python, and AI-powered applications
            </p>
          </motion.div>

          {/* Professional CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="px-8 py-3 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Github className="w-5 h-5 mr-2" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="px-8 py-3 text-base border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 bg-transparent"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

ProfessionalHeroSection.displayName = "ProfessionalHeroSection"
