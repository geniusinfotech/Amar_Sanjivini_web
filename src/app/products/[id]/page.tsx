// NO 'use client' directive here!

import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import { getWhatsAppLink } from "@/lib/types";
// import { ProductCard } from "@/components/ProductCard"; // Still needed if ProductDetails uses it
import { ProductDetails } from "./ProductDetails"; // Import the new Client Component

interface ProductPageProps {
  params: {
    id: string;
  };
}

// 1. generateStaticParams and dynamic MUST stay in the Server Component file
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export const dynamic = "force-static";

// 2. This remains an async Server Component to fetch the data
export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  // Data preparation (also happens on the server)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const whatsappLink = getWhatsAppLink(product.name);

  // 3. Render the Client Component and pass the fetched data as props
  return (
    <ProductDetails
      product={product}
      relatedProducts={relatedProducts}
      whatsappLink={whatsappLink}
    />
  );
}
