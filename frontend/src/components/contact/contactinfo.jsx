"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function ContactInfo() {
  const contactItems = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "hello@resumeiq.com",
      href: "mailto:hello@resumeiq.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      label: "LinkedIn",
      value: "@ResumeIQ",
      href: "https://linkedin.com/company/resumeiq",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Address",
      value: "San Francisco, CA",
      href: null,
    },
    {
      icon: <Clock className="h-6 w-6" />,
      label: "Business Hours",
      value: "Mon-Fri 9AM-6PM PST",
      href: null,
    },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4 group"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#f8a4a8]/20 to-[#a78bfa]/20 flex items-center justify-center text-[#a78bfa] group-hover:from-[#f8a4a8]/30 group-hover:to-[#a78bfa]/30 transition-all duration-300 backdrop-blur-sm border border-white/20">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-gray-800 hover:text-[#a78bfa] transition-colors duration-300 font-medium"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-800 font-medium">{item.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
