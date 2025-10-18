export interface Product {
  id: string;
  name: string;
  price: string;
  category: "Fertilizers" | "Pesticides" | "Herbicides" | "Fungicides";
  image: string;
  description: string;
  details: string[];
  usageInstructions: string;
  featured: boolean;
}

export const WHATSAPP_NUMBER = "919013914181";

export function getWhatsAppLink(productName: string): string {
  const message = encodeURIComponent(
    `Hi, I'm interested in ${productName}. Please share details.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
