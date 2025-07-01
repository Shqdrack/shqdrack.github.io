"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseTime?: number
  className?: string
}

export function Typewriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const targetText = texts[currentTextIndex]

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(pauseTimer)
    }

    if (!isDeleting && currentText === targetText) {
      setIsPaused(true)
      return
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setCurrentText(targetText.substring(0, currentText.length - 1))
        } else {
          setCurrentText(targetText.substring(0, currentText.length + 1))
        }
      },
      isDeleting ? deleteSpeed : speed,
    )

    return () => clearTimeout(timer)
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseTime])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
