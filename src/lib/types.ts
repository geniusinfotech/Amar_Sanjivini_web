export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  details: string[];
  usageInstructions: string;
  featured: boolean;
}

export const WHATSAPP_NUMBER = "9193139 14181";

export function getWhatsAppLink(productName: string): string {
  const message = encodeURIComponent(
    `Hi, I'm interested in ${productName}. Please share details.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
