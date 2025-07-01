"use client"

import { memo, useMemo } from "react"
import { motion } from "framer-motion"
import { useOptimizedScroll } from "@/hooks/use-optimized-scroll"

const ParticleSystem = memo(({ speed, direction }: { speed: string; direction: string }) => {
  const particles = useMemo(() => {
    if (speed === "idle") return []

    const particleCount = speed === "fast" ? 6 : speed === "medium" ? 3 : 1
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.1,
    }))
  }, [speed])

  const getParticleColor = () => {
    switch (speed) {
      case "slow":
        return "bg-blue-400/40 dark:bg-blue-500/40"
      case "medium":
        return "bg-purple-400/40 dark:bg-purple-500/40"
      case "fast":
        return "bg-red-400/40 dark:bg-red-500/40"
      default:
        return "bg-gray-400/40"
    }
  }

  const getAnimationDuration = () => {
    switch (speed) {
      case "slow":
        return 2
      case "medium":
        return 1
      case "fast":
        return 0.5
      default:
        return 2
    }
  }

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${getParticleColor()}`}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 0,
          }}
          animate={{
            y: direction === "down" ? `${particle.y + 15}%` : `${particle.y - 15}%`,
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: getAnimationDuration(),
            ease: "easeOut",
            delay: particle.delay,
          }}
          style={{ willChange: "transform, opacity" }}
        />
      ))}
    </>
  )
})

ParticleSystem.displayName = "ParticleSystem"

const VelocityStreaks = memo(({ speed, direction }: { speed: string; direction: string }) => {
  const streaks = useMemo(() => {
    if (speed === "slow" || speed === "idle") return []
    const streakCount = speed === "fast" ? 4 : 2
    return Array.from({ length: streakCount }, (_, i) => ({
      id: i,
      left: 20 + i * 20,
      top: Math.random() * 80 + 10,
      delay: i * 0.1,
    }))
  }, [speed])

  const getStreakColor = () => {
    switch (speed) {
      case "medium":
        return "bg-purple-400/30 dark:bg-purple-500/30"
      case "fast":
        return "bg-red-400/30 dark:bg-red-500/30"
      default:
        return "bg-gray-400/30"
    }
  }

  const getAnimationDuration = () => {
    return speed === "fast" ? 0.5 : 1
  }

  return (
    <>
      {streaks.map((streak) => (
        <motion.div
          key={streak.id}
          className={`absolute w-px h-6 ${getStreakColor()}`}
          style={{
            left: `${streak.left}%`,
            top: `${streak.top}%`,
            willChange: "transform, opacity",
          }}
          animate={{
            y: direction === "down" ? [0, 60] : [0, -60],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: getAnimationDuration(),
            repeat: Number.POSITIVE_INFINITY,
            delay: streak.delay,
          }}
        />
      ))}
    </>
  )
})

VelocityStreaks.displayName = "VelocityStreaks"

export const OptimizedBackgroundEffects = memo(() => {
  const { speed, direction, isScrolling } = useOptimizedScroll()

  const backgroundGradient = useMemo(() => {
    if (!isScrolling) return "transparent"

    switch (speed) {
      case "fast":
        return "radial-gradient(circle at center, rgba(239, 68, 68, 0.03) 0%, transparent 70%)"
      case "medium":
        return "radial-gradient(circle at center, rgba(147, 51, 234, 0.02) 0%, transparent 70%)"
      case "slow":
        return "radial-gradient(circle at center, rgba(59, 130, 246, 0.01) 0%, transparent 70%)"
      default:
        return "transparent"
    }
  }, [isScrolling, speed])

  return (
    <div className="fixed inset-0 pointer-events-none z-10" style={{ contain: "layout style paint" }}>
      {/* Optimized background overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{ background: backgroundGradient }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "background" }}
      />

      {/* Optimized particle system */}
      {isScrolling && <ParticleSystem speed={speed} direction={direction} />}

      {/* Optimized velocity streaks */}
      {isScrolling && <VelocityStreaks speed={speed} direction={direction} />}
    </div>
  )
})

OptimizedBackgroundEffects.displayName = "OptimizedBackgroundEffects"
