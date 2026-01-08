import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export function ContactFAQ() {
  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer:
        "We typically respond to all inquiries within 24 hours during business days. For urgent technical issues, we aim to respond within 4-6 hours.",
    },
    {
      question: "Do you offer phone support?",
      answer:
        "Yes! Phone support is available for Pro and Enterprise users during business hours (Mon-Fri 9AM-6PM PST). Free users can reach us via email or chat.",
    },
    {
      question: "Can I schedule a demo or consultation?",
      answer:
        "We offer personalized demos for teams and organizations. Use the contact form above or email us directly to schedule a session that works for your timezone.",
    },
    {
      question: "What information should I include in my message?",
      answer:
        "Please include your account email, a detailed description of your question or issue, and any relevant screenshots. This helps us provide faster, more accurate assistance.",
    },
    {
      question: "Do you provide technical integration support?",
      answer:
        "Yes, our technical team can assist with API integrations, bulk uploads, and custom implementations for Enterprise customers. Contact us to discuss your specific needs.",
    },
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
          <HelpCircle className="mr-3 h-8 w-8 text-[#f8a4a8]" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white/50 rounded-xl border border-white/20 px-6 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-gray-800 hover:text-[#a78bfa] transition-colors duration-300 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
