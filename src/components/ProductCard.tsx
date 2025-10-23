import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${productId}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-green-900 flex flex-col h-full"
    >
      {/* Responsive Image Container: 
        Added 'aspect-square' and 'relative' for proper image sizing.
      */}
      <div className="relative w-full aspect-square bg-gray-100 p-4">
        <Image
          src={imageUrl}
          alt={product.name}
          // Changed to 'fill' to work with 'aspect-square' parent
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={100}
          priority
          unoptimized
          className="object-contain hover:scale-105 transition-all duration-500 p-8"
        />
        {categoryLabel && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-full shadow-md">
              {categoryLabel}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-green-700 font-bold text-xl mb-2">
          ₹ {product.price?.toLocaleString()}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {product.description}
        </p>

        {productId && (
          <Link
            href={`/products/${productId}`}
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium group mt-auto" // mt-auto pushes Link to the bottom
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
