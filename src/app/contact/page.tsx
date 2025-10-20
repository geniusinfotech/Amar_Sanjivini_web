"use client";

import { MessageCircle, MapPin, Clock } from "lucide-react";
// WHATSAPP_NUMBER વૈશ્વિક કોન્સ્ટન્ટ્સ ફાઇલમાં વ્યાખ્યાયિત કરેલ છે તેમ ધારી રહ્યા છીએ
import { WHATSAPP_NUMBER } from "@/lib/types";

// WhatsApp ચેટ લિંક માટે મદદરૂપ ડિફોલ્ટ મેસેજ વ્યાખ્યાયિત કરો
const defaultWhatsappMessage = encodeURIComponent(
  "નમસ્કાર, હું તમારા ઉત્પાદનો અને સેવાઓ વિશે વધુ જાણવા માંગુ છું."
);

export default function ContactPage() {
  // વેરહાઉસ સરનામું વિગતો (મેપ સાથે)
  const frameAddressLines = [
    "એ. કુમાર એન્ડ કંપની (વેરહાઉસ)",
    "૬૭-૬૯, મીરા નગર સોસાયટી",
    "પટેલ સમાજ ભવનની સામે",
    "મીની બજાર, વરાછા રોડ, સુરત - ૩૯૫૦૦૬",
  ]; // રજિસ્ટર્ડ ઓફિસ સરનામું વિગતો (મેપ વગર)

  const registeredOfficeAddressLines = [
    "એ. કુમાર એન્ડ કંપની (રજિસ્ટર્ડ ઓફિસ)",
    "બી-૪૦૫, કોર્પોરેટ હબ",
    "રેલ્વે સ્ટેશનની નજીક",
    "રીંગ રોડ, સુરત - ૩૯૫૦૦૨",
  ]; // Google Maps એમ્બેડ સોર્સ વ્યાખ્યાયિત કરો. // *** મહત્વપૂર્ણ: તમારે આ પ્લેસહોલ્ડર URL ને તમારા વાસ્તવિક Google Maps એમ્બેડ લિંક સાથે બદલવું આવશ્યક છે. ***

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4799.485520825989!2d72.8512604!3d21.212798399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04efd59e71f1d%3A0x3c04d2fa043d93e7!2sAmar%20Swarn%20Mandir!5e1!3m2!1sen!2sin!4v1760764770166!5m2!1sen!2sin`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            અમારો સંપર્ક કરો
          </h1>

          <p className="text-lg text-green-100 max-w-2xl">
            તાત્કાલિક સપોર્ટ અને પૂછપરછ માટે સંપર્કમાં રહેવાનો સૌથી ઝડપી રસ્તો{" "}
            <b>વોટ્સએપ</b> દ્વારા છે.
          </p>
        </div>
      </div>
      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Responsive Grid Layout: સિંગલ કોલમ મોબાઇલ પર, બે કોલમ ડેસ્કટોપ પર */}

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          {/* WhatsApp સંપર્ક અને સમય કોલમ */}
          <div className="md:order-1">
            {/* WhatsApp Call-to-Action કાર્ડ */}
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-green-950 mb-4 sm:mb-6">
                અમારી સાથે તરત ચેટ કરો 💬
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                <b>વોટ્સએપ</b> પર અમારી ટીમ સાથે વાતચીત શરૂ કરવા માટે નીચે આપેલ
                બટન પર ક્લિક કરો.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultWhatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full justify-center"
              >
                <MessageCircle className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                વોટ્સએપ પર ચેટ શરૂ કરો
              </a>

              <div className="mt-6 text-center">
                <p className="text-gray-700 mb-1 text-sm sm:text-base">
                  અથવા અમને કૉલ / મેસેજ કરો:
                </p>

                <p className="text-2xl sm:text-3xl font-bold text-green-700">
                  +91 93139 14181
                </p>
              </div>
            </div>
            {/* Business Hours */}
            <div className="mt-8 flex items-start space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-700" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-950 mb-1">
                  સપોર્ટ અને વેરહાઉસ સમય
                </h3>

                <p className="text-gray-600 text-sm sm:text-base">
                  સોમવાર - શનિવાર: સવારે ૯:૦૦ થી સાંજે ૭:૦૦
                </p>

                <p className="text-gray-600 text-sm sm:text-base">
                  રવિવાર: સવારે ૧૦:૦૦ થી સાંજે ૪:૦૦
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  અમે આ સમય દરમિયાન સૌથી ઝડપી પ્રતિસાદ આપીએ છીએ.
                </p>
              </div>
            </div>
          </div>
          {/* Map અને Address કોલમ */}
          <div className="md:order-2">
            {/* વેરહાઉસ/પિકઅપ સરનામું અને મેપ */}
            <h2 className="text-2xl sm:text-3xl font-bold text-green-950 mb-6 border-b pb-2 border-gray-200">
              વેરહાઉસ / પિકઅપ સ્થળ
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
                title="ગૂગલ મેપ્સ પર વેરહાઉસનું સ્થાન"
              />
            </div>
            {/* વેરહાઉસ સરનામું વિગતો */}
            <div className="flex items-start space-x-4 mb-10 p-4 sm:p-6 bg-white rounded-lg shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-700" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-950 mb-1">
                  વેરહાઉસ સરનામું (લોજિસ્ટિક્સ અને મુલાકાતો માટે)
                </h3>

                {frameAddressLines.map((line, index) => (
                  <p key={index} className="text-gray-600 text-sm sm:text-base">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            {/* Registered Office Address */}
            <h2 className="text-2xl sm:text-3xl font-bold text-green-950 mb-6 border-b pb-2 border-gray-200">
              રજિસ્ટર્ડ ઓફિસ
            </h2>

            <div className="flex items-start space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-md border-t-4 border-green-700">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-green-700" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-950 mb-1">
                  રજિસ્ટર્ડ ઓફિસ સરનામું (દસ્તાવેજો માટે)
                </h3>

                {registeredOfficeAddressLines.map((line, index) => (
                  <p key={index} className="text-gray-600 text-sm sm:text-base">
                    {line}
                  </p>
                ))}

                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  *કૃપા કરીને તમામ સત્તાવાર પત્રવ્યવહાર આ સરનામે મોકલો.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
