"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavbarWithClerk from "./NavbarWithClerk";
import { FaBars, FaTimes } from "react-icons/fa";

// Check if Clerk key is available
function isClerkAvailable(): boolean {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return !!(key && (key.startsWith("pk_test_") || key.startsWith("pk_live_")));
}

// Simple navbar without Clerk (fallback)
function NavbarSimple() {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/disorders", label: "Disorders" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/neora_logo.jpg"
              alt="NEORA Logo"
              width={280}
              height={120}
              className="h-24 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-gradient-to-r from-blue-50 to-pink-50 text-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
                style={isActive(link.href) ? { color: 'rgba(37, 142, 203)' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="hidden md:block px-5 py-2.5 text-base font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="hidden md:block px-6 py-2.5 text-base font-semibold text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              style={{ backgroundColor: 'rgba(230, 82, 139)' }}
            >
              Sign Up
            </Link>
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        {showMobileMenu && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-gray-200 bg-white py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-3 text-base font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-gradient-to-r from-blue-50 to-pink-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={isActive(link.href) ? { color: 'rgba(37, 142, 203)' } : {}}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <Link
                href="/login"
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-3 text-base font-semibold text-white rounded-lg mx-4"
                style={{ backgroundColor: 'rgba(230, 82, 139)' }}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function Navbar() {
  // Only use Clerk navbar if Clerk is available
  if (isClerkAvailable()) {
    return <NavbarWithClerk />;
  }
  return <NavbarSimple />;
}
