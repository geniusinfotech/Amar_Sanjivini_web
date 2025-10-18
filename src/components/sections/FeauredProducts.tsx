"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import ProductCard from "@/components/card/ProductCard"; // Adjust the import path as needed

// Animation variants
const fadeInFromBottom = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

interface Product {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  categoryId: string;
  image: string;
  isNewProduct: boolean;
  special?: string;
  Specifications?: string;
  Uses?: string[];
  Benefits?: string[];
  quantity?: string;
}

interface FeaturedProductsProps {
  apiBaseUrl?: string;
}

export default function FeaturedProducts({
  apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE,
}: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${apiBaseUrl}/products/simple`);

      // Get the latest 6 products (assuming they're sorted by creation date)
      const latestProducts = response.data.slice(0, 6);

      // Normalize the data to ensure consistent id field
      const normalizedProducts = latestProducts.map((product: Product) => ({
        ...product,
        id: product._id || product.id,
      }));

      setProducts(normalizedProducts);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [apiBaseUrl]);

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-green-700 mx-auto mb-4" />
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-800 font-semibold mb-2">
                  Unable to load products
                </p>
                <p className="text-red-600 text-sm mb-4">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our best-selling fertilizers and pesticides trusted by
              farmers for superior crop health and yield
            </p>
          </div>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                No products available at the moment
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Check back soon for new arrivals!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Success state with products
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInFromBottom}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our best-selling fertilizers and pesticides trusted by
            farmers for superior crop health and yield
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInFromBottom}
        >
          <Link
            href="/products"
            className="inline-flex items-center bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
