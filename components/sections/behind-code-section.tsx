"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Target, Users, Zap } from "lucide-react"

const insights = [
  {
    icon: Lightbulb,
    title: "Why I Built Educore",
    problem: "Limited access to quality education in rural Tanzania",
    solution: "AI-powered platform that adapts to each student's learning style",
    impact: "Democratizing education through technology",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "The Medicore Mission",
    problem: "Paper-based medical records causing treatment delays",
    solution: "Digital health records with real-time patient tracking",
    impact: "Saving lives through efficient healthcare delivery",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Staffcore's Purpose",
    problem: "Small businesses struggling with workforce management",
    solution: "AI-driven insights for optimal team productivity",
    impact: "Empowering African entrepreneurs to scale efficiently",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: Zap,
    title: "Beatnest's Vision",
    problem: "African artists lacking global music distribution",
    solution: "Platform connecting local talent to worldwide audiences",
    impact: "Amplifying African culture on the global stage",
    color: "from-orange-500 to-red-500",
  },
]

export function BehindCodeSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="behind-code" className="py-20 lg:py-32 scroll-snap-align-start">
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
              className="font-heading text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Behind the Code
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Every line of code tells a story. Here's the intention, impact, and real-world problems behind each
              innovation.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${insight.color}`}>
                        <insight.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-slate-900 dark:text-white">
                        {insight.title}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">The Problem</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{insight.problem}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">My Solution</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{insight.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Real Impact</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                          {insight.impact}
                        </p>
                      </div>
                    </div>

                    <div className={`mt-6 h-1 w-full bg-gradient-to-r ${insight.color} rounded-full`} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  My Core Philosophy
                </h3>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
                  "Technology should serve humanity, not the other way around. Every project I build starts with a real
                  person facing a real challenge. My code is my contribution to a more connected, empowered, and
                  innovative Africa."
                </p>
                <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                  — Shadrack Kambanga, General Manager at Codebloom Technologies
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
