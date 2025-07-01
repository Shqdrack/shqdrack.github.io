"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Mail } from "lucide-react"
import { lazy, Suspense, memo, useCallback } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Lazy load the 3D scene for better performance
const LazyScene = lazy(() =>
  import("@/components/3d/scene-with-effects").then((module) => ({ default: module.SceneWithEffects })),
)

const SceneFallback = memo(() => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-blue-500 dark:border-purple-500 border-t-transparent rounded-lg animate-spin" />
  </div>
))

SceneFallback.displayName = "SceneFallback"

const AnimatedParticles = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 dark:bg-purple-400 rounded-full opacity-20 dark:opacity-30"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  )
})

AnimatedParticles.displayName = "AnimatedParticles"

export const OptimizedHeroSection = memo(() => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-align-start px-4 py-16 md:px-12 md:py-24 lg:py-32"
      style={{ contain: "layout style paint" }}
    >
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 transition-all duration-700" />

      {/* Optimized Animated Particles */}
      {hasIntersected && <AnimatedParticles />}

      {/* Optimized 3D Background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        {hasIntersected && (
          <Suspense fallback={<SceneFallback />}>
            <LazyScene />
          </Suspense>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center flex-1 flex flex-col justify-center"
          >
            <motion.h1
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-10 mt-4 bg-gradient-to-r from-slate-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent tracking-tight leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={hasIntersected ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            >
              Hi, I'm Shadrack
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              A teenage developer building Africa's future through code
            </motion.p>

            <motion.div
              className="space-y-3 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.95 }}
            >
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400">Student & Aspiring Tech Leader</p>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400">
                General Manager at{" "}
                <span className="text-blue-600 dark:text-blue-400 font-semibold">Codebloom Technologies</span>
              </p>
              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium">
                Building Tomorrow's Solutions Today
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View Projects
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToContact}
                className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:scale-105"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            >
              <ArrowDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

OptimizedHeroSection.displayName = "OptimizedHeroSection"
