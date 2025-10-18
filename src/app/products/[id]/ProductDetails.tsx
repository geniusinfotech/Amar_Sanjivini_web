"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import {
  MessageCircle,
  ArrowLeft,
  Package,
  Info,
  FileText,
  Check,
  Loader2,
} from "lucide-react";
import axios from "axios";

interface Product {
  _id: string;
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

interface ProductDetailsProps {
  productId: string;
  apiBaseUrl?: string;
  imageBaseUrl?: string;
  whatsappNumber?: string;
}

const imageContainerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as any,
      stiffness: 100,
      damping: 10,
      delay: 0.1,
    },
  },
};

export function ProductDetails({
  productId,
  apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE,
  imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL,
  whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
}: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Zoom State
  const [_isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch product details
        const response = await axios.get(`${apiBaseUrl}/products/${productId}`);
        const productData = response.data;

        // Parse Uses and Benefits if they're stringified arrays
        if (productData.Uses && Array.isArray(productData.Uses)) {
          productData.Uses = productData.Uses.flatMap((use: string) => {
            try {
              return JSON.parse(use);
            } catch {
              return use;
            }
          });
        }

        if (productData.Benefits && Array.isArray(productData.Benefits)) {
          productData.Benefits = productData.Benefits.flatMap(
            (benefit: string) => {
              try {
                return JSON.parse(benefit);
              } catch {
                return benefit;
              }
            }
          );
        }

        setProduct(productData);

        // Fetch related products from same category using category name endpoint
        if (productData.categoryName && apiBaseUrl) {
          try {
            const relatedResponse = await axios.get(
              `${apiBaseUrl}/products/category/name/${encodeURIComponent(
                productData.categoryName
              )}`
            );
            const related = (relatedResponse.data || [])
              .filter((p: Product) => p._id !== productId)
              .slice(0, 3);
            setRelatedProducts(related);
          } catch (err) {
            console.error("Error fetching related products:", err);
            setRelatedProducts([]);
          }
        }
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(
          err.response?.data?.message || "Failed to load product details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId, apiBaseUrl]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomStyle({});
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-700 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800 font-semibold mb-2">
              Failed to load product
            </p>
            <p className="text-red-600 text-sm mb-4">
              {error || "Product not found"}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${imageBaseUrl}/${product.image}`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${encodeURIComponent(
    product.name
  )} - ₹ ${product.price}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
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
          {/* Image Section */}
          <div>
            <motion.div
              className="relative pt-[100%] bg-[#f9f9f9] rounded-xl overflow-hidden shadow-2xl cursor-zoom-in group mb-4"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial="hidden"
              animate="visible"
              variants={imageContainerVariants}
            >
              <Image
                src={imageUrl}
                alt={product.name}
                quality={100}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-transform duration-100 ease-out"
                style={zoomStyle}
                priority
                unoptimized
              />
            </motion.div>

            <div className="flex gap-4">
              <div className="relative h-24 w-24 bg-white rounded-lg overflow-hidden shadow border-2 border-green-700 p-1">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  quality={100}
                  fill
                  sizes="96px"
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "tween", duration: 0.5, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2">
              <div className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {product.categoryName}
              </div>
              {product.isNewProduct && (
                <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  NEW
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <p className="text-4xl font-bold text-green-700">
                ₹ {product.price.toLocaleString("en-IN")}
              </p>
              {product.quantity && (
                <span className="text-gray-600 text-lg">
                  / {product.quantity}
                </span>
              )}
            </div>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {product.special && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-blue-900 font-medium">{product.special}</p>
              </div>
            )}

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

        {/* Specifications Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-16 mt-16 border-t-4 border-green-600">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Uses Section */}
            {product.Uses && product.Uses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <FileText className="h-7 w-7 text-green-700" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Application & Usage
                  </h2>
                </div>
                <ul className="space-y-3">
                  {product.Uses.map((use, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{use}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Benefits Section */}
            {product.Benefits && product.Benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Info className="h-7 w-7 text-green-700" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Key Benefits
                  </h2>
                </div>
                <ul className="space-y-3">
                  {product.Benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Specifications if exists */}
          {product.Specifications && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 pt-8 border-t"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Info className="h-7 w-7 text-green-700" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Specifications
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {product.Specifications}
              </p>
            </motion.div>
          )}
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProducts, index) => (
                <motion.div
                  key={relatedProducts._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={{
                      id: relatedProducts._id,
                      name: relatedProducts.name,
                      description: relatedProducts.description,
                      price: relatedProducts.price.toString(),
                      category: relatedProducts.categoryName,
                      details: [relatedProducts.description],
                      usageInstructions: (relatedProducts.Uses || []).join(
                        ", "
                      ),
                      featured: relatedProducts.isNewProduct,
                      image: relatedProducts.image,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
