"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Eye } from "lucide-react"
import { ProjectModal } from "@/components/project-modal"

const projects = [
  {
    title: "Medicore",
    description: "A full-featured Hospital Management System tailored for the Tanzanian health sector.",
    category: "HealthTech",
    status: "In Development",
    tech: ["Node.js", "MongoDB", "React", "JWT", "TailwindCSS"],
    features: [
      "Doctor, Patient, Billing, and Pharmacy modules",
      "NHIF integration for seamless insurance processing",
      "Multilingual support (Swahili/English)",
      "Mobile-responsive design for all devices",
      "Real-time appointments and scheduling",
      "Lab results management and tracking",
      "Bed management and availability tracking",
      "Comprehensive reporting and analytics",
    ],
    impact:
      "Designed to serve hospitals and clinics across Tanzania, improving healthcare delivery and patient management.",
    longDescription:
      "Medicore is a comprehensive hospital management system specifically designed for the Tanzanian healthcare sector. It addresses the unique challenges faced by healthcare providers in East Africa, including NHIF integration, multilingual support, and mobile accessibility for healthcare workers in remote areas.",
  },
  {
    title: "Educore",
    description: "An e-learning system designed to bridge the education gap in rural Africa.",
    category: "EdTech",
    status: "In Development",
    tech: ["Next.js", "Supabase", "Firebase", "React"],
    features: [
      "Offline-first interactive learning modules",
      "Teacher and student dashboard systems",
      "Gamified learning with progress tracking",
      "Multi-language content support",
      "Video lessons with local content",
      "Assessment and grading tools",
      "Parent/guardian progress reports",
      "Community learning forums",
    ],
    impact: "Empowering rural students across Africa with quality education, regardless of internet connectivity.",
    longDescription:
      "Educore is an innovative e-learning platform designed to democratize education across rural Africa. With offline-first capabilities and culturally relevant content, it ensures that students in remote areas have access to quality education materials and interactive learning experiences.",
  },
  {
    title: "Staffcore",
    description:
      "An HR/Employee management tool with role-based access, payroll, leave tracking, and digital profiles.",
    category: "HR Tech",
    status: "In Development",
    tech: ["Node.js", "Express", "MongoDB", "React"],
    features: [
      "Role-based access control system",
      "Comprehensive payroll management",
      "Leave tracking and approval workflows",
      "Digital employee profiles and records",
      "Performance evaluation tools",
      "Attendance tracking and reporting",
      "Document management system",
      "Integration with local banking systems",
    ],
    impact:
      "Serving government institutions, schools, and hospitals across East Africa with efficient staff management.",
    longDescription:
      "Staffcore is a comprehensive HR and employee management system tailored for African institutions. It addresses the specific needs of government offices, educational institutions, and healthcare facilities, providing tools for efficient workforce management and compliance with local regulations.",
  },
  {
    title: "Beatnest",
    description: "A creative platform for African artists and producers.",
    category: "Music Tech",
    status: "In Development",
    tech: ["React", "Node.js", "TailwindCSS", "MongoDB"],
    features: [
      "Music management dashboard for artists",
      "Album and discography management tools",
      "Artist discovery and networking features",
      "Portfolio showcasing capabilities",
      "Collaboration tools for producers",
      "Revenue tracking and analytics",
      "Social media integration",
      "Event and concert management",
    ],
    impact: "Empowering African artists with tools to manage, showcase, and monetize their creative work.",
    longDescription:
      "Beatnest is a comprehensive platform designed to support the African music industry. It provides artists, producers, and music professionals with the tools they need to manage their work, connect with collaborators, and build their careers in the digital age.",
  },
  {
    title: "Lunarstrike",
    description: "A futuristic project focused on AI automation in game development and smart interface control.",
    category: "Gaming/AI",
    status: "Prototype",
    tech: ["Three.js", "OpenAI", "Node.js", "WebSockets"],
    features: [
      "AI-powered game bots and NPCs",
      "World-building APIs and tools",
      "Real-time multiplayer capabilities",
      "Discord integration for live interactions",
      "Procedural content generation",
      "Smart interface control systems",
      "Machine learning-based gameplay",
      "Cross-platform compatibility",
    ],
    impact: "Exploring the future of AI-driven gaming and interactive experiences.",
    longDescription:
      "Lunarstrike represents the cutting edge of AI-driven game development. This prototype explores how artificial intelligence can create more immersive, dynamic gaming experiences while providing developers with powerful tools for procedural content generation and intelligent game systems.",
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section id="projects" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 scroll-snap-align-start">
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
              Projects
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Building solutions that matter for African communities
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 group-hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="font-heading text-xl text-black dark:text-white">{project.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tech.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black bg-transparent"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openModal(project)}
                        className="flex-1 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
