"use client"; // This must be at the top of the new file

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// Import motion from 'framer-motion'
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import {
  MessageCircle,
  ArrowLeft,
  Package,
  Info,
  FileText,
} from "lucide-react";

// Define the Product type based on your data structure
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  details: string;
  usageInstructions: string;
}

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
  whatsappLink: string;
}

// Define the animation variants for the main image container
const imageContainerVariants = {
  // Initial state, slightly scaled down and less opaque
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  // Animated state, scaled up, full opacity, and reset y position
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring", // Use a spring physics animation
      stiffness: 100, // Control the stiffness/bounciness
      damping: 10,
      delay: 0.1, // Add a small delay after load
    },
  },
};

export function ProductDetails({
  product,
  relatedProducts,
  whatsappLink,
}: ProductDetailsProps) {
  // --- Zoom State and Logic (All client-side logic stays here) ---
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  // ... (Your existing handleMouseMove, handleMouseEnter, handleMouseLeave functions)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // ... (zoom logic here)
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;
    const scale = 2;
    const translateX = -(xPercent * scale - xPercent);
    const translateY = -(yPercent * scale - yPercent);

    setZoomStyle({
      transform: `scale(${scale}) translate(${translateX / scale}%, ${
        translateY / scale
      }%)`,
      transformOrigin: "top left",
    });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomStyle({});
  };
  // ----------------------------

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        {" "}
        {/* Made sticky for better navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/products"
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* First Column: Image/Gallery - CHANGED TO MOTION COMPONENT */}
          <div>
            {/* Main Image Container with fixed aspect ratio and ZOOM logic */}
            <motion.div // Use motion.div instead of div for animation
              className="relative pt-[100%] bg-white rounded-xl overflow-hidden shadow-2xl cursor-zoom-in group mb-4"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              // Framer Motion Props
              initial="hidden"
              animate="visible"
              variants={imageContainerVariants}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw" // Optimize image loading
                className="object-contain transition-transform duration-100 ease-out"
                style={zoomStyle} // Apply dynamic zoom style
                priority
              />
            </motion.div>

            {/* Simple Gallery Preview - (Consider making this interactive with state for a full solution) */}
            {/* You could also wrap this in motion.div for animation */}
            <div className="flex gap-4">
              <div className="relative h-24 w-24 bg-white rounded-lg overflow-hidden shadow border-2 border-green-700 p-1">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
              {/* Add more thumbnails here if available */}
            </div>
          </div>

          {/* Second Column: Details/CTA */}
          {/* Wrap details in a motion.div for staggered animation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "tween", duration: 0.5, delay: 0.3 }}
          >
            <div className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {product.category}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {product.name}
            </h1>

            <p className="text-4xl font-bold text-green-700 mb-6">
              {product.price}
            </p>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed border-b pb-8">
              {product.description}
            </p>

            {/* CTA/Order Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 12,
                delay: 0.5,
              }}
              className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 shadow-inner"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Order Directly
              </h3>
              <p className="text-gray-600 mb-4">
                Tap to order instantly and connect with an expert for
                personalized guidance.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Order via WhatsApp
              </a>
            </motion.div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Package className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Quality Assured
                  </h4>
                  <p className="text-gray-600 text-sm">
                    100% authentic, certified, and quality-checked.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <MessageCircle className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Expert Guidance
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Free agricultural support and usage advice with every
                    purchase.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Specifications Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-16 mt-16 border-t-4 border-green-600">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Info className="h-7 w-7 text-green-700" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Detailed Specifications
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{product.details}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-7 w-7 text-green-700" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Application & Usage
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {product.usageInstructions}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger related products
                >
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
