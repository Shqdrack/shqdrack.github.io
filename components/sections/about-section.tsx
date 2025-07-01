"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 scroll-snap-align-start">
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
              About Me
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Building the future of Africa through technology
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="h-full bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-6 text-black dark:text-white">
                    Self-Taught Developer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    I'm a self-taught developer passionate about creating tech solutions that serve African communities.
                    My journey began with curiosity and has evolved into a mission to bridge the digital divide across
                    the continent.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Every line of code I write is driven by the belief that technology can transform lives, especially
                    in underserved communities across Africa.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="h-full bg-black dark:bg-white border-2 border-gray-800 dark:border-gray-200 hover:border-gray-600 dark:hover:border-gray-400 transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-6 text-white dark:text-black">Focus Areas</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white dark:bg-black rounded-full"></div>
                      <span className="text-gray-300 dark:text-gray-700 font-medium">AI & Machine Learning</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white dark:bg-black rounded-full"></div>
                      <span className="text-gray-300 dark:text-gray-700 font-medium">Educational Technology</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white dark:bg-black rounded-full"></div>
                      <span className="text-gray-300 dark:text-gray-700 font-medium">Agricultural Technology</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white dark:bg-black rounded-full"></div>
                      <span className="text-gray-300 dark:text-gray-700 font-medium">Financial Technology</span>
                    </div>
                  </div>
                  <p className="text-gray-300 dark:text-gray-700 leading-relaxed mt-6">
                    <strong className="text-white dark:text-black">Mission:</strong> Aiming to create impact through
                    innovation, building solutions that address real challenges faced by African communities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
