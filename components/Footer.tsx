import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="text-white mt-auto" style={{ backgroundColor: 'rgba(29, 144, 202)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-4 group">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 bg-white rounded-full opacity-100 transform scale-110"></div>
                <div className="relative bg-white rounded-full p-4 shadow-xl transform group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/neora_logo.png"
                    alt="NEORA Logo"
                    width={140}
                    height={70}
                    className="h-14 w-auto object-contain"
                  />
                </div>
              </div>
            </Link>
            <p className="text-white text-sm mt-2">
              Empowering lives through comprehensive therapy services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:opacity-80 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:opacity-80 transition-opacity">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:opacity-80 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:opacity-80 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>Speech Therapy</li>
              <li>Occupational Therapy</li>
              <li>Special Education</li>
              <li>Behaviour & Life Skills</li>
              <li>Adult Speech & Voice</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-white">
              <li>Email: info@neora.com</li>
              <li>Phone: +91 XXXX XXXX XX</li>
              <li>
                Hours: Mon-Fri 9AM-6PM
                <br />
                Sat 9AM-1PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-30 mt-8 pt-8 text-center text-white text-sm">
          <p>&copy; {new Date().getFullYear()} NEORA Therapy Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

