"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/70 backdrop-blur-lg shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#f8a4a8] to-[#a78bfa] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">R</span>
                </div>
                <span className="ml-3 text-xl font-bold">ResumeIQ</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="#features" className="text-gray-700 hover:text-[#a78bfa] transition-colors font-medium">
                Features
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#a78bfa] transition-colors font-medium">
                Contact
              </Link>
              <Link to="#how-it-works" className="text-gray-700 hover:text-[#a78bfa] transition-colors font-medium">
                How It Works
              </Link>
              <Link to="#pricing" className="text-gray-700 hover:text-[#a78bfa] transition-colors font-medium">
                Pricing
              </Link>
              <Link to="#about" className="text-gray-700 hover:text-[#a78bfa] transition-colors font-medium">
                About
              </Link>
            </nav>

            <div className="hidden md:flex items-center">
              {user ? (
                <>
                  <Link to="/user/dashboard">
                    <Button variant="ghost" className="mr-4 text-gray-700 hover:text-[#a78bfa] hover:bg-transparent">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="text-gray-700 hover:text-red-600 hover:bg-transparent"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/user/signin">
                    <Button variant="ghost" className="mr-4 text-gray-700 hover:text-[#a78bfa] hover:bg-transparent">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/user/signup">
                    <Button className="rounded-full px-6 bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa] hover:opacity-90 transition-all shadow-md hover:shadow-lg border border-white/20 backdrop-blur-sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white/90 backdrop-blur-lg md:hidden"
          >
            <div className="flex justify-end p-4">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
              <Link to="#features" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </Link>
              <Link to="#how-it-works" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                How It Works
              </Link>
              <Link to="#pricing" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </Link>
              <Link to="#about" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <div className="pt-8 flex flex-col space-y-4">
                {user ? (
                  <>
                    <Link to="/user/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="rounded-full px-8 py-6 text-lg bg-transparent"
                      >
                        <User className="h-5 w-5 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="rounded-full px-8 py-6 text-lg bg-transparent text-red-600 hover:text-red-700"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/user/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="rounded-full px-8 py-6 text-lg bg-transparent"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/user/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-[#f8a4a8] to-[#a78bfa]"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
