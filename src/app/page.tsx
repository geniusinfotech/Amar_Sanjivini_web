"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Shield, Truck, Award } from "lucide-react";
import { useState, useEffect } from "react";
import FeaturedProducts from "@/components/sections/FeauredProducts";
import { NewArrivals } from "@/components/sections/NewArrivals";
import Image from "next/image";
import InfiniteShortsSlider from "@/components/sections/InfiniteShortsSlider";

// --- Slider Data ---
const desktopSlides = [
  { id: 1, image: "/background/b-1.png" },
  { id: 2, image: "/background/b-2.png" },
  { id: 3, image: "/background/b-3.png" },
];

const mobileSlides = [
  { id: 1, image: "/background/m-b-1.png" },
  { id: 2, image: "/background/m-b-2.png" },
  { id: 3, image: "/background/m-b-3.png" },
];

// --- Animation Variants ---
const imageVariants = {
  enter: { opacity: 0, scale: 1.1 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

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

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState(desktopSlides);

  // Detect mobile vs desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlides(mobileSlides);
      } else {
        setSlides(desktopSlides);
      }
    };

    handleResize(); // Set initial slides
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentSlide = slides[currentIndex];

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides]);

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div>
      <section className="relative text-white overflow-hidden max-sm:h-[50vh] h-[80vh] bg-green-50">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide.id}
            className="absolute inset-0 z-0"
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <Image
              src={currentSlide.image}
              alt="slider image"
              fill
              priority={currentSlide.id === 1}
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white ring-2 ring-green-400"
                  : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Rest of your content */}
      <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-200">
        <FeaturedProducts />
        <InfiniteShortsSlider />
        <NewArrivals />
        <section className="py-16">
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
                  className="text-center"
                  variants={itemVariants}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-700 rounded-full mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
