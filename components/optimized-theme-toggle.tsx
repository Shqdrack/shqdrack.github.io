"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function OptimizedThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-[60]">
        <Button variant="outline" size="icon" className="w-12 h-12 bg-transparent">
          <div className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    setTheme(newTheme)

    // Force immediate DOM update for instant feedback
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="fixed top-6 right-6 z-[60]"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="w-12 h-12 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <motion.div
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          key={isDark ? "dark" : "light"}
        >
          {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-600" />}
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
