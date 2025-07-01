"use client"

import { motion } from "framer-motion"
import { useScrollVelocity } from "@/hooks/use-scroll-velocity"
import { useEffect, useState } from "react"

export function VelocityBackgroundEffects() {
  const { velocity, direction, speed, isScrolling } = useScrollVelocity()
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Generate particles based on scroll speed
  useEffect(() => {
    if (!isScrolling) {
      setParticles([])
      return
    }

    const particleCount = speed === "fast" ? 8 : speed === "medium" ? 4 : 2
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))

    setParticles(newParticles)
  }, [speed, isScrolling])

  const getParticleColor = () => {
    switch (speed) {
      case "slow":
        return "bg-blue-400 dark:bg-blue-500"
      case "medium":
        return "bg-purple-400 dark:bg-purple-500"
      case "fast":
        return "bg-red-400 dark:bg-red-500"
      default:
        return "bg-gray-400"
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
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Velocity-based background overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isScrolling
            ? speed === "fast"
              ? "radial-gradient(circle at center, rgba(239, 68, 68, 0.05) 0%, transparent 70%)"
              : speed === "medium"
                ? "radial-gradient(circle at center, rgba(147, 51, 234, 0.03) 0%, transparent 70%)"
                : "radial-gradient(circle at center, rgba(59, 130, 246, 0.02) 0%, transparent 70%)"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Dynamic particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute w-1 h-1 rounded-full ${getParticleColor()} opacity-60`}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 0,
          }}
          animate={{
            y: direction === "down" ? `${particle.y + 20}%` : `${particle.y - 20}%`,
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: getAnimationDuration(),
            ease: "easeOut",
          }}
        />
      ))}

      {/* Velocity streaks */}
      {isScrolling && speed !== "slow" && (
        <div className="absolute inset-0">
          {Array.from({ length: speed === "fast" ? 6 : 3 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-px h-8 ${getParticleColor()} opacity-30`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                y: direction === "down" ? [0, 100] : [0, -100],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: getAnimationDuration(),
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
