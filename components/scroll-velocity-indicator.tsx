"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useScrollVelocity } from "@/hooks/use-scroll-velocity"
import { ChevronUp, ChevronDown, Zap, Wind, Rocket } from "lucide-react"

export function ScrollVelocityIndicator() {
  const { velocity, direction, speed, isScrolling } = useScrollVelocity()

  const getSpeedIcon = () => {
    switch (speed) {
      case "slow":
        return Wind
      case "medium":
        return Zap
      case "fast":
        return Rocket
      default:
        return Wind
    }
  }

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

  const SpeedIcon = getSpeedIcon()

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 50 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 right-6 z-40 pointer-events-none"
        >
          <div className="bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              {/* Direction indicator */}
              <motion.div
                animate={{
                  y: direction === "down" ? [0, 3, 0] : direction === "up" ? [0, -3, 0] : 0,
                }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-blue-500 dark:text-purple-400"
              >
                {direction === "down" ? (
                  <ChevronDown className="w-4 h-4" />
                ) : direction === "up" ? (
                  <ChevronUp className="w-4 h-4" />
                ) : null}
              </motion.div>

              {/* Speed indicator */}
              <motion.div
                animate={{
                  scale: speed === "fast" ? [1, 1.2, 1] : speed === "medium" ? [1, 1.1, 1] : 1,
                  rotate: speed === "fast" ? [0, 5, -5, 0] : 0,
                }}
                transition={{ duration: 0.3, repeat: speed !== "slow" ? Number.POSITIVE_INFINITY : 0 }}
                className={getSpeedColor()}
              >
                <SpeedIcon className="w-4 h-4" />
              </motion.div>

              {/* Speed text */}
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300 capitalize">{speed}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
