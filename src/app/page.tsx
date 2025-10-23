"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Shield, Truck, Award } from "lucide-react";
import FeaturedProducts from "@/components/sections/FeauredProducts";
import { NewArrivals } from "@/components/sections/NewArrivals";
import InfiniteShortsSlider from "@/components/sections/InfiniteShortsSlider";
import { HeroSection } from "@/components/sections/HeroSection";
import { useState, useEffect } from "react";
import UniverseLoader from "@/components/Loader/Loader";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 10 },
  },
};

// 🌀 Simple Loader Component
function Loader() {
  return <UniverseLoader />;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for 1.5s (or until data fetch)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  <AnimatePresence mode="wait">
    {isLoading ? (
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <Loader />
      </motion.div>
    ) : (
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* your main homepage JSX here */}
      </motion.div>
    )}
  </AnimatePresence>;

  return (
    <div>
      <HeroSection />

      <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 pb-10 pt-5 md:pt-10">
        <FeaturedProducts />
        <InfiniteShortsSlider />
        <NewArrivals />

        <section className="py-16 bg-white bg-contain bg-left-bottom bg-[url('/background/home-sec.png')] md:bg-repeat bg-no-repeat">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              {[
                {
                  icon: Leaf,
                  title: "100% અસલી",
                  description: "બધા ઉત્પાદનો અધિકૃત અને પ્રમાણિત છે",
                },
                {
                  icon: Shield,
                  title: "સલામત અને અસરકારક",
                  description: "શ્રેષ્ઠ પરિણામો માટે ગુણવત્તાની ખાતરી",
                },
                {
                  icon: Truck,
                  title: "ઝડપી ડિલિવરી",
                  description: "તમારા સ્થાન પર ઝડપી ડિલિવરી",
                },
                {
                  icon: Award,
                  title: "નિષ્ણાત સપોર્ટ",
                  description: "કૃષિ માર્ગદર્શન ઉપલબ્ધ",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group text-center p-6 rounded-lg hover:bg-green-800 hover:text-white transition-all duration-300 ease-in-out"
                  variants={itemVariants}
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-700 rounded-full mb-4
                    group-hover:bg-white group-hover:text-green-800 transition duration-300"
                  >
                    <feature.icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 group-hover:text-green-50 transition-colors duration-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
