"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send, CheckCircle } from "lucide-react"

interface ContactFormProps {
  themeAccent: string
  cardBg: string
  darkCardBg: string
}

export function ContactForm({ themeAccent, cardBg, darkCardBg }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Card className={`${cardBg} ${darkCardBg} backdrop-blur-sm border-0 shadow-lg animate-fade-in-up`}>
        <CardContent className="p-8 text-center">
          <CheckCircle className={`w-16 h-16 mx-auto mb-4 text-green-500`} />
          <h3 className="font-heading text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="font-body text-muted-foreground">
            Thanks for reaching out! I'll get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${cardBg} ${darkCardBg} backdrop-blur-sm border-0 shadow-lg`}>
      <CardHeader>
        <CardTitle className="font-heading text-xl flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Send me a message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-body">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="font-body"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="font-body"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="font-body">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="font-body"
              placeholder="What's this about?"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="font-body">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="font-body min-h-[120px]"
              placeholder="Tell me about your project or idea..."
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full hover:scale-105 transition-transform duration-300"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
