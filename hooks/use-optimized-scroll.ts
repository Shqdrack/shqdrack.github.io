"use client"

import { useEffect, useState, useRef, useCallback } from "react"

interface ScrollData {
  scrollY: number
  velocity: number
  direction: "up" | "down" | "idle"
  speed: "slow" | "medium" | "fast" | "idle"
  isScrolling: boolean
  progress: number
}

// Throttle function for performance
function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
  let inThrottle: boolean
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}

export function useOptimizedScroll() {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    velocity: 0,
    direction: "idle",
    speed: "idle",
    isScrolling: false,
    progress: 0,
  })

  const lastScrollY = useRef(0)
  const lastTimestamp = useRef(0)
  const velocityHistory = useRef<number[]>([])
  const scrollTimeout = useRef<NodeJS.Timeout>()
  const rafId = useRef<number>()

  // Memoized scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      // Cancel previous RAF
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY
        const currentTime = performance.now()
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight

        // Calculate velocity
        const deltaY = currentScrollY - lastScrollY.current
        const deltaTime = currentTime - lastTimestamp.current

        let velocity = 0
        let direction: "up" | "down" | "idle" = "idle"
        let speed: "slow" | "medium" | "fast" | "idle" = "idle"

        if (deltaTime > 0) {
          const instantVelocity = Math.abs(deltaY) / deltaTime

          // Simplified velocity calculation
          velocityHistory.current.push(instantVelocity)
          if (velocityHistory.current.length > 3) {
            velocityHistory.current.shift()
          }

          velocity = velocityHistory.current.reduce((sum, v) => sum + v, 0) / velocityHistory.current.length

          direction = deltaY > 0 ? "down" : deltaY < 0 ? "up" : "idle"

          if (velocity > 0.1) {
            if (velocity < 0.5) speed = "slow"
            else if (velocity < 1.5) speed = "medium"
            else speed = "fast"
          }
        }

        const progress = maxScroll > 0 ? currentScrollY / maxScroll : 0

        setScrollData({
          scrollY: currentScrollY,
          velocity,
          direction,
          speed,
          isScrolling: true,
          progress,
        })

        // Clear existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }

        // Set scroll end timeout
        scrollTimeout.current = setTimeout(() => {
          setScrollData((prev) => ({
            ...prev,
            isScrolling: false,
            speed: "idle",
            direction: "idle",
          }))
          velocityHistory.current = []
        }, 100)

        lastScrollY.current = currentScrollY
        lastTimestamp.current = currentTime
      })
    }, 16), // ~60fps throttling
    [],
  )

  useEffect(() => {
    lastScrollY.current = window.scrollY
    lastTimestamp.current = performance.now()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll])

  return scrollData
}
