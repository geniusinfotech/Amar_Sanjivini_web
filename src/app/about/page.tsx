"use client"; // Add this directive for Framer Motion

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion
import { Leaf, Users, Target, Award, ArrowRight } from "lucide-react";

// --- Animation Variants --- (Unchanged)

// General container variant for staggering children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time gap between children starting
    },
  },
};

// Variant for elements that fade in and slide up
const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// Variant for images that fade in and scale slightly
const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      {/* Hero Section - Immediate Entrance Animation */}
      <motion.div
        className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            અમરસંજીવની એગ્રો પ્રોડક્ટસ
          </h1>

          <p className="text-lg text-green-100 max-w-2xl">
            જમીનની ફળદ્રુપતા વધારવા અને પાકનું ઉત્પાદન વધારવા માટેનું વિજ્ઞાન
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Who We Are Section - Scroll-In Animation (Updated Content) */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className="relative h-96 rounded-lg overflow-hidden shadow-xl"
            variants={imageVariants}
          >
            {/* Keeping the existing Youtube embed */}
            <iframe
              src="https://www.youtube.com/embed/wkQ5QYJU0Lc?controls=1&modestbranding=1&rel=0&autoplay=0"
              title="અમર સંજીવની કંપની પરિચય"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </motion.div>

          <motion.div variants={slideUpVariants}>
            <h2 className="text-3xl font-bold text-green-950 mb-3">
              ફળદ્રુપ ખેતી તરફ એક ડગલું
            </h2>

            <p className="text-gray-700 text-xl mb-2 leading-relaxed">
              અમરસંજીવની (Amarsanjivani) એગ્રો પ્રોડક્ટસ જમીનને સંપૂર્ણ પોષણ
              પૂરું પાડવા માટે તૈયાર કરવામાં આવી છે. અમારી
              માઇક્રો-ન્યુટ્રિઅન્ટ્સનો ઉપયોગ કરવાથી જમીનમાં રહેલા તમામ ફૂગ દૂર
              થાય છે, જેથી પાક તંદુરસ્ત રહે છે અને રોગ આવતો નથી.
            </p>

            <p className="text-gray-700 text-xl mb-2 leading-relaxed">
              અમે ફક્ત પરંપરાગત ખાતર નથી વેચતા, પરંતુ પાક સંરક્ષણ અને ઉત્પાદન
              વધારવા માટે વૈજ્ઞાનિક ઉપાયો પ્રદાન કરીએ છીએ. અમારા ઉત્પાદનોથી
              ખેડૂતોને કપાસના જીવાત (ગુલાબી ઇયળ) માં રાહત મળે છે અને શેરડી,
              તેલીબિયાં, અનાજ જેવા પાકોમાં વજન, જાડાઈ, મીઠાશ અને ઉત્પાદનમાં
              નોંધપાત્ર વધારો જોવા મળે છે.
            </p>

            <p className="text-gray-700 text-xl leading-relaxed">
              અમારી શ્રેણીમાં N.P.K. ગ્રેડ, પોટેશિયમ હ્યુમેટ, બોરોન, સલ્ફર,
              ઝીંક, કેલ્શિયમ નાઈટ્રેટ, ફુલવિક એસિડ, હ્યુમિક એસિડ અને પાકની
              જરૂરિયાત મુજબના ચીલેટેડ મિક્સ માઈક્રોન્યુટ્રિઅન્ટ્સનો સમાવેશ થાય
              છે.
            </p>
          </motion.div>
        </motion.div>
        {/* Mission, Vision, Values Section - Staggered Scroll-In (Unchanged) */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Mission Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-8 text-center"
            variants={slideUpVariants}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-700 rounded-full mb-4">
              <Target className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              અમારું ધ્યેય
            </h3>

            <p className="text-gray-600 text-xl">
              ખેડૂતોને સાચા, ઉચ્ચ-ગુણવત્તાવાળા કૃષિ ઉત્પાદનો અને નિષ્ણાત
              માર્ગદર્શન સાથે સશક્ત બનાવવા, ટકાઉ ખેતી પદ્ધતિઓ અને સુધારેલ પાક
              ઉત્પાદકતાને સક્ષમ બનાવવું.
            </p>
          </motion.div>
          {/* Vision Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-8 text-center"
            variants={slideUpVariants}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-700 rounded-full mb-4">
              <Leaf className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              અમારી દ્રષ્ટિ
            </h3>

            <p className="text-gray-600 text-xl">
              ઉત્પાદનની પ્રામાણિકતા, ગ્રાહક સેવા અને ટકાઉ ખેતીમાં યોગદાન માટે
              જાણીતા, પ્રદેશમાં સૌથી વિશ્વસનીય કૃષિ ઇનપુટ પ્રદાતા બનવું.
            </p>
          </motion.div>
          {/* Values Card */}
          <motion.div
            className="bg-white rounded-lg shadow-md p-8 text-center"
            variants={slideUpVariants}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-700 rounded-full mb-4">
              <Users className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              અમારા મૂલ્યો
            </h3>

            <p className="text-gray-600 text-xl">
              અખંડિતતા, ગુણવત્તા, ગ્રાહક ધ્યાન અને ટકાઉ પદ્ધતિઓ અમારા દરેક
              કાર્યનું માર્ગદર્શન કરે છે. અમે વિશ્વાસ પર આધારિત લાંબા ગાળાના
              સંબંધો બનાવવામાં માનીએ છીએ.
            </p>
          </motion.div>
        </motion.div>
        {/* Why Choose Us Section - Special Fade/Scale Entrance (Updated Content)*/}{" "}
        <motion.div
          className="bg-gradient-to-br from-green-700 to-green-900 rounded-lg shadow-xl p-12 text-white mb-20"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Benefits List (Text Content) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <h2 className="text-3xl font-bold mb-6">
                અમરસંજીવની કેમ પસંદ કરવું?
              </h2>

              <ul className="space-y-4">
                {/* Benefits based on the brochure */}

                <motion.li
                  className="flex items-start"
                  variants={slideUpVariants}
                >
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />

                  <div>
                    <h4 className="font-semibold mb-1">
                      ઉત્પાદન અને ગુણવત્તામાં વધારો
                    </h4>

                    <p className="text-green-100">
                      કોઈપણ પાકમાં ૮ થી ૧૦ મહિનામાં નવો કલ્લો આવે અને અંતે
                      ઉત્પાદન અને ગુણવત્તામાં વધારો થાય.
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  className="flex items-start"
                  variants={slideUpVariants}
                >
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />

                  <div>
                    <h4 className="font-semibold mb-1">પાકને રોગમુક્ત રાખો</h4>

                    <p className="text-green-100">
                      પાકમાં ફૂગ અને રોગ આવતા નથી. હવામાનના કારણે જો કોઈ રોગ આવે
                      તો તેનું નિવારણ જલ્દી થઈ શકે છે.
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  className="flex items-start"
                  variants={slideUpVariants}
                >
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />

                  <div>
                    <h4 className="font-semibold mb-1">
                      ખારાશવાળી જમીન માટે રામબાણ
                    </h4>

                    <p className="text-green-100">
                      અમારું <q>સોઈલ કન્ડીશનર</q> ખારાશવાળી જમીન કે કડક જમીન માં
                      અનુકૂળ બનાવે છે અને મૂળ તત્વોને સક્રિય કરે છે.
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  className="flex items-start"
                  variants={slideUpVariants}
                >
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />

                  <div>
                    <h4 className="font-semibold mb-1">
                      જમીનનું પાણી શોષણ વધારવું
                    </h4>

                    <p className="text-green-100">
                      સૂકા ખેતરોમાં પણ પાકને પાણીની અછત વર્તાતી નથી. એક જ
                      વરસાદમાં પણ જમીનમાં ભેજ જળવાઈ રહે છે.
                    </p>
                  </div>
                </motion.li>
              </ul>
            </motion.div>
            {/* Why Choose Us Image */}
            <motion.div
              className="relative h-80 rounded-lg overflow-hidden shadow-2xl"
              variants={imageVariants}
            >
              <Image
                src="/image/about-fect.jpg"
                alt="ખેડૂત અમારા ઉત્પાદનોનો ઉપયોગ કરી રહ્યા છે"
                fill
                priority
                className="object-cover"
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
              />
            </motion.div>
          </div>
        </motion.div>
        {/* Our Commitment Section - Scroll-In Animation (Updated Content) */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className="relative h-96 rounded-lg overflow-hidden shadow-xl"
            variants={imageVariants}
          >
            <Image
              src="/image/soil.png"
              alt="અમારી પ્રતિબદ્ધતા"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              priority
            />
          </motion.div>

          <motion.div variants={slideUpVariants}>
            <h2 className="text-3xl font-bold text-green-950 mb-6">
              જમીન અને ખેડૂત પ્રત્યે અમારી પ્રતિબદ્ધતા
            </h2>

            <p className="text-gray-700 text-xl mb-2 leading-relaxed">
              અમે <b>ટકાઉ કૃષિ પદ્ધતિઓ</b> ને ટેકો આપવા માટે પ્રતિબદ્ધ છીએ.
              અમારી વિશેષતા માઇક્રો-ન્યુટ્રિઅન્ટ્સ અને સોઈલ કન્ડીશનર દ્વારા
              જમીનની મૂળ ફળદ્રુપતા (organic carbon) ને પુનર્જીવિત કરવાની છે, જે
              પાકની ઉપજને મહત્તમ કરતી વખતે જમીન અને પર્યાવરણનું રક્ષણ કરે છે.
            </p>

            <p className="text-gray-700 text-xl mb-6 leading-relaxed">
              ઉત્પાદનો પૂરા પાડવા ઉપરાંત, અમે ખેડૂતો માટે{" "}
              <b>સલાહકાર અને જ્ઞાન ભાગીદાર</b> બનવાનો પ્રયત્ન કરીએ છીએ. અમે
              યોગ્ય માત્રા, પાક વ્યવસ્થાપન અને જંતુ નિયંત્રણ વ્યૂહરચનાઓ પર સતત
              માર્ગદર્શન આપીએ છીએ. અમારી ગ્રાહક સપોર્ટ ટીમ કોઈપણ પ્રશ્નો અથવા
              ચિંતાઓ સાથે મદદ કરવા માટે હંમેશા તૈયાર છે.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              સંપર્કમાં રહો
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
