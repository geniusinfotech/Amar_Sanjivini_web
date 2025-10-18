import { notFound } from "next/navigation";
import axios from "axios";
import { ProductDetails } from "./ProductDetails"; // Import the Client Component

// Use dynamic rendering since we're fetching from an API
export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ Await params before using
  const { id: productId } = await params;

  // Basic server-side validation
  if (!productId || productId.trim() === "") {
    notFound();
  }

  // Pass the productId to the Client Component
  return (
    <ProductDetails
      productId={productId}
      apiBaseUrl={process.env.NEXT_PUBLIC_API_BASE}
      imageBaseUrl={process.env.NEXT_PUBLIC_IMAGE_URL}
      whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}
    />
  );
}

// ✅ Updated generateMetadata using axios
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE}/products/${id}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    const product = response.data;

    return {
      title: `${product.name} - Amar Sanjivini`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: product.image.startsWith("http")
              ? product.image
              : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.image}`,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Product - Amar Sanjivini",
    };
  }
}
