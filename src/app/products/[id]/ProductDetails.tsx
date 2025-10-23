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
      type: "spring" as const,
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
  const [, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  // Image Gallery State
  const [selectedImage, setSelectedImage] = useState<string>("");

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

        // Fetch all products and show 3 random ones
        if (apiBaseUrl) {
          try {
            const allProductsResponse = await axios.get(
              `${apiBaseUrl}/products/simple`
            );
            const allProducts = (allProductsResponse.data || []).filter(
              (p: Product) => p._id !== productId
            );

            // Shuffle array and take first 3
            const shuffled = allProducts.sort(() => 0.5 - Math.random());
            const random = shuffled.slice(0, 3);

            setRelatedProducts(random);
          } catch (err) {
            console.error("Error fetching related products:", err);
            setRelatedProducts([]);
          }
        }
      } catch (err: any) {
        console.error("Error fetching product:", err);
        // Translation for error message
        setError(
          err.response?.data?.message || "ઉત્પાદનની વિગતો લોડ કરવામાં નિષ્ફળ" // Failed to load product details
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId, apiBaseUrl]);

  // Set selected image when product loads
  useEffect(() => {
    if (product) {
      const productImageUrl = product.image.startsWith("http")
        ? product.image
        : `${imageBaseUrl}/${product.image}`;
      setSelectedImage(productImageUrl);
    }
  }, [product, imageBaseUrl]);

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
          <p className="text-gray-600">ઉત્પાદનની વિગતો લોડ થઈ રહી છે...</p>
          {/* Loading product details... */}
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
              ઉત્પાદન લોડ કરવામાં નિષ્ફળતા
            </p>
            {/* Failed to load product */}
            <p className="text-red-600 text-sm mb-4">
              {error || "ઉત્પાદન મળ્યું નથી"} {/* Product not found */}
            </p>
            <Link
              href="/products"
              className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              ઉત્પાદનો પર પાછા ફરો {/* Back to Products */}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${imageBaseUrl}/${product.image}`;

  // Common image URL (same for all products)
  const commonImageUrl = `/image/producatuse.jpg`;

  // Message in Gujarati: "Hi, I'm interested in [Product Name] - ₹ [Product Price]"
  const whatsappMessage = `નમસ્કાર, હું ${
    product.name
  } - ₹ ${product.price.toLocaleString("en-IN")} માં રસ ધરાવું છું.`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <div className="border-b sticky top-0 z-10 bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/products"
            className="inline-flex items-center text-green-50 hover:text-green-100 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            ઉત્પાદનો પર પાછા ફરો {/* Back to Products */}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <div>
            <motion.div
              className="relative pt-[100%] bg-gray-100 shadow-inner rounded-xl overflow-hidden cursor-zoom-in group mb-4 border-2 border-green-100"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial="hidden"
              animate="visible"
              variants={imageContainerVariants}
            >
              <Image
                src={selectedImage}
                alt={product.name}
                quality={100}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-transform duration-100 ease-out p-8"
                style={zoomStyle}
                priority
                unoptimized
              />
            </motion.div>

            <div className="flex gap-4">
              {/* Product Image Thumbnail */}
              <button
                onClick={() => setSelectedImage(imageUrl)}
                className={`relative h-24 w-24 bg-white rounded-lg overflow-hidden shadow transition-all hover:shadow-lg ${
                  selectedImage === imageUrl
                    ? "border-2 border-green-700 ring-2 ring-green-300"
                    : "border-2 border-gray-200 hover:border-green-400"
                }`}
              >
                <Image
                  src={imageUrl}
                  alt={product.name}
                  quality={100}
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                  unoptimized
                />
              </button>

              {/* Common Image Thumbnail */}
              <button
                onClick={() => setSelectedImage(commonImageUrl)}
                className={`relative h-24 w-24 bg-white rounded-lg overflow-hidden shadow transition-all hover:shadow-lg ${
                  selectedImage === commonImageUrl
                    ? "border-2 border-green-700 ring-2 ring-green-300"
                    : "border-2 border-gray-200 hover:border-green-400"
                }`}
              >
                <Image
                  src={commonImageUrl}
                  alt="Common Product Image" // અનુવાદ: સામાન્ય ઉત્પાદન છબી
                  quality={100}
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                  unoptimized
                />
              </button>
            </div>
          </div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "tween", duration: 0.5, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2">
              <div className="bg-green-800 text-green-100 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                {product.categoryName}
              </div>
              {/* {product.isNewProduct && (
                <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  નવું 
                </div>
              )} */}
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

            {/* Benefits Section */}
            <div className="my-5 bg-green-50 border border-green-600 rounded-2xl">
              {product.Benefits && product.Benefits.length > 0 && (
                <motion.div
                  className="p-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Info className="h-7 w-7 text-green-700" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      મુખ્ય લાભો {/* Key Benefits */}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.Benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">
                          {benefit}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <Package className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    ગુણવત્તાની ખાતરી {/* Quality Assured */}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    ૧૦૦% અસલ, પ્રમાણિત અને ગુણવત્તા-તપાસેલ.
                    {/* 100% authentic, certified, and quality-checked. */}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <MessageCircle className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    નિષ્ણાત માર્ગદર્શન {/* Expert Guidance */}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    દરેક ખરીદી સાથે મફત કૃષિ સહાય અને ઉપયોગ માટેની સલાહ.
                    {/* Free agricultural support and usage advice with every purchase. */}
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
                    એપ્લિકેશન અને ઉપયોગ {/* Application & Usage */}
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

            {/* Whatsapp Order */}
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
                સીધો ઓર્ડર કરો {/* Order Directly */}
              </h3>
              <p className="text-gray-600 mb-4">
                ત્વરિત ઓર્ડર કરવા અને વ્યક્તિગત માર્ગદર્શન માટે નિષ્ણાત સાથે
                જોડાવા માટે ટેપ કરો.
                {/* Tap to order instantly and connect with an expert for personalized guidance. */}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                WhatsApp દ્વારા ઓર્ડર કરો {/* Order via WhatsApp */}
              </a>
            </motion.div>
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
                  વિશિષ્ટતાઓ {/* Specifications */}
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
              અન્ય ઉત્પાદનો {/* Other Products */}
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
