"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { FloatingLabelInput } from "./floatinginputlabel";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage(data.error || "Failed to send message.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
    setIsSubmitting(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a message</h2>
        <p className="text-gray-600">We'll get back to you within 24 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingLabelInput
            label="Full Name"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            required
          />
          <FloatingLabelInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(value) => handleChange("email", value)}
            required
          />
        </div>

        <FloatingLabelInput
          label="Subject"
          value={formData.subject}
          onChange={(value) => handleChange("subject", value)}
          required
        />

        <div className="relative">
          <Textarea
            placeholder="Your message..."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="min-h-[120px] bg-white/50 border-gray-200 text-gray-800 placeholder:text-gray-500 focus:border-[#a78bfa] focus:ring-[#a78bfa]/20 resize-none rounded-xl backdrop-blur-sm"
            required
          />
          <label className="absolute -top-2 left-3 bg-white px-2 text-sm text-gray-600">Message</label>
        </div>

        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold text-center">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold text-center">{errorMessage}</div>
        )}

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 shadow-lg hover:shadow-xl hover:shadow-purple-200/30 transition-all duration-300 border border-white/20 backdrop-blur-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#f8a4a8]/20 to-[#a78bfa]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center text-white">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                  <Sparkles className="ml-2 h-4 w-4 animate-pulse" />
                </>
              )}
            </div>
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
