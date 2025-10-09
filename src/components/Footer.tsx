import Link from "next/link";
import { Sprout, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sprout className="h-8 w-8" />
              <span className="text-xl font-bold">Amar Sanjivani</span>
            </div>
            <p className="text-green-100">
              Your trusted partner for premium fertilizers and pesticides.
              Growing together for a healthier harvest.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="text-green-100">Fertilizers</li>
              <li className="text-green-100">Pesticides</li>
              <li className="text-green-100">Herbicides</li>
              <li className="text-green-100">Fungicides</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-green-100">
                <Phone className="h-4 w-4" />
                <span>+9193139 14181</span>
              </li>
              <li className="flex items-center space-x-2 text-green-100">
                <Mail className="h-4 w-4" />
                <span>amarsanjeevani96@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2 text-green-100">
                <MapPin className="h-16 w-16 -mt-5" />
                <span>અમર ફાર્મ, નવાગામ ડાંભર પાટિયા, ઇટાળવાથી નવસારી–ગણદેવી રોડ, સ્વામિનારાયણ ગૌશાળા પાસે, ડાંભર, નવસારી– 395472.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-100">
          <p>
            &copy; {new Date().getFullYear()} Amar Sanjivani. All rights
            reserved. Design & Develop By ||
            <Link href="https://codespiresurat.vercel.app/" target="_black">
              <span className="text-blue-200"> Codespire Technology</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
