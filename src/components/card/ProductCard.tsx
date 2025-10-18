"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Package } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
  imageBaseUrl?: string;
}

export default function ProductCard({
  product,
  imageBaseUrl = process.env.NEXT_PUBLIC_API_BASE,
}: ProductCardProps) {
  const productId = product._id || product.id;
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${imageBaseUrl}/uploads/${product.image}`;

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          quality={100}
          priority
          unoptimized
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* New Product Badge */}
        {product.isNewProduct && (
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            NEW
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-md">
          {product.categoryName}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Quantity */}
        {product.quantity && (
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <Package className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium">{product.quantity}</span>
          </div>
        )}

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div>
            <p className="text-2xl font-bold text-green-700">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-500">Inclusive of all taxes</p>
          </div>

          <Link
            href={`/products/${productId}`}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
