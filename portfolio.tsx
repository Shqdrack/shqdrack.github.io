"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Typewriter } from "@/components/typewriter"
import { ProjectModal } from "@/components/project-modal"
import { ContactForm } from "@/components/contact-form"
import {
  Github,
  Mail,
  MapPin,
  Code2,
  Smartphone,
  Globe,
  Database,
  Zap,
  Rocket,
  Star,
  ExternalLink,
  MessageCircle,
  Palette,
} from "lucide-react"
import { useState, useEffect } from "react"
import { ChartContainer } from "@/components/ui/chart"
import { PieChart, Pie, Cell, Tooltip as PieTooltip, Legend as PieLegend } from "recharts"

export default function Component() {
  const [currentTheme, setCurrentTheme] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      setCurrentTheme(Number.parseInt(savedTheme))
    }
  }, [])

  const themes = [
    {
      name: "Ocean Blue",
      bg: "bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50",
      darkBg: "dark:from-blue-900 dark:via-cyan-900 dark:to-teal-900",
      accent: "from-blue-600 to-cyan-600",
      cardBg: "bg-white/50",
      darkCardBg: "dark:bg-blue-800/50",
      sectionBg: "bg-blue-50/30",
      darkSectionBg: "dark:bg-blue-800/30",
      contactBg: "bg-gradient-to-r from-blue-50 to-cyan-50",
      darkContactBg: "dark:from-blue-800 dark:to-cyan-900",
      particles: "bg-blue-400",
    },
    {
      name: "Sunset Orange",
      bg: "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50",
      darkBg: "dark:from-orange-900 dark:via-red-900 dark:to-pink-900",
      accent: "from-orange-600 to-red-600",
      cardBg: "bg-white/50",
      darkCardBg: "dark:bg-orange-800/50",
      sectionBg: "bg-orange-50/30",
      darkSectionBg: "dark:bg-orange-800/30",
      contactBg: "bg-gradient-to-r from-orange-50 to-red-50",
      darkContactBg: "dark:from-orange-800 dark:to-red-900",
      particles: "bg-orange-400",
    },
    {
      name: "Forest Green",
      bg: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
      darkBg: "dark:from-green-900 dark:via-emerald-900 dark:to-teal-900",
      accent: "from-green-600 to-emerald-600",
      cardBg: "bg-white/50",
      darkCardBg: "dark:bg-green-800/50",
      sectionBg: "bg-green-50/30",
      darkSectionBg: "dark:bg-green-800/30",
      contactBg: "bg-gradient-to-r from-green-50 to-emerald-50",
      darkContactBg: "dark:from-green-800 dark:to-emerald-900",
      particles: "bg-green-400",
    },
    {
      name: "Royal Purple",
      bg: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50",
      darkBg: "dark:from-purple-900 dark:via-violet-900 dark:to-indigo-900",
      accent: "from-purple-600 to-violet-600",
      cardBg: "bg-white/50",
      darkCardBg: "dark:bg-purple-800/50",
      sectionBg: "bg-purple-50/30",
      darkSectionBg: "dark:bg-purple-800/30",
      contactBg: "bg-gradient-to-r from-purple-50 to-violet-50",
      darkContactBg: "dark:from-purple-800 dark:to-violet-900",
      particles: "bg-purple-400",
    },
    {
      name: "Cosmic Pink",
      bg: "bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50",
      darkBg: "dark:from-pink-900 dark:via-rose-900 dark:to-purple-900",
      accent: "from-pink-600 to-rose-600",
      cardBg: "bg-white/50",
      darkCardBg: "dark:bg-pink-800/50",
      sectionBg: "bg-pink-50/30",
      darkSectionBg: "dark:bg-pink-800/30",
      contactBg: "bg-gradient-to-r from-pink-50 to-rose-50",
      darkContactBg: "dark:from-pink-800 dark:to-rose-900",
      particles: "bg-pink-400",
    },
  ]

  const toggleTheme = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const newTheme = (currentTheme + 1) % themes.length
      setCurrentTheme(newTheme)
      localStorage.setItem("portfolio-theme", newTheme.toString())
      setIsAnimating(false)
    }, 150)
  }

  const theme = themes[currentTheme]

  const typewriterTexts = [
    "Building the future with code",
    "Creating solutions for Africa",
    "Transforming communities through tech",
    "Innovating for tomorrow",
  ]

  const skills = [
    { name: "React", level: "Advanced", icon: Code2 },
    { name: "Next.js", level: "Advanced", icon: Globe },
    { name: "TypeScript", level: "Intermediate", icon: Code2 },
    { name: "Python", level: "Advanced", icon: Code2 },
    { name: "Node.js", level: "Intermediate", icon: Database },
    { name: "React Native", level: "Intermediate", icon: Smartphone },
    { name: "AI/ML", level: "Learning", icon: Zap },
    { name: "Blockchain", level: "Learning", icon: Rocket },
  ]

  const projects = [
    {
      title: "Educore",
      description:
        "Revolutionary educational platform transforming how Tanzanian students access quality learning resources and connect with expert tutors.",
      longDescription:
        "Educore is a comprehensive educational platform designed to bridge the gap between students and quality education in Tanzania. The platform features interactive learning modules, real-time tutoring sessions, progress tracking, and a community-driven approach to learning. Built with modern web technologies, it provides seamless access to educational content across devices.",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "WebRTC"],
      status: "In Development",
      features: [
        "Interactive learning modules with multimedia content",
        "Real-time video tutoring sessions",
        "Progress tracking and analytics dashboard",
        "Community forums for peer-to-peer learning",
        "Mobile-responsive design for accessibility",
        "Multi-language support (Swahili & English)",
      ],
      challenges: [
        "Optimizing video streaming for low-bandwidth connections",
        "Creating an intuitive UI for users with varying tech literacy",
        "Implementing secure payment systems for local payment methods",
        "Building offline-first functionality for areas with poor connectivity",
      ],
      timeline: "8 months",
      teamSize: "Solo Developer",
      githubUrl: "https://github.com/shqdrack/educore",
      liveUrl: "https://educore-demo.vercel.app",
    },
    {
      title: "Medicore",
      description:
        "Next-generation healthcare management system streamlining patient care and medical record management across East Africa.",
      longDescription:
        "Medicore revolutionizes healthcare management by providing a comprehensive digital solution for hospitals, clinics, and healthcare providers. The system manages patient records, appointment scheduling, inventory management, and provides analytics for better healthcare delivery across East Africa.",
      tech: ["React", "Node.js", "PostgreSQL", "Express", "Socket.io"],
      status: "In Development",
      features: [
        "Electronic Health Records (EHR) management",
        "Appointment scheduling and management",
        "Inventory and pharmacy management",
        "Real-time notifications and alerts",
        "Analytics dashboard for healthcare insights",
        "Multi-facility support with role-based access",
      ],
      challenges: [
        "Ensuring HIPAA compliance and data security",
        "Creating intuitive interfaces for healthcare workers",
        "Implementing real-time synchronization across facilities",
        "Building robust backup and disaster recovery systems",
      ],
      timeline: "12 months",
      teamSize: "Solo Developer",
      githubUrl: "https://github.com/shqdrack/medicore",
    },
    {
      title: "Staffcore",
      description:
        "AI-powered workforce management solution helping businesses optimize team productivity and employee engagement.",
      longDescription:
        "Staffcore leverages artificial intelligence to help businesses manage their workforce more effectively. The platform provides insights into employee performance, automates scheduling, tracks productivity metrics, and offers recommendations for improving team dynamics and overall business efficiency.",
      tech: ["React Native", "Python", "MongoDB", "FastAPI", "TensorFlow"],
      status: "In Development",
      features: [
        "AI-powered employee performance analytics",
        "Automated scheduling and shift management",
        "Real-time productivity tracking",
        "Employee engagement surveys and feedback",
        "Predictive analytics for workforce planning",
        "Mobile app for on-the-go management",
      ],
      challenges: [
        "Developing accurate AI models for performance prediction",
        "Balancing automation with human oversight",
        "Ensuring employee privacy while gathering insights",
        "Creating scalable architecture for growing businesses",
      ],
      timeline: "10 months",
      teamSize: "Solo Developer",
      githubUrl: "https://github.com/shqdrack/staffcore",
    },
    {
      title: "Beatnest",
      description:
        "Innovative music discovery platform connecting African artists with global audiences through smart recommendation algorithms.",
      longDescription:
        "Beatnest is a music streaming and discovery platform specifically designed to promote African music and artists. Using advanced recommendation algorithms, the platform helps users discover new music while providing artists with tools to reach global audiences and monetize their content effectively.",
      tech: ["Vue.js", "Express", "Redis", "MongoDB", "Stripe API"],
      status: "In Development",
      features: [
        "Smart music recommendation engine",
        "Artist profile and portfolio management",
        "Streaming with high-quality audio",
        "Social features for music sharing",
        "Artist monetization tools",
        "Playlist creation and collaboration",
      ],
      challenges: [
        "Building accurate recommendation algorithms",
        "Handling large-scale audio streaming",
        "Creating fair monetization models for artists",
        "Implementing robust content delivery networks",
      ],
      timeline: "6 months",
      teamSize: "Solo Developer",
      githubUrl: "https://github.com/shqdrack/beatnest",
    },
    {
      title: "Lunarstrike",
      description:
        "Immersive Roblox gaming experience combining cutting-edge mechanics with strategic gameplay, built for the next generation of gamers.",
      longDescription:
        "Lunarstrike is an ambitious Roblox game that combines space exploration, strategic combat, and resource management. Set in a futuristic lunar environment, players must build bases, manage resources, and engage in tactical battles while exploring the mysteries of space. The game features advanced scripting, custom UI systems, and innovative gameplay mechanics.",
      tech: ["Roblox Studio", "Lua", "Roblox API", "DataStore2", "ReplicatedStorage"],
      status: "In Development",
      features: [
        "Advanced base building and customization system",
        "Strategic combat with multiple unit types",
        "Resource management and trading systems",
        "Multiplayer battles and alliances",
        "Custom UI and user experience design",
        "Progressive unlock and achievement system",
      ],
      challenges: [
        "Optimizing performance for large-scale multiplayer battles",
        "Creating balanced gameplay mechanics",
        "Implementing secure data storage for player progress",
        "Designing intuitive controls for complex gameplay",
      ],
      timeline: "14 months",
      teamSize: "Solo Developer",
      githubUrl: "https://github.com/shqdrack/lunarstrike",
    },
  ]

  const openProjectModal = (project: any) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  return (
    <div
      className={`${theme.bg} ${theme.darkBg} min-h-screen flex flex-col transition-all duration-700 ${isAnimating ? 'animate-fade-theme' : ''}`}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`floating-particle absolute w-2 h-2 ${theme.particles} rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className={`${theme.cardBg} ${theme.darkCardBg} backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:scale-110 ${isAnimating ? "animate-spin" : ""}`}
        >
          <Palette className="h-[1.2rem] w-[1.2rem] transition-all duration-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden min-h-screen flex items-center">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${theme.accent.replace("from-", "from-").replace("to-", "to-")}/10 dark:${theme.accent.replace("from-", "from-").replace("to-", "to-")}/20 transition-all duration-700`}
        />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 animate-fade-in-up">
              <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium font-body">
                <MapPin className="w-4 h-4 mr-2" />
                Dar es Salaam, Tanzania
              </Badge>
            </div>
            <h1
              className={`font-heading text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent mb-6 animate-fade-in-up animation-delay-200`}
            >
              Shadrack Kambanga
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400 min-h-[60px] flex items-center justify-center">
              <span className="font-body">Teenage developer from Tanzania </span>
              <Typewriter
                texts={typewriterTexts}
                className="font-body ml-1"
                speed={80}
                deleteSpeed={40}
                pauseTime={2000}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                className="px-8 py-3 text-lg hover:scale-105 transition-transform duration-300 font-body"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-lg bg-transparent hover:scale-105 transition-transform duration-300 font-body"
              >
                <Github className="w-5 h-5 mr-2" />
                View Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">About Me</h2>
              <p className="font-body text-lg text-muted-foreground">Building tomorrow's solutions today</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <Card
                  className={`border-0 shadow-lg ${theme.cardBg} ${theme.darkCardBg} backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:scale-105`}
                >
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 group">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${theme.accent} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg">Innovation Driven</h3>
                          <p className="font-body text-muted-foreground">Focused on futuristic tech solutions</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 group">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${theme.accent} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg">Global Impact</h3>
                          <p className="font-body text-muted-foreground">Creating solutions for African communities</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 group">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${theme.accent} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg">Continuous Learning</h3>
                          <p className="font-body text-muted-foreground">Always exploring new technologies</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6 animate-slide-in-right">
                <p className="font-body text-lg leading-relaxed text-muted-foreground">
                  I'm a visionary teenage developer from Tanzania on a mission to revolutionize how technology
                  transforms African communities. What started as pure curiosity about how digital magic works has
                  evolved into building game-changing solutions that tackle real-world challenges head-on.
                </p>
                <p className="font-body text-lg leading-relaxed text-muted-foreground">
                  From AI-powered education platforms to next-gen healthcare systems, I'm crafting technology that's not
                  just accessible and impactful, but designed with African innovation at its core. Every project I build
                  is a bold step toward a digitally empowered continent where tech serves everyone.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 hover:scale-105 transition-transform duration-300 font-body"
                  >
                    Self-taught Developer
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 hover:scale-105 transition-transform duration-300 font-body"
                  >
                    Tech Enthusiast
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 hover:scale-105 transition-transform duration-300 font-body"
                  >
                    Problem Solver
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 lg:py-32 ${theme.sectionBg} ${theme.darkSectionBg} transition-all duration-700`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
              <p className="font-body text-lg text-muted-foreground">Tools I use to bring ideas to life</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-md hover:shadow-lg transition-all duration-500 bg-white/70 backdrop-blur-sm hover:scale-110 ${theme.darkCardBg} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${theme.accent} rounded-full flex items-center justify-center mx-auto mb-4 hover:rotate-12 transition-transform duration-300`}
                    >
                      <skill.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">{skill.name}</h3>
                    <Badge
                      variant={
                        skill.level === "Advanced"
                          ? "default"
                          : skill.level === "Intermediate"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs font-body"
                    >
                      {skill.level}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Technology Pie Chart */}
            <div className="mt-16">
              <h3 className="font-heading text-2xl font-bold mb-6 text-center">Technologies Overview</h3>
              <ChartContainer
                config={{
                  React: { color: '#61dafb', label: 'React' },
                  'Next.js': { color: '#000', label: 'Next.js' },
                  TypeScript: { color: '#3178c6', label: 'TypeScript' },
                  Python: { color: '#3776ab', label: 'Python' },
                  'Node.js': { color: '#3c873a', label: 'Node.js' },
                  'React Native': { color: '#61dafb', label: 'React Native' },
                  'AI/ML': { color: '#facc15', label: 'AI/ML' },
                  Blockchain: { color: '#8c52ff', label: 'Blockchain' },
                }}
                style={{ width: '100%', height: 350 }}
              >
                {({ config }) => (
                  <PieChart width={400} height={350}>
                    <Pie
                      data={skills.map(skill => ({
                        name: skill.name,
                        value: skill.level === 'Advanced' ? 100 : skill.level === 'Intermediate' ? 70 : 40,
                        fill: config[skill.name]?.color || '#8884d8',
                      }))}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({ name }) => name}
                    >
                      {skills.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={config[entry.name]?.color || '#8884d8'} />
                      ))}
                    </Pie>
                    <PieTooltip />
                    <PieLegend />
                  </PieChart>
                )}
              </ChartContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="font-body text-lg text-muted-foreground">Building solutions that matter</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 backdrop-blur-sm ${theme.darkCardBg} hover:scale-105 animate-fade-in-up group cursor-pointer`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => openProjectModal(project)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-xl">{project.title}</CardTitle>
                      <Badge variant="secondary" className="font-body">
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="font-body text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs hover:scale-105 transition-transform duration-300 font-body"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge variant="outline" className="text-xs font-body">
                          +{project.tech.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full justify-between group-hover:bg-slate-100 dark:group-hover:bg-slate-800 transition-colors duration-300 font-body"
                    >
                      Learn More
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="my-0" />

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 lg:py-32 ${theme.contactBg} ${theme.darkContactBg} transition-all duration-700`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Let's Build the Future Together</h2>
              <p className="font-body text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                Interested in collaborating on innovative projects or discussing opportunities? I'm always excited to
                connect with fellow developers, entrepreneurs, and visionaries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-semibold mb-6">Get in touch</h3>

                <div className="grid gap-6">
                  <Card
                    className={`border-0 shadow-md bg-white/70 backdrop-blur-sm ${theme.darkCardBg} hover:scale-105 transition-all duration-300 group`}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <Mail
                        className={`w-8 h-8 ${theme.accent.includes("blue") ? "text-blue-600" : theme.accent.includes("orange") ? "text-orange-600" : theme.accent.includes("green") ? "text-green-600" : theme.accent.includes("purple") ? "text-purple-600" : "text-pink-600"} group-hover:scale-110 transition-transform duration-300`}
                      />
                      <div>
                        <h4 className="font-heading font-semibold">Email</h4>
                        <p className="font-body text-muted-foreground text-sm">shadrack@codebloom.co.tz</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`border-0 shadow-md bg-white/70 backdrop-blur-sm ${theme.darkCardBg} hover:scale-105 transition-all duration-300 group`}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <Github
                        className={`w-8 h-8 ${theme.accent.includes("blue") ? "text-blue-600" : theme.accent.includes("orange") ? "text-orange-600" : theme.accent.includes("green") ? "text-green-600" : theme.accent.includes("purple") ? "text-purple-600" : "text-pink-600"} group-hover:scale-110 transition-transform duration-300`}
                      />
                      <div>
                        <h4 className="font-heading font-semibold">GitHub</h4>
                        <p className="font-body text-muted-foreground text-sm">@shqdrack</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`border-0 shadow-md bg-white/70 backdrop-blur-sm ${theme.darkCardBg} hover:scale-105 transition-all duration-300 group`}
                  >
                    <CardContent className="p-6 flex items-center gap-4">
                      <MessageCircle
                        className={`w-8 h-8 ${theme.accent.includes("blue") ? "text-blue-600" : theme.accent.includes("orange") ? "text-orange-600" : theme.accent.includes("green") ? "text-green-600" : theme.accent.includes("purple") ? "text-purple-600" : "text-pink-600"} group-hover:scale-110 transition-transform duration-300`}
                      />
                      <div>
                        <h4 className="font-heading font-semibold">Discord</h4>
                        <p className="font-body text-muted-foreground text-sm">fishycraft</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm themeAccent={theme.accent} cardBg={theme.cardBg} darkCardBg={theme.darkCardBg} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 border-t ${theme.cardBg} ${theme.darkCardBg} backdrop-blur-sm transition-all duration-700`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p className="font-body">
              &copy; {new Date().getFullYear()} Shadrack Kambanga. Building the future, one line of code at a time.
            </p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        themeAccent={theme.accent}
      />

      <style jsx global>{`
        @keyframes fade-theme {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        .animate-fade-theme {
          animation: fade-theme 0.5s;
        }
      `}</style>
    </div>
  )
}
