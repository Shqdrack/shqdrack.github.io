"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Github, MessageCircle, MapPin } from "lucide-react"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "shadrack@codebloom.co.tz",
      href: "mailto:shadrack@codebloom.co.tz",
      description: "Let's discuss your next project",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@shqdrack",
      href: "https://github.com/shqdrack",
      description: "Check out my code repositories",
    },
    {
      icon: MessageCircle,
      label: "Discord",
      value: "fishycraft",
      href: "#",
      description: "Connect for real-time collaboration",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dar es Salaam, Tanzania",
      href: "#",
      description: "Building from the heart of East Africa",
    },
  ]

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 scroll-snap-align-start">
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
              Let's Build the Future Together
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Got an idea? Let's build it together — for Africa and beyond.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-105 group">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <method.icon className="w-6 h-6 text-white dark:text-black" />
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-black dark:text-white mb-2">{method.label}</h3>
                    <p className="text-black dark:text-white font-medium mb-2">{method.value}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{method.description}</p>
                    {method.href !== "#" && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black bg-transparent"
                      >
                        <a href={method.href} target="_blank" rel="noopener noreferrer">
                          Connect
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="bg-black dark:bg-white border-2 border-gray-800 dark:border-gray-200 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold text-white dark:text-black mb-4">
                  Ready to Collaborate?
                </h3>
                <p className="text-gray-300 dark:text-gray-700 mb-6">
                  Whether you have a project idea, need technical consultation, or want to discuss opportunities in
                  African tech, I'm always excited to connect with fellow innovators.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white"
                >
                  <a href="mailto:shadrack@codebloom.co.tz">
                    <Mail className="w-5 h-5 mr-2" />
                    Start a Conversation
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Footer Quote */}
          <motion.footer
            className="text-center pt-16 border-t border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <blockquote className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6 font-heading">
              "Building the future, one line of code at a time."
            </blockquote>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              © {new Date().getFullYear()} Shadrack Kambanga. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">Crafted with ❤️ in Dar es Salaam, Tanzania</p>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  )
}
