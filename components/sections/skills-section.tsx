"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

const skillCategories = [
  {
    title: "Frontend & Frameworks",
    skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "React Native"],
    level: "Advanced",
    percentage: 90,
  },
  {
    title: "Backend & Databases",
    skills: ["Node.js", "Python", "MongoDB", "PostgreSQL", "Express"],
    level: "Advanced",
    percentage: 85,
  },
  {
    title: "Emerging Technologies",
    skills: ["AI/ML", "Blockchain", "Docker", "WebSockets", "Three.js"],
    level: "Learning",
    percentage: 60,
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-20 lg:py-32 scroll-snap-align-start">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="font-heading text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Skills
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Technologies I use to build the future
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.4 + categoryIndex * 0.2 }}
              >
                <Card className="h-full bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="font-heading text-xl font-bold mb-2 text-black dark:text-white">
                        {category.title}
                      </h3>
                      <div className="text-3xl font-bold text-black dark:text-white mb-2">{category.percentage}%</div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">{category.level}</div>
                    </div>

                    {/* Progress Circle */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-24 h-24">
                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-200 dark:text-gray-800"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                            className="text-black dark:text-white"
                            initial={{ pathLength: 0 }}
                            animate={isInView ? { pathLength: category.percentage / 100 } : { pathLength: 0 }}
                            transition={{ duration: 2, delay: 0.6 + categoryIndex * 0.2 }}
                            style={{
                              strokeDasharray: "251.2",
                              strokeDashoffset: "251.2",
                            }}
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          className="text-center p-2 bg-gray-50 dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5, delay: 0.8 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                        >
                          <span className="text-xs font-medium text-black dark:text-white">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
