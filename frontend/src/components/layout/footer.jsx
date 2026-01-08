import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white/30 backdrop-blur-md border-t border-gray-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#f8a4a8] to-[#a78bfa] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="ml-3 text-xl font-bold">ResumeIQ</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Transforming careers through AI-powered resume analysis and personalized career guidance for the modern
              job seeker.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-500 hover:text-[#a78bfa] transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-500 hover:text-[#a78bfa] transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-500 hover:text-[#a78bfa] transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-500 hover:text-[#a78bfa] transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-[#a78bfa] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ResumeIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
