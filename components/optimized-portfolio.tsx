"use client"

import { useEffect, lazy, Suspense, useState } from "react"
import { ProfessionalHeroSection } from "@/components/professional-hero-section"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { OptimizedThemeToggle } from "@/components/optimized-theme-toggle"
import { SmoothScrollManager } from "@/components/smooth-scroll-manager"
import { ScrollIndicator } from "@/components/scroll-indicator"

// Preload critical sections immediately
import { EnhancedProjectsSection } from "@/components/sections/enhanced-projects-section"

// Lazy load non-critical sections
const AboutSection = lazy(() =>
  import("@/components/sections/about-section").then((module) => ({ default: module.AboutSection })),
)
const BehindCodeSection = lazy(() =>
  import("@/components/sections/behind-code-section").then((module) => ({ default: module.BehindCodeSection })),
)
const SkillsSection = lazy(() =>
  import("@/components/sections/skills-section").then((module) => ({ default: module.SkillsSection })),
)
const ContactSection = lazy(() =>
  import("@/components/sections/contact-section").then((module) => ({ default: module.ContactSection })),
)

const OptimizedSectionFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Loading content...</p>
    </div>
  </div>
)

export default function OptimizedPortfolio() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Ensure scrolling is enabled and working properly
    const enableScrolling = () => {
      // Force enable scrolling
      document.documentElement.style.overflow = "auto"
      document.documentElement.style.overflowY = "scroll"
      document.body.style.overflow = "auto"
      document.body.style.overflowY = "scroll"

      // Ensure scroll behavior is smooth but natural
      document.documentElement.style.scrollBehavior = "smooth"
      document.body.style.scrollBehavior = "smooth"

      // Remove any potential scroll blocking
      document.documentElement.style.touchAction = "auto"
      document.body.style.touchAction = "auto"

      // Ensure minimum height for scrolling
      document.body.style.minHeight = "100vh"
    }

    // Enable scrolling immediately
    enableScrolling()

    // Optimize loading performance
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Prefetch lazy-loaded components after initial load
    const prefetchTimer = setTimeout(() => {
      import("@/components/sections/about-section")
      import("@/components/sections/behind-code-section")
      import("@/components/sections/skills-section")
      import("@/components/sections/contact-section")
    }, 1000)

    // Add professional styling
    document.body.style.fontFamily = "Inter, system-ui, sans-serif"

    // Preload critical resources
    const preloadLink = document.createElement("link")
    preloadLink.rel = "preload"
    preloadLink.as = "style"
    preloadLink.href = "/fonts/inter.css"
    document.head.appendChild(preloadLink)

    // Test scroll functionality
    const testScroll = () => {
      const scrollTest = document.createElement("div")
      scrollTest.style.height = "200vh"
      scrollTest.style.position = "absolute"
      scrollTest.style.top = "0"
      scrollTest.style.left = "-9999px"
      scrollTest.style.width = "1px"
      scrollTest.style.zIndex = "-1"
      document.body.appendChild(scrollTest)

      // Remove test element after a short delay
      setTimeout(() => {
        if (document.body.contains(scrollTest)) {
          document.body.removeChild(scrollTest)
        }
      }, 100)
    }

    testScroll()

    return () => {
      clearTimeout(loadTimer)
      clearTimeout(prefetchTimer)
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
      {/* Smooth Scroll Manager - Less aggressive */}
      <SmoothScrollManager />

      {/* Optimized Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-blue-50/50 dark:from-slate-900/50 dark:via-transparent dark:to-slate-800/50" />
      </div>

      <EnhancedNavigation />
      <OptimizedThemeToggle />
      <ScrollIndicator />

      <main className="relative z-10">
        <ProfessionalHeroSection />

        <Suspense fallback={<OptimizedSectionFallback />}>
          <AboutSection />
        </Suspense>

        {/* Projects section loads immediately - no lazy loading */}
        <EnhancedProjectsSection />

        <Suspense fallback={<OptimizedSectionFallback />}>
          <BehindCodeSection />
        </Suspense>

        <Suspense fallback={<OptimizedSectionFallback />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<OptimizedSectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Loading overlay for initial load */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-white dark:bg-slate-900 z-[100] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">Loading Portfolio...</p>
          </div>
        </div>
      )}
    </div>
  )
}
