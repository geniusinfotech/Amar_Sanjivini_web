"use client"; // Add this directive for Framer Motion

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import motion
import { Leaf, Users, Target, Award, ArrowRight } from 'lucide-react';

// --- Animation Variants ---

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
      ease: "easeOut" as any,
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
            ease: "easeOut" as any,
        },
    },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Immediate Entrance Animation */}
      <motion.div
        className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Amar Sanjivani</h1>
          <p className="text-lg text-green-100 max-w-2xl">
            Your trusted partner in sustainable agriculture and crop excellence
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
            <Image
              src="/image/worker.jpeg"
              alt="Amar Sanjivani facilities"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div variants={slideUpVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Amar Sanjivani is a leading supplier of premium agricultural inputs, specializing in high-quality fertilizers, pesticides, herbicides, and fungicides. With over a decade of experience in the agricultural sector, we have established ourselves as a trusted name among farmers and agricultural professionals.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our commitment to quality and customer satisfaction has helped thousands of farmers achieve better yields and healthier crops. We understand that agriculture is not just a profession but a way of life, and we are dedicated to supporting farmers at every step of their journey.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We work directly with certified manufacturers and conduct rigorous quality checks to ensure that every product we supply meets the highest standards of effectiveness and safety.
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
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To empower farmers with genuine, high-quality agricultural products and expert guidance, enabling sustainable farming practices and improved crop productivity.
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
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To be the most trusted agricultural input provider in the region, known for product authenticity, customer service, and contribution to sustainable agriculture.
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
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
            <p className="text-gray-600">
              Integrity, quality, customer focus, and sustainable practices guide everything we do. We believe in building long-term relationships based on trust.
            </p>
          </motion.div>
        </motion.div>

        {/* Why Choose Us Section - Special Fade/Scale Entrance */}
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
              <h2 className="text-3xl font-bold mb-6">Why Choose Amar Sanjivani?</h2>
              <ul className="space-y-4">
                {/* Apply slideUpVariants to each list item for a nice staggered effect */}
                <motion.li className="flex items-start" variants={slideUpVariants}>
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">100% Genuine Products</h4>
                    <p className="text-green-100">All products are sourced directly from certified manufacturers with proper documentation</p>
                  </div>
                </motion.li>
                <motion.li className="flex items-start" variants={slideUpVariants}>
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Expert Agricultural Guidance</h4>
                    <p className="text-green-100">Our team of agricultural experts provides personalized advice for your specific needs</p>
                  </div>
                </motion.li>
                <motion.li className="flex items-start" variants={slideUpVariants}>
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Competitive Pricing</h4>
                    <p className="text-green-100">Fair prices without compromising on quality, with regular offers and bulk discounts</p>
                  </div>
                </motion.li>
                <motion.li className="flex items-start" variants={slideUpVariants}>
                  <Award className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Fast & Reliable Delivery</h4>
                    <p className="text-green-100">Timely delivery to your location with proper handling and storage</p>
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
                alt="Farmer using our products"
                fill
                className="object-cover"
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
              alt="Our commitment"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div variants={slideUpVariants}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We are committed to supporting **sustainable agricultural practices** that protect the environment while maximizing crop yields. Our product selection emphasizes effectiveness, safety, and environmental responsibility.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Beyond supplying products, we strive to be a **knowledge partner** for farmers, offering guidance on proper usage, crop management, and pest control strategies. Our customer support team is always ready to assist with any questions or concerns.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}