"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import GoogleTranslate from "@/components/GoogleTranslate";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Auto-close Google banner after 5 seconds
    const timer = setTimeout(() => {
      const closeBtn = document.querySelector(
        ".VIpgJd-ZVi9od-TvD9Pc-hSRGPd"
      ) as HTMLElement;
      if (closeBtn) {
        closeBtn.click();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const links = [
    { href: "/", label: "હોમ" },
    { href: "/products", label: "પ્રોડક્ટ" },
    { href: "/about", label: "અમારા વિશે" },
    { href: "/contact", label: "સંપર્ક" },
  ];

  return (
    <>
      <div className="bg-green-800 text-green-50 text-center py-2">
        અમારું સ્પેશિયલ પ્રોડક્ટ : અમરસંજીવની
      </div>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-full h-full">
                <Image
                  src="/Logo/LOGONAME.png"
                  alt="અમરસંજીવની"
                  width={400}
                  height={200}
                  className="object-covers"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-green-700 font-medium transition-colors text-lg"
                >
                  {link.label}
                </Link>
              ))}

              {/* Google Translate - Desktop */}
              <div className="ml-4 flex items-center gap-2">
                ભાષા પસંદ કરો :
                <GoogleTranslate pageLanguage="gu" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Right Slide */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-50 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 pt-2 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-md font-medium text-base"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Google Translate - Mobile */}
            <div className="px-3 py-3 border-t mt-2 pt-4">
              <div className="text-sm text-gray-600 mb-2 font-medium">
                ભાષા પસંદ કરો:
              </div>
              <GoogleTranslate pageLanguage="gu" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
