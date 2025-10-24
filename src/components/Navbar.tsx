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
      {/* Top Banner (Always fixed to the top) */}
      <div className="bg-green-800 text-green-50 text-center py-2 fixed top-0 left-0 right-0 z-[1000]">
        <span className="hidden md:inline-block">
          ઘરે બેઠા અમર સંજીવની મેળવવા માટે વોટ્સ એપ કરો&nbsp;: &nbsp;
        </span>
        <span className="inline-block md:hidden">
          ઘરેબેઠા અમરસંજીવની મેળવવા વોટ્સ એપ&nbsp;:&nbsp;
        </span>
        <a href="https://wa.me/+919313914181" className="text-orange-200">
          +91 93139 14181
        </a>
      </div>

      {/* NAVBAR: Changed from 'sticky top-0' to 'fixed top-[38px] left-0 right-0' 
        The 'top-[38px]' ensures it sits right below the top banner (assuming the banner is ~38px high).
        Use 'top-0' if you remove the banner.
      */}
      <nav
        className="fixed top-[38px] left-0 right-0 z-[999] shadow-md"
        style={{
          background: "url('/background/farmer1.png')",
          backgroundPosition: "bottom left",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#fff",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-full h-full">
                <Image
                  src="/Logo/LOGONAME2.png"
                  alt="અમરસંજીવની"
                  width={400}
                  height={200}
                  className="object-cover"
                  // Added max-h-16 or max-h-20 to ensure it fits well
                  style={{ maxHeight: "5rem", width: "auto" }}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
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
                <div className="w-10 h-5 overflow-hidden ">
                  <GoogleTranslate pageLanguage="gu" />
                </div>
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
          className={`fixed top-[38px] right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden z-[1000] ${
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

      {/* DUMMY PUSH DIV: Add a div with the total height of the fixed headers 
          to prevent your page content from starting underneath the navbar.
          Banner height (~38px) + Navbar height (~80-96px) = ~118px - 134px
      */}
      <div className="pt-[115px] sm:pt-[134px] md:pt-[134px]"></div>
    </>
  );
}
