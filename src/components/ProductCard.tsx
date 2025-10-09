import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/src/lib/types';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-green-700 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-green-700 font-bold text-xl mb-2">
          {product.price}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center text-green-700 hover:text-green-800 font-medium group"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
