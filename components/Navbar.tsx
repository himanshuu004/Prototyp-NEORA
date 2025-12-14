"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { useConvexUser } from "./ClerkUserSync";
import { FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const convexUser = useConvexUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
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

  const user = convexUser;
  const userName = user?.name || "User";

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

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <FaTimes className="text-2xl text-gray-700" />
              ) : (
                <FaBars className="text-2xl text-gray-700" />
              )}
            </button>
            {isLoaded && isSignedIn && user ? (
              <div className="relative hidden md:block" ref={menuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  <FaUserCircle className="text-3xl" style={{ color: 'rgba(37, 142, 203)' }} />
                  <span className="text-base font-semibold text-gray-700">
                    {userName}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                      onClick={() => setShowProfileMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <hr className="my-1" />
                    <div className="px-4 py-2">
                      <SignOutButton>
                        <button className="w-full text-left text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2">
                          <FaSignOutAlt />
                          <span>Logout</span>
                        </button>
                      </SignOutButton>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden border-t border-gray-200 bg-white py-4 space-y-1"
          >
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
              {isLoaded && isSignedIn && user ? (
                <>
                  <Link
                    href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}
                    onClick={() => setShowMobileMenu(false)}
                    className="block px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <div className="px-4 py-3">
                    <SignOutButton>
                      <button className="w-full text-left text-base font-semibold text-red-600 hover:bg-gray-50 flex items-center space-x-2 py-2">
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </button>
                    </SignOutButton>
                  </div>
                </>
              ) : (
                <>
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
                    className="block mx-4 mb-2 px-4 py-3 text-base font-semibold text-white rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(230, 82, 139)' }}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
