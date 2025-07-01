"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Ensure proper scroll behavior
    document.documentElement.style.scrollBehavior = "smooth"
    document.body.style.overflow = "auto"

    setIsLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <ThemeToggle />

      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-white dark:bg-black z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-black dark:border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-black dark:text-white text-sm">Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}
