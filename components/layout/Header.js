'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes('token');
    setIsLoggedIn(token);
  }, []);

  const handleLogout = async () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header className="bg-poly-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-poly-gold rounded-full flex items-center justify-center text-poly-blue font-bold text-xl">
              AIFP
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold">Akanu Ibiam Federal Polytechnic</h1>
              <p className="text-xs text-blue-200">Staff Directory Information System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-poly-gold transition-colors">
              Home
            </Link>
            <Link href="/staff" className="hover:text-poly-gold transition-colors">
              Directory
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Search staff..."
                className="bg-blue-800 text-white placeholder-blue-300 px-4 py-1 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-poly-gold"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    router.push(`/?search=${e.target.value}`);
                  }
                }}
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm" />
            </div>
            {isLoggedIn ? (
              <>
                <Link href="/admin" className="hover:text-poly-gold transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-full text-sm transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-poly-gold text-poly-blue px-4 py-1 rounded-full text-sm font-semibold hover:bg-yellow-500 transition-colors"
              >
                Admin Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-blue-700"
            >
              <div className="flex flex-col space-y-3">
                <Link href="/" className="hover:text-poly-gold transition-colors">
                  Home
                </Link>
                <Link href="/staff" className="hover:text-poly-gold transition-colors">
                  Directory
                </Link>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search staff..."
                    className="w-full bg-blue-800 text-white placeholder-blue-300 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-poly-gold"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        router.push(`/?search=${e.target.value}`);
                        setIsMenuOpen(false);
                      }
                    }}
                  />
                  <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
                </div>
                {isLoggedIn ? (
                  <>
                    <Link href="/admin" className="hover:text-poly-gold transition-colors">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="bg-poly-gold text-poly-blue px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-500 transition-colors text-center"
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}