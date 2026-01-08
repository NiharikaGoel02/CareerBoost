"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion() {
  const faqs = [
    {
      question: "How does ResumeIQ analyze my resume?",
      answer:
        "ResumeIQ uses advanced AI to parse your resume into structured data, analyzing key components like skills, experience, education, and formatting. It compares your resume against industry standards and job requirements to provide actionable insights and recommendations.",
    },
    {
      question: "What makes ResumeIQ different from other resume tools?",
      answer:
        "Unlike basic resume checkers, ResumeIQ provides personalized career guidance through our unique quiz system that adapts to your skill profile. We also offer company matching specifically for MERN stack and other tech roles, helping you target the right opportunities.",
    },
    {
      question: "How accurate is the ATS compatibility check?",
      answer:
        "Our ATS compatibility check simulates how your resume would perform in leading Applicant Tracking Systems. We've trained our AI on real-world ATS data to ensure over 95% accuracy in predicting how your resume will be parsed by employers.",
    },
    {
      question: "Can I use ResumeIQ if I'm not a developer?",
      answer:
        "While we have specialized insights for MERN stack and tech roles, ResumeIQ supports professionals across all industries. Our AI adapts its analysis and recommendations based on your specific career field and goals.",
    },
    {
      question: "How often can I update my resume?",
      answer:
        "Free users can upload one resume per month. Pro users enjoy unlimited resume uploads and updates, allowing you to continuously refine your resume based on our AI feedback and track your improvement over time.",
    },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="bg-white/70 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/20"
    >
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b border-gray-100 last:border-0"
        >
          <AccordionTrigger className="py-5 px-4 hover:no-underline hover:bg-white/50 rounded-xl transition-all text-left">
            <span className="font-medium text-lg">{faq.question}</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-5 pt-2 text-gray-600">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
