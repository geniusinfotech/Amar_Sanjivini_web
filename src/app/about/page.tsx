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
            અમર સંજીવની વિશે
          </h1>

          <p className="text-lg text-green-100 max-w-2xl">
            ટકાઉ ખેતી અને પાકની શ્રેષ્ઠતામાં તમારા વિશ્વસનીય ભાગીદાર
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Who We Are Section - Scroll-In Animation */}
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
              અમે કોણ છીએ
            </h2>

            <p className="text-gray-700 text-xl mb-2 leading-relaxed">
              અમર સંજીવની પ્રીમિયમ કૃષિ ઇનપુટ્સનું અગ્રણી સપ્લાયર છે, જે
              ઉચ્ચ-ગુણવત્તાવાળા ખાતરો, જંતુનાશકો, નીંદણનાશકો અને ફૂગનાશકોમાં
              વિશેષતા ધરાવે છે. કૃષિ ક્ષેત્રે એક દાયકાથી વધુના અનુભવ સાથે, અમે
              ખેડૂતો અને કૃષિ વ્યવસાયિકોમાં એક વિશ્વસનીય નામ તરીકે સ્થાપિત થયા
              છીએ.
            </p>

            <p className="text-gray-700 text-xl mb-2 leading-relaxed">
              ગુણવત્તા અને ગ્રાહક સંતોષ પ્રત્યેની અમારી પ્રતિબદ્ધતાએ હજારો
              ખેડૂતોને બહેતર ઉપજ અને તંદુરસ્ત પાક મેળવવામાં મદદ કરી છે. અમે
              સમજીએ છીએ કે ખેતી માત્ર એક વ્યવસાય નથી પણ જીવનની એક રીત છે, અને
              અમે તેમની મુસાફરીના દરેક પગલે ખેડૂતોને ટેકો આપવા માટે સમર્પિત છીએ.
            </p>

            <p className="text-gray-700 text-xl leading-relaxed">
              અમે સીધા પ્રમાણિત ઉત્પાદકો સાથે કામ કરીએ છીએ અને અમે સપ્લાય કરીએ
              છીએ તે દરેક ઉત્પાદન અસરકારકતા અને સલામતીના ઉચ્ચતમ ધોરણોને પૂર્ણ
              કરે છે તેની ખાતરી કરવા માટે કડક ગુણવત્તા તપાસણી કરીએ છીએ.
            </p>
          </motion.div>
        </motion.div>
        {/* Mission, Vision, Values Section - Staggered Scroll-In */}
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
        {/* Why Choose Us Section - Special Fade/Scale Entrance */}{" "}
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
                અમર સંજીવની કેમ પસંદ કરવું?
              </h2>

              <ul className="space-y-4">
                {/* Apply slideUpVariants to each list item for a nice staggered effect */}

                <motion.li
                  className="flex items-start"
                  variants={slideUpVariants}
                >
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />

                  <div>
                    <h4 className="font-semibold mb-1">૧૦૦% અસલી ઉત્પાદનો </h4>

                    <p className="text-green-100">
                      તમામ ઉત્પાદનો યોગ્ય દસ્તાવેજો સાથે પ્રમાણિત ઉત્પાદકો
                      પાસેથી સીધા મેળવવામાં આવે છે
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
                      નિષ્ણાત કૃષિ માર્ગદર્શન
                    </h4>

                    <p className="text-green-100">
                      કૃષિ નિષ્ણાતોની અમારી ટીમ તમારી ચોક્કસ જરૂરિયાતો માટે
                      વ્યક્તિગત સલાહ આપે છે
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  className="flex items-start"
                  variants={slideUpVariants}
                >
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />

                  <div>
                    <h4 className="font-semibold mb-1">સ્પર્ધાત્મક ભાવો</h4>

                    <p className="text-green-100">
                      ગુણવત્તા સાથે સમાધાન કર્યા વિના વાજબી ભાવો, નિયમિત ઑફર્સ
                      અને જથ્થાબંધ ડિસ્કાઉન્ટ સાથે
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
                      ઝડપી અને વિશ્વસનીય ડિલિવરી
                    </h4>

                    <p className="text-green-100">
                      યોગ્ય હેન્ડલિંગ અને સ્ટોરેજ સાથે તમારા સ્થાન પર સમયસર
                      ડિલિવરી
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
        {/* Our Commitment Section - Scroll-In Animation */}
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
              અમારી પ્રતિબદ્ધતા
            </h2>

            <p className="text-gray-700 text-xl mb-2 leading-relaxed">
              અમે <b>ટકાઉ કૃષિ પદ્ધતિઓ</b> ને ટેકો આપવા માટે પ્રતિબદ્ધ છીએ જે
              પાકની ઉપજને મહત્તમ કરતી વખતે પર્યાવરણનું રક્ષણ કરે છે. અમારી
              ઉત્પાદન પસંદગી અસરકારકતા, સલામતી અને પર્યાવરણીય જવાબદારી પર ભાર
              મૂકે છે.
            </p>

            <p className="text-gray-700 text-xl mb-6 leading-relaxed">
              ઉત્પાદનો પૂરા પાડવા ઉપરાંત, અમે ખેડૂતો માટે <b>જ્ઞાન ભાગીદાર </b>
              બનવાનો પ્રયત્ન કરીએ છીએ, યોગ્ય ઉપયોગ, પાક વ્યવસ્થાપન અને જંતુ
              નિયંત્રણ વ્યૂહરચનાઓ પર માર્ગદર્શન આપીએ છીએ. અમારી ગ્રાહક સપોર્ટ
              ટીમ કોઈપણ પ્રશ્નો અથવા ચિંતાઓ સાથે મદદ કરવા માટે હંમેશા તૈયાર છે.
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
