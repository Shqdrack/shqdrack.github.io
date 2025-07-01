"use client"

import { useState, useEffect, useRef } from "react"

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const [direction, setDirection] = useState<"up" | "down">("down")
  const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("slow")
  const [isScrolling, setIsScrolling] = useState(false)

  const lastScrollY = useRef(0)
  const lastTimestamp = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTimestamp = Date.now()

      if (lastTimestamp.current) {
        const deltaY = currentScrollY - lastScrollY.current
        const deltaTime = currentTimestamp - lastTimestamp.current

        if (deltaTime > 0) {
          const currentVelocity = Math.abs(deltaY) / deltaTime
          setVelocity(currentVelocity)
          setDirection(deltaY > 0 ? "down" : "up")

          // Categorize speed
          if (currentVelocity > 2) {
            setSpeed("fast")
          } else if (currentVelocity > 0.5) {
            setSpeed("medium")
          } else {
            setSpeed("slow")
          }
        }
      }

      lastScrollY.current = currentScrollY
      lastTimestamp.current = currentTimestamp
      setIsScrolling(true)

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      // Set scrolling to false after scroll stops
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
        setVelocity(0)
        setSpeed("slow")
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [])

  return { velocity, direction, speed, isScrolling }
}
