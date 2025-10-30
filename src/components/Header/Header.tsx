"use client";

import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHotel,
  FaMoon,
  FaSun,
  FaCrown,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

import ThemeContext from "@/context/themeContext";
import Image from "next/image";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-100/50 dark:border-gray-800/50"
        }`}
      >
        {/* Fixed Dark Mode Background */}
        <div className="absolute inset-0 -z-10">
          {/* Light mode gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-purple-50/30 dark:hidden" />
          {/* Dark mode gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 hidden dark:block" />
          {/* Scrolled effect */}
          {scrolled && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
          )}
        </div>

        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <FaHotel className="text-white text-xl lg:text-2xl" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <FaCrown className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Hotelzz
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium -mt-1 tracking-wider">
                    PREMIUM EXPERIENCE
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-6 py-3 text-gray-700 dark:text-gray-200 font-semibold transition-all duration-300 group"
                  >
                    <span className="relative z-10 tracking-wide">
                      {item.label}
                    </span>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5" />

                    {/* Active Indicator */}
                    <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-500 transform -translate-x-1/2 rounded-full" />

                    {/* Fixed Shine Effect - Removed white gradient in dark mode */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 dark:via-transparent" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  const newTheme = !darkTheme;
                  setDarkTheme(newTheme);
                  localStorage.setItem("hotel-theme", newTheme.toString());
                }}
                className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                {darkTheme ? (
                  <FaSun className="text-lg lg:text-xl" />
                ) : (
                  <FaMoon className="text-lg lg:text-xl" />
                )}
              </motion.button>

              {/* User Profile */}
              {session?.user ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3"
                >
                  <Link href={`/users/${session.user.id}`}>
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <div className="relative">
                        {session.user.image ? (
                          <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                            <Image
                              src={session.user.image}
                              alt={session.user.name!}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            {session.user.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 -z-10" />
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="text-sm font-bold text-gray-800 dark:text-white">
                          {session.user.name?.split(" ")[0]}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          Premium Member
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/auth">
                    <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-5 lg:px-7 py-3 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 border border-blue-500/30">
                      <FaUserCircle className="text-lg lg:text-xl" />
                      <span className="font-bold text-sm lg:text-base tracking-wide">
                        Sign In
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 text-gray-600 dark:text-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-lg" />
                ) : (
                  <FaBars className="text-lg" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-2xl"
            >
              <motion.nav
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="container mx-auto px-4 py-6"
              >
                <div className="flex flex-col space-y-3">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-4 text-gray-700 dark:text-gray-200 font-semibold py-4 px-5 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-800 dark:hover:to-purple-900/20 transition-all duration-300 group border border-transparent hover:border-blue-200/50 dark:hover:border-purple-500/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-125" />
                        <span className="tracking-wide">{item.label}</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Sign In */}
                  {!session?.user && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                      className="pt-4"
                    >
                      <Link
                        href="/auth"
                        className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-5 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 border border-blue-500/30"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUserCircle className="text-xl" />
                        <span>Sign In to Your Account</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Add padding to prevent content overlap */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Header;
