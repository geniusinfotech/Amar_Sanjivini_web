import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer
      className="bg-green-900 text-white bg-no-repeat bg-right-bottom bg-contain rounded-t-4xl overflow-hidden
             bg-none md:bg-[url('/background/footer.png')]"
    >
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + About */}
          <div className="flex flex-col items-start max-sm:mx-auto py-6 px-1">
            <div className="flex-col items-center space-x-3 mb-4">
              <div className="h-auto w-72 sm:w-60 sm:h-auto overflow-hidden flex-shrink-0">
                <Image
                  src="/og-image-amarsanjeevani.png"
                  alt="logo"
                  width={300}
                  height={250}
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                />
              </div>
              <p className="text-green-100 text-2xl sm:text-base leading-relaxed text-center">
                દરેક પાકનો એક જ ઉપાય
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  href="/"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  હોમ
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  પ્રોડક્ટ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  અમારા વિશે
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-green-100 hover:text-white transition-colors"
                >
                  સંપર્ક
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm sm:text-base text-green-100">
              <li>Fertilizers</li>
              <li>Pesticides</li>
              <li>Herbicides</li>
              <li>Fungicides</li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm sm:text-base text-green-100">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span>+91 93139 14181</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="break-all text-sm">
                  amarsanjeevani96@gmail.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mt-1 flex-shrink-0" />
                <span className="leading-relaxed max-sm:w-72">
                  અમર ફાર્મ, નવાગામ ડાંભર પાટિયા, ઇટાળવાથી નવસારી–ગણદેવી રોડ,
                  સ્વામિનારાયણ ગૌશાળા પાસે, ડાંભર, નવસારી– 395472.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-800 mt-10 pt-6 text-center text-green-100 text-sm sm:text-base">
          <p className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
            <span>
              &copy; {new Date().getFullYear()} Amar Sanjeevani. All rights
              reserved.
            </span>
            <span className="hidden sm:inline">|</span>
            <span>
              Design & Developed by{" "}
              <Link
                href="https://codespiresurat.vercel.app/"
                target="_blank"
                className="text-blue-200 hover:text-blue-300"
              >
                Codespire Technology
              </Link>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
