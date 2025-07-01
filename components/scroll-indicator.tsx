"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0

      setScrollProgress(progress)

      // Determine scroll direction
      if (scrollTop > lastScrollY) {
        setScrollDirection("down")
      } else if (scrollTop < lastScrollY) {
        setScrollDirection("up")
      }

      // Hide indicator when at top or bottom
      setIsVisible(progress > 0.02 && progress < 0.98)

      lastScrollY = scrollTop
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    updateScrollProgress() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30"
    >
      {/* Scroll Progress Bar */}
      <div className="relative">
        <div className="w-1 h-32 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 origin-top rounded-full"
            style={{ scaleY: scrollProgress }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
        </div>

        {/* Scroll Direction Indicator */}
        <motion.div
          animate={{
            y: scrollDirection === "down" ? [0, 4, 0] : scrollDirection === "up" ? [0, -4, 0] : 0,
          }}
          transition={{ duration: 0.6, repeat: scrollDirection ? Number.POSITIVE_INFINITY : 0 }}
          className="absolute -right-8 top-1/2 transform -translate-y-1/2"
        >
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-slate-200 dark:border-slate-700">
            {scrollDirection === "down" ? (
              <ChevronDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </div>
        </motion.div>

        {/* Progress Percentage */}
        <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
