"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, } from "framer-motion";
import { getFeaturedProducts } from "@/lib/products";
import { ArrowRight, Leaf, Shield, Truck, Award } from "lucide-react";
import { useState, useEffect } from "react";
import FeaturedProducts from "@/components/sections/FeauredProducts";

// --- Slider Data - CUSTOMIZE YOUR CONTENT HERE ---
const slides = [
  {
    id: 1,
    title: "Premium Fertilizers & Pesticides for a Healthier Harvest",
    subtitle:
      "Quality agricultural products that help your crops thrive. Trusted by farmers across the region for superior results and reliable service.",
    image: "/image/header-1.jpeg",
  },
  {
    id: 2,
    title: "Expert Guidance & Authentic Products, Guaranteed",
    subtitle:
      "Every product is 100% genuine and comes with free agricultural support to ensure you get the maximum yield.",
    image: "/image/soil.png",
  },
  {
    id: 3,
    title: "Fast Delivery, Right to Your Farm Gate",
    subtitle:
      "Minimize downtime and keep your planting schedule on track with our reliable and quick dispatch service.",
    image: "/image/about-fect.jpg",
  },
];

// --- Animation Variants for content only ---
const contentVariants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as any,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

const imageVariants = {
  enter: {
    opacity: 0,
    scale: 1.1,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as any,
      stiffness: 100,
      damping: 10,
    },
  },
};


export default function Home() {
  const featuredProducts = getFeaturedProducts();

  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000); // Change content every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section - Content Changes with Animation */}
      <section
        className="relative bg-gradient-to-br from-green-700 to-green-900 text-white overflow-hidden"
        style={{ minHeight: "80vh" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content - Animates on change */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentIndex}`}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    {currentSlide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-green-100 mb-8">
                    {currentSlide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Buttons stay static */}
              <div className="flex flex-col sm:flex-row gap-4 mb-5">
                <Link
                  href="/products"
                  className="flex items-center justify-center bg-white text-green-700 px-8 py-3 rounded-lg hover:bg-green-100 transition-colors font-semibold"
                >
                  View Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center justify-center border-white border-2 text-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Image Display - Animates on change */}
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`image-${currentIndex}`}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Static Wave SVG */}
        <div className="absolute -bottom-1 left-0 right-0 z-20">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Specialisty Section */}
      <section className="py-16 bg-green-50 border-r-none border-l-none">
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
                title: "100% Genuine",
                description: "All products are authentic and certified",
              },
              {
                icon: Shield,
                title: "Safe & Effective",
                description: "Quality assured for best results",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Quick dispatch to your location",
              },
              {
                icon: Award,
                title: "Expert Support",
                description: "Agricultural guidance available",
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
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* About us */}
      <section
        className="py-16 bg-green-100 bg-contain bg-center p-8 rounded-lg"
        style={{ backgroundImage: "url('/background/aboutus.png')" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div
              className="relative h-96 rounded-lg overflow-hidden shadow-xl bg-white"
              variants={itemVariants}
            >
              <Image
                src="/Logo/logo.png"
                alt="About Amar Sanjeevani"
                fill
                className="object-contain"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Amar Sanjeevani
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We are dedicated to providing farmers with premium quality
                fertilizers and pesticides that enhance crop productivity and
                ensure sustainable agriculture. With years of experience in the
                agricultural sector, we understand the unique challenges faced
                by farmers.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our mission is to support farmers with genuine products, expert
                guidance, and reliable service. We carefully select and supply
                only certified products from trusted manufacturers, ensuring you
                get the best value for your investment.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-semibold"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
