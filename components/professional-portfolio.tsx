"use client"

import { useEffect, lazy, Suspense } from "react"
import { ProfessionalHeroSection } from "@/components/professional-hero-section"
import { OptimizedThemeToggle } from "@/components/optimized-theme-toggle"

// Lazy load sections for better performance
const AboutSection = lazy(() =>
  import("@/components/sections/about-section").then((module) => ({ default: module.AboutSection })),
)
const OptimizedProjectsSection = lazy(() =>
  import("@/components/sections/optimized-projects-section").then((module) => ({
    default: module.OptimizedProjectsSection,
  })),
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

const SectionFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-600 dark:text-slate-400 text-sm">Loading...</p>
    </div>
  </div>
)

export default function ProfessionalPortfolio() {
  useEffect(() => {
    // Ensure we start at the top on initial load
    window.scrollTo(0, 0)

    // Enable full-page smooth scroll snapping
    document.documentElement.style.scrollSnapType = "y mandatory"
    document.documentElement.style.scrollBehavior = "smooth"

    // Ensure sections take full viewport height
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      section.style.minHeight = "100vh"
      section.style.scrollSnapAlign = "start"
    })

    // Add professional styling
    document.body.style.fontFamily = "Inter, system-ui, sans-serif"

    // Preload critical resources
    const preloadLink = document.createElement("link")
    preloadLink.rel = "preload"
    preloadLink.as = "style"
    preloadLink.href = "/fonts/inter.css"
    document.head.appendChild(preloadLink)

    return () => {
      document.documentElement.style.scrollSnapType = "none"
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500">
      {/* Professional Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-blue-50/50 dark:from-slate-900/50 dark:via-transparent dark:to-slate-800/50" />
      </div>

      <OptimizedThemeToggle />

      <main className="relative z-10">
        <ProfessionalHeroSection />

        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <OptimizedProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <BehindCodeSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>
    </div>
  )
}
