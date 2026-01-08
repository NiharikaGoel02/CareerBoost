"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      company: "TechCorp",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "ResumeIQ transformed my job search. The AI analysis pinpointed exactly what was missing from my resume, and within two weeks of making the suggested changes, I landed my dream job at a top tech company.",
    },
    {
      name: "Sarah Chen",
      role: "Full Stack Engineer",
      company: "InnovateSoft",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "The personalized career quiz was eye-opening. It identified strengths I hadn't emphasized and suggested skills to develop. Following ResumeIQ's recommendations helped me transition from junior to senior developer in just 8 months.",
    },
    {
      name: "Michael Rodriguez",
      role: "MERN Stack Developer",
      company: "WebStack Solutions",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "As someone specializing in MERN stack development, ResumeIQ's targeted company matches were incredibly accurate. The platform suggested companies I hadn't considered but that were perfect fits for my experience and career goals.",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-xl border border-white/20"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={testimonials[currentIndex].image || "/placeholder.svg"}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] flex items-center justify-center shadow-lg">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div>
                  <div className="font-bold text-lg">{testimonials[currentIndex].name}</div>
                  <div className="text-gray-600">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] w-6" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
