import { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Urea Fertilizer 46% N",
    price: "₹700 / 50kg bag",
    category: "Fertilizers",
    image: "/Product-image/product1.jpeg",
    description:
      "High-quality nitrogen fertilizer for fast crop growth and increased yield.",
    details:
      "Urea provides 46% nitrogen content, making it one of the most concentrated nitrogen fertilizers available. Suitable for all types of crops including cereals, vegetables, and fruits. Promotes healthy green foliage and vigorous plant growth.",
    usageInstructions:
      "Apply 50-100 kg per acre depending on soil fertility and crop requirements. Can be applied as basal dose or top dressing. Mix well with soil and irrigate immediately after application.",
    featured: true,
  },
  {
    id: "2",
    name: "Imidacloprid 17.8% SL",
    price: "₹1,200 / Litre",
    category: "Pesticides",
    image: "/Product-image/product1.jpeg",
    description:
      "Systemic insecticide effective against sucking pests in various crops.",
    details:
      "Imidacloprid is a neonicotinoid insecticide that provides excellent control of aphids, jassids, whiteflies, and thrips. It has systemic action and protects the entire plant. Long-lasting protection for up to 15-20 days.",
    usageInstructions:
      "Dilute 0.5-1 ml per liter of water. Apply as foliar spray during early morning or late evening. Repeat application after 15 days if required. Use protective gear during application.",
    featured: true,
  },
  {
    id: "3",
    name: "DAP (Di-Ammonium Phosphate)",
    price: "₹1,350 / 50kg bag",
    category: "Fertilizers",
    image: "/Product-image/product1.jpeg",
    description:
      "Phosphorus-rich fertilizer essential for root development and flowering.",
    details:
      "DAP contains 18% Nitrogen and 46% Phosphorus (P2O5). Ideal for basal application to promote strong root systems, early flowering, and fruit development. Suitable for all crops, especially effective for oilseeds, pulses, and vegetables.",
    usageInstructions:
      "Apply 100-150 kg per acre as basal dose before sowing or transplanting. Place fertilizer 2-3 inches away from seeds/seedlings to avoid burning. Incorporate into soil properly.",
    featured: true,
  },
  {
    id: "4",
    name: "Glyphosate 41% SL",
    price: "₹480 / Litre",
    category: "Herbicides",
    image: "/Product-image/product1.jpeg",
    description:
      "Non-selective herbicide for effective weed control in various situations.",
    details:
      "Glyphosate is a broad-spectrum, post-emergence herbicide that controls annual and perennial weeds. It works by inhibiting plant enzyme systems. Effective against grasses, broadleaf weeds, and sedges. Biodegradable with no soil residue.",
    usageInstructions:
      "Mix 2-3 liters per acre in 200 liters of water. Apply as directed spray on actively growing weeds. Avoid spray drift on crop plants. Effect visible within 7-10 days. Keep animals away from treated area.",
    featured: true,
  },
  {
    id: "5",
    name: "Mancozeb 75% WP",
    price: "₹320 / 500g",
    category: "Fungicides",
    image: "/Product-image/product1.jpeg",
    description:
      "Multi-site fungicide providing broad-spectrum disease control.",
    details:
      "Mancozeb is a contact fungicide effective against various fungal diseases including early blight, late blight, leaf spots, and downy mildew. Provides protective action and prevents spore germination. Suitable for vegetables, fruits, and plantation crops.",
    usageInstructions:
      "Mix 2-2.5 grams per liter of water. Spray thoroughly to cover all plant surfaces. First application at disease appearance or as preventive measure. Repeat every 7-10 days depending on disease pressure.",
    featured: true,
  },
  {
    id: "6",
    name: "NPK 19:19:19",
    price: "₹1,100 / 25kg bag",
    category: "Fertilizers",
    image: "/Product-image/product1.jpeg",
    description:
      "Balanced NPK fertilizer for complete plant nutrition at all growth stages.",
    details:
      "Complex fertilizer with equal proportions of Nitrogen, Phosphorus, and Potassium. Provides complete nutrition for vegetative growth, flowering, and fruiting. Water-soluble and suitable for drip irrigation and foliar application.",
    usageInstructions:
      "Soil application: 50-75 kg per acre. Foliar spray: 5 grams per liter. Fertigation: 5-10 kg per acre per week. Apply at critical growth stages for best results.",
    featured: true,
  },
  {
    id: "7",
    name: "Chlorpyrifos 20% EC",
    price: "₹650 / Litre",
    category: "Pesticides",
    image: "/Product-image/product1.jpeg",
    description:
      "Contact and stomach insecticide for control of soil and foliar pests.",
    details:
      "Broad-spectrum organophosphate insecticide effective against termites, stem borers, leaf folders, fruit borers, and root grubs. Has contact, stomach, and vapor action. Suitable for field crops, vegetables, and orchards.",
    usageInstructions:
      "Foliar spray: 2-2.5 ml per liter of water. Soil application: 4-5 liters per acre mixed with 200 kg FYM or sand. Apply during pest incidence or as preventive measure. Do not apply near water bodies.",
    featured: false,
  },
  {
    id: "8",
    name: "Potash (MOP) 60% K2O",
    price: "₹850 / 50kg bag",
    category: "Fertilizers",
    image: "/Product-image/product1.jpeg",
    description:
      "Potassium fertilizer essential for fruit quality and plant vigor.",
    details:
      "Muriate of Potash (MOP) contains 60% potassium oxide (K2O). Improves fruit quality, color, taste, and shelf life. Enhances disease resistance and drought tolerance. Important for potato, banana, tomato, and fruit crops.",
    usageInstructions:
      "Apply 40-60 kg per acre based on soil test recommendations. Best applied in 2-3 split doses during crop growth. Mix thoroughly with soil. Avoid chloride-sensitive crops or use SOP instead.",
    featured: false,
  },
  {
    id: "9",
    name: "2,4-D Amine Salt 58% SL",
    price: "₹380 / Litre",
    category: "Herbicides",
    image: "/Product-image/product1.jpeg",
    description:
      "Selective herbicide for broadleaf weed control in cereal crops.",
    details:
      "Systemic post-emergence herbicide effective against broadleaf weeds in wheat, rice, maize, and sugarcane. Acts as synthetic auxin causing abnormal growth in weeds. Does not harm grass crops when used properly.",
    usageInstructions:
      "Mix 800 ml to 1.25 liters per acre in 200-250 liters of water. Apply 25-35 days after sowing when weeds are in 2-4 leaf stage. Avoid application during windy conditions to prevent drift damage.",
    featured: false,
  },
  {
    id: "10",
    name: "Carbendazim 50% WP",
    price: "₹450 / 500g",
    category: "Fungicides",
    image: "/Product-image/product1.jpeg",
    description:
      "Systemic fungicide for seed treatment and foliar application.",
    details:
      "Broad-spectrum benzimidazole fungicide with protective and curative action. Controls various fungal diseases including powdery mildew, anthracnose, and leaf spots. Suitable for cereals, pulses, vegetables, and fruits.",
    usageInstructions:
      "Seed treatment: 2 grams per kg of seed. Foliar spray: 1 gram per liter of water. Soil drenching: 2 grams per liter around plant base. Apply at first sign of disease or as preventive measure.",
    featured: false,
  },
  {
    id: "11",
    name: "Zinc Sulphate 21%",
    price: "₹95 / Kg",
    category: "Fertilizers",
    image: "/Product-image/product1.jpeg",
    description:
      "Micronutrient fertilizer to correct zinc deficiency in crops.",
    details:
      "Contains 21% Zinc in sulphate form. Corrects zinc deficiency symptoms like white bud in maize, khaira disease in rice, and little leaf in citrus. Essential for enzyme activation and hormone production in plants.",
    usageInstructions:
      "Soil application: 10-25 kg per acre mixed with FYM. Foliar spray: 5 grams per liter of water, 2-3 sprays at 15-day intervals. Most effective when applied with lime to acidic soils.",
    featured: false,
  },
  {
    id: "12",
    name: "Profenofos 50% EC",
    price: "₹890 / Litre",
    category: "Pesticides",
    image: "/Product-image/product1.jpeg",
    description: "Broad-spectrum insecticide and acaricide for multiple crops.",
    details:
      "Organophosphate insecticide with contact and stomach action. Effective against bollworms, pod borers, fruit borers, mites, and leaf-eating caterpillars. Suitable for cotton, vegetables, pulses, and fruit crops.",
    usageInstructions:
      "Mix 2 ml per liter of water for foliar application. Spray at early pest incidence. Repeat after 10-15 days if necessary. Maintain 3-7 days pre-harvest interval depending on crop. Use protective equipment.",
    featured: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export const categories = [
  "All",
  "Fertilizers",
  "Pesticides",
  "Herbicides",
  "Fungicides",
];
