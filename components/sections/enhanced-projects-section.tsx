"use client"

import { motion } from "framer-motion"
import { memo, useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Heart, GraduationCap, Users, Music, Gamepad2 } from "lucide-react"
import { ProjectModal } from "@/components/project-modal"

const projectCategories = {
  Education: { icon: GraduationCap, color: "from-blue-500 to-cyan-500" },
  Health: { icon: Heart, color: "from-green-500 to-emerald-500" },
  Productivity: { icon: Users, color: "from-purple-500 to-violet-500" },
  Media: { icon: Music, color: "from-orange-500 to-red-500" },
  Gaming: { icon: Gamepad2, color: "from-slate-500 to-gray-600" },
}

const projects = [
  {
    title: "Educore",
    category: "Education",
    status: "In Development",
    description:
      "Smart education platform revolutionizing learning in Tanzania with AI-powered personalized content and real-time collaboration tools.",
    longDescription:
      "Educore is transforming education across Tanzania by providing AI-powered personalized learning experiences. The platform adapts to each student's learning pace and style, offering interactive content, real-time tutoring, and comprehensive progress tracking.",
    tech: ["React", "Next.js", "TypeScript", "Supabase", "AI/ML"],
    features: ["AI-powered personalization", "Real-time collaboration", "Progress analytics", "Mobile-first design"],
    impact: "Reaching 500+ students across 12 schools in Dar es Salaam",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Medicore",
    category: "Health",
    status: "In Development",
    description:
      "Comprehensive hospital management system streamlining patient care, inventory management, and medical records across East Africa.",
    longDescription:
      "Medicore digitizes healthcare delivery by providing hospitals with comprehensive patient management, inventory tracking, and medical record systems. Built specifically for African healthcare challenges.",
    tech: ["React", "Node.js", "PostgreSQL", "Express"],
    features: ["Patient management", "Inventory tracking", "Medical records", "Analytics dashboard"],
    impact: "Deployed in 3 clinics, managing 1000+ patient records",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Staffcore",
    category: "Productivity",
    status: "In Development",
    description:
      "AI-powered staff and employee management system optimizing workforce productivity and engagement for African businesses.",
    longDescription:
      "Staffcore leverages AI to optimize workforce management, providing insights into employee performance, automated scheduling, and productivity analytics tailored for African business environments.",
    tech: ["React Native", "Python", "MongoDB", "FastAPI"],
    features: ["AI-powered analytics", "Automated scheduling", "Performance tracking", "Mobile workforce management"],
    impact: "Used by 5 SMEs, managing 200+ employees",
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Beatnest",
    category: "Media",
    status: "In Development",
    description:
      "Music distribution platform connecting African artists with global audiences. More than just music - it's cultural bridge-building.",
    longDescription:
      "Beatnest empowers African artists by providing global music distribution, royalty management, and audience analytics. The platform celebrates African culture while connecting artists to worldwide opportunities.",
    tech: ["Vue.js", "Express", "Redis", "Stripe"],
    features: ["Global distribution", "Royalty management", "Artist analytics", "Cultural promotion"],
    impact: "Supporting 50+ African artists, 10K+ streams globally",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Lunarstrike",
    category: "Gaming",
    status: "In Development",
    description:
      "Innovative Roblox gaming experience combining strategic gameplay with immersive storytelling. Details coming soon...",
    longDescription:
      "Lunarstrike is an ambitious Roblox game that combines strategic combat, resource management, and immersive storytelling. The game features custom mechanics and innovative gameplay designed to engage the next generation of gamers.",
    tech: ["Roblox Studio", "Lua", "Game Design"],
    features: ["Strategic combat", "Resource management", "Custom mechanics", "Immersive storytelling"],
    impact: "In development - targeting 1M+ plays on launch",
    color: "from-slate-500 to-gray-600",
  },
]

const ProjectCard = memo(({ project, index }: { project: any; index: number }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Ensure projects load immediately
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 100) // Stagger the animations

    return () => clearTimeout(timer)
  }, [index])

  const CategoryIcon = projectCategories[project.category as keyof typeof projectCategories].icon

  const openModal = (project: any) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
        className="h-full"
      >
        <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer group overflow-hidden">
          <CardHeader className="pb-4 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${project.color}`}>
                  <CategoryIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{project.category}</span>
              </div>
              <Badge
                variant="secondary"
                className="text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              >
                🔧 {project.status}
              </Badge>
            </div>
            <CardTitle className="font-heading text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {project.title}
            </CardTitle>
            <div
              className={`h-1 w-full bg-gradient-to-r ${project.color} rounded-full opacity-80 group-hover:opacity-100 transition-opacity`}
            />
          </CardHeader>

          <CardContent className="space-y-4 flex-1 flex flex-col">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm flex-1 line-clamp-3">
              {project.description}
            </p>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech: string) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="outline" className="text-xs font-medium">
                    +{project.tech.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-transparent text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <Github className="w-3 h-3 mr-1" />
                  Code
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => openModal(project)}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
})

ProjectCard.displayName = "ProjectCard"

export const EnhancedProjectsSection = memo(() => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Ensure the section loads immediately
    setIsVisible(true)
  }, [])

  return (
    <section
      id="projects"
      className="py-20 lg:py-32 bg-slate-50 dark:bg-slate-900/50 scroll-snap-align-start min-h-screen flex flex-col justify-center"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="font-heading text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Building innovative solutions that matter for African communities
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

EnhancedProjectsSection.displayName = "EnhancedProjectsSection"
