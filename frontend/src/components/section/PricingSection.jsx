"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Basic resume analysis for job seekers",
      features: [
        "Basic resume score",
        "Limited ATS compatibility check",
        "1 resume upload per month",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 19, annual: 15 },
      description: "Advanced analysis and personalized guidance",
      features: [
        "Comprehensive resume analysis",
        "Full ATS optimization",
        "Unlimited resume uploads",
        "Personalized career quiz",
        "Company match recommendations",
        "Priority support",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: { monthly: 49, annual: 39 },
      description: "Complete career advancement solution",
      features: [
        "Everything in Pro",
        "Custom resume templates",
        "Interview preparation",
        "1-on-1 career coaching session",
        "LinkedIn profile optimization",
        "Job application tracking",
        "Dedicated account manager",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="bg-white/50 backdrop-blur-sm rounded-full p-1 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white shadow-md"
                  : "text-gray-600"
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual
                  ? "bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white shadow-md"
                  : "text-gray-600"
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual <span className="text-xs opacity-90">Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`relative rounded-2xl overflow-hidden ${
              plan.popular
                ? "bg-gradient-to-br from-[#f8a4a8]/10 to-[#a78bfa]/10 border-2 border-white/40 shadow-xl"
                : "bg-white/50 border border-white/20 shadow-lg"
            } backdrop-blur-md`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] text-white text-xs font-bold px-4 py-1 rounded-bl-lg shadow-md">
                  RECOMMENDED
                </div>
              </div>
            )}

            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className="text-gray-600 ml-1">
                  {plan.price.monthly > 0 ? "/month" : ""}
                </span>
                {isAnnual && plan.price.annual > 0 && (
                  <div className="text-sm text-gray-500">Billed annually</div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full rounded-xl py-6 ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 shadow-lg hover:shadow-xl hover:shadow-purple-200/30"
                    : "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
