"use client"

import { useEffect } from "react"

export function SmoothScrollManager() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    const initializeScrollBehavior = () => {
      // Ensure we start at the top
      window.scrollTo(0, 0)

      // Enable smooth scroll behavior but keep it natural
      document.documentElement.style.scrollBehavior = "smooth"
      document.body.style.scrollBehavior = "smooth"

      // Enable scroll snap but make it less aggressive
      document.documentElement.style.scrollSnapType = "y proximity" // Changed from "mandatory" to "proximity"

      // Ensure all sections have proper scroll snap alignment
      const sections = document.querySelectorAll("section")
      sections.forEach((section, index) => {
        section.style.scrollSnapAlign = "start"
        section.style.minHeight = "100vh"
        section.style.position = "relative"

        // Remove scroll-snap-stop to allow natural scrolling
        section.style.scrollSnapStop = "normal"

        // Add section index for debugging
        section.setAttribute("data-section-index", index.toString())
      })
    }

    // Initialize on mount
    initializeScrollBehavior()

    // Improved scroll handling that doesn't interfere with natural scrolling
    let scrollTimeout: NodeJS.Timeout
    let isUserScrolling = false

    const handleScroll = () => {
      isUserScrolling = true

      // Clear the timeout if it exists
      clearTimeout(scrollTimeout)

      // Set a timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false

        // Optional: Gentle snap to nearest section only if we're very close
        const sections = document.querySelectorAll("section")
        const currentScroll = window.scrollY
        const viewportHeight = window.innerHeight

        // Find the closest section
        let closestSection = sections[0]
        let closestDistance = Math.abs(currentScroll)

        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop
          const distance = Math.abs(currentScroll - sectionTop)

          if (distance < closestDistance) {
            closestDistance = distance
            closestSection = section
          }
        })

        // Only snap if we're very close (within 5% of viewport height)
        const snapThreshold = viewportHeight * 0.05
        if (closestDistance < snapThreshold && closestDistance > 0) {
          const targetTop = (closestSection as HTMLElement).offsetTop
          window.scrollTo({
            top: targetTop,
            behavior: "smooth",
          })
        }
      }, 300) // Increased timeout for more natural feel
    }

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Enhanced keyboard navigation that works with natural scrolling
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if no input is focused
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return
      }

      const sections = document.querySelectorAll("section")
      const currentScroll = window.scrollY
      const viewportHeight = window.innerHeight

      // Find current section
      let currentSectionIndex = 0
      sections.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop
        if (currentScroll >= sectionTop - viewportHeight / 3) {
          currentSectionIndex = index
        }
      })

      switch (event.key) {
        case "ArrowDown":
          if (event.ctrlKey || event.metaKey) {
            // Only with modifier keys
            event.preventDefault()
            if (currentSectionIndex < sections.length - 1) {
              const nextSection = sections[currentSectionIndex + 1] as HTMLElement
              window.scrollTo({
                top: nextSection.offsetTop,
                behavior: "smooth",
              })
            }
          }
          break

        case "ArrowUp":
          if (event.ctrlKey || event.metaKey) {
            // Only with modifier keys
            event.preventDefault()
            if (currentSectionIndex > 0) {
              const prevSection = sections[currentSectionIndex - 1] as HTMLElement
              window.scrollTo({
                top: prevSection.offsetTop,
                behavior: "smooth",
              })
            }
          }
          break

        case "Home":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          break

        case "End":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            const lastSection = sections[sections.length - 1] as HTMLElement
            window.scrollTo({
              top: lastSection.offsetTop,
              behavior: "smooth",
            })
          }
          break
      }
    }

    // Add keyboard listener
    window.addEventListener("keydown", handleKeyDown)

    // Remove aggressive wheel handling - let browser handle natural scrolling
    // The previous wheel handler was too aggressive and prevented natural scrolling

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
      clearTimeout(scrollTimeout)

      // Reset scroll behavior to browser defaults
      document.documentElement.style.scrollSnapType = "none"
      document.documentElement.style.scrollBehavior = "auto"
      document.body.style.scrollBehavior = "auto"
    }
  }, [])

  return null // This component doesn't render anything
}
