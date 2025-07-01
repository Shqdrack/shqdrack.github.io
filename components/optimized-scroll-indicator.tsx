"use client"

import { memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useOptimizedScroll } from "@/hooks/use-optimized-scroll"
import { ChevronUp, ChevronDown, Zap, Wind, Rocket } from "lucide-react"

const SpeedIcon = memo(({ speed }: { speed: string }) => {
  switch (speed) {
    case "slow":
      return <Wind className="w-4 h-4" />
    case "medium":
      return <Zap className="w-4 h-4" />
    case "fast":
      return <Rocket className="w-4 h-4" />
    default:
      return <Wind className="w-4 h-4" />
  }
})

SpeedIcon.displayName = "SpeedIcon"

const DirectionIcon = memo(({ direction }: { direction: string }) => {
  if (direction === "down") {
    return <ChevronDown className="w-4 h-4" />
  }
  if (direction === "up") {
    return <ChevronUp className="w-4 h-4" />
  }
  return null
})

DirectionIcon.displayName = "DirectionIcon"

export const OptimizedScrollIndicator = memo(() => {
  const { direction, speed, isScrolling } = useOptimizedScroll()

  const getSpeedColor = () => {
    switch (speed) {
      case "slow":
        return "text-green-500 dark:text-green-400"
      case "medium":
        return "text-yellow-500 dark:text-yellow-400"
      case "fast":
        return "text-red-500 dark:text-red-400"
      default:
        return "text-gray-400"
    }
  }

  if (!isScrolling) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: 50 }}
        transition={{ duration: 0.2 }}
        className="fixed top-20 right-6 z-40 pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                y: direction === "down" ? [0, 3, 0] : direction === "up" ? [0, -3, 0] : 0,
              }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-blue-500 dark:text-purple-400"
              style={{ willChange: "transform" }}
            >
              <DirectionIcon direction={direction} />
            </motion.div>

            <motion.div
              animate={{
                scale: speed === "fast" ? [1, 1.2, 1] : speed === "medium" ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.3, repeat: speed !== "slow" ? Number.POSITIVE_INFINITY : 0 }}
              className={getSpeedColor()}
              style={{ willChange: "transform" }}
            >
              <SpeedIcon speed={speed} />
            </motion.div>

            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 capitalize">{speed}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
})

OptimizedScrollIndicator.displayName = "OptimizedScrollIndicator"
