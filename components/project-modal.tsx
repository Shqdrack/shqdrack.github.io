"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectModalProps {
  project: any
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="font-heading text-2xl font-bold text-black dark:text-white">{project.title}</h2>
                <Badge variant="outline">{project.category}</Badge>
                <Badge variant="secondary">{project.status}</Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <h3 className="font-heading text-xl font-semibold mb-4 text-black dark:text-white">Overview</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{project.longDescription}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="font-heading text-xl font-semibold mb-4 text-black dark:text-white">Technology Stack</h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech: string) => (
                    <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-heading text-xl font-semibold mb-4 text-black dark:text-white">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <Zap className="w-4 h-4 text-black dark:text-white mt-1 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Impact */}
              <Card className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="font-heading text-lg text-black dark:text-white">Project Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.impact}</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button className="flex-1 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black">
                  <Github className="w-4 h-4 mr-2" />
                  View Source Code
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black bg-transparent"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
