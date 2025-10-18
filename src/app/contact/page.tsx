"use client";

import { MessageCircle, MapPin, Clock } from "lucide-react";
// Assuming WHATSAPP_NUMBER is defined in a global constants file
import { WHATSAPP_NUMBER } from "@/lib/types";

// Pre-define a helpful default message for the WhatsApp chat link
const defaultWhatsappMessage = encodeURIComponent(
  "Hi, I would like to know more about your products and services."
);

export default function ContactPage() {
  // Define the Frame/Warehouse address details (the one with the map)
  const frameAddressLines = [
    "A. Kumar & Co. (Warehouse)",
    "67-69, Mira Nagar Society",
    "Front off Patel Samaj Bhavan",
    "Mini Bazar, Varachcha Road, Surat - 395006",
  ];

  // Define the Registered Office address details (without a map)
  const registeredOfficeAddressLines = [
    "A. Kumar & Co. (Registered Office)",
    "B-405, Corporate Hub",
    "Near Railway Station",
    "Ring Road, Surat - 395002",
  ];

  // Define the Google Maps embed source.
  // *** IMPORTANT: You must REPLACE THIS PLACEHOLDER URL with your actual Google Maps embed link. ***
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4799.485520825989!2d72.8512604!3d21.212798399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04efd59e71f1d%3A0x3c04d2fa043d93e7!2sAmar%20Swarn%20Mandir!5e1!3m2!1sen!2sin!4v1760764770166!5m2!1sen!2sin`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-green-100 max-w-2xl">
            The fastest way to get in touch is via <b>WhatsApp</b> for immediate
            support and inquiries.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Responsive Grid Layout: Single column on mobile, two columns on desktop */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {/* WhatsApp Contact & Hours Column */}
          <div className="md:order-1">
            {/* WhatsApp Call-to-Action Card */}
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Chat With Us Instantly 💬
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                Click the button below to start a conversation with our team on
                **WhatsApp**.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultWhatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center"
              >
                <MessageCircle className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Start Chat on WhatsApp
              </a>

              <div className="mt-6 text-center">
                <p className="text-gray-700 mb-1 text-sm sm:text-base">
                  Or call/message us at:
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-green-700">
                  +91 90139 14181
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 flex items-start space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Support & Warehouse Hours
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Monday - Saturday: 9:00 AM - 7:00 PM
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  Sunday: 10:00 AM - 4:00 PM
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  We respond fastest during these hours.
                </p>
              </div>
            </div>
          </div>

          {/* Map and Address Column */}
          <div className="md:order-2">
            {/* Warehouse/Frame Address & Map */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200">
              Warehouse / Pickup Location
            </h2>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Warehouse Location on Google Maps"
              />
            </div>

            {/* Warehouse Address Details */}
            <div className="flex items-start space-x-4 mb-10 p-4 sm:p-6 bg-white rounded-lg shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Warehouse Address (For Logistics & Visits)
                </h3>
                {frameAddressLines.map((line, index) => (
                  <p key={index} className="text-gray-600 text-sm sm:text-base">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Registered Office Address */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 border-b pb-2 border-gray-200">
              Registered Office
            </h2>

            <div className="flex items-start space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-md border-t-4 border-green-700">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Registered Office Address (For Documentation)
                </h3>
                {registeredOfficeAddressLines.map((line, index) => (
                  <p key={index} className="text-gray-600 text-sm sm:text-base">
                    {line}
                  </p>
                ))}
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  *Please send all official correspondence to this address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
