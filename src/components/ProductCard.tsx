import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const productId = product.id;
  const categoryLabel = product.category;
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.image}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-green-900">
      <div className="relative h-96 bg-gray-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          quality={100}
          priority
          unoptimized
          className="object-contain"
        />
        {categoryLabel && (
          <div className="absolute top-2 right-2">
            <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-full">
              {categoryLabel}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-green-700 font-bold text-xl mb-2">
          ₹ {product.price?.toLocaleString()}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {productId && (
          <Link
            href={`/products/${productId}`}
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium group"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
