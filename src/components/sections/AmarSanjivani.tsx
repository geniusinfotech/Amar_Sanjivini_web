"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Loader2, Zap, Leaf, Check, ShoppingCart } from "lucide-react";
import Link from "next/link";

// Assuming you have a similar Product interface defined elsewhere
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  image: string;
  isNewProduct: boolean;
  quantity: number;
  // Add other properties if needed
}

// Define the API endpoint and product ID
const AMAR_SANJIVNI_PRODUCT_ID = "68f72faa98f1099cef5dbec2";
// Define your video source (change this path to your actual video file)
const backgroundVideoSrc = "/videos/sanjivani-bg.mp4";
const backgroundVideoType = "video/mp4";

export function AmarSanjivniSection() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE;
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!apiBaseUrl) {
        setError("API Base URL is not configured.");
        setLoading(false);
        return;
      }

      try {
        const url = `${apiBaseUrl}/products/${AMAR_SANJIVNI_PRODUCT_ID}`;
        const response = await axios.get<Product>(url);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching Amar Sanjivni product:", err);
        setError("અમરસંજીવની પ્રોડક્ટ લોડ કરવામાં નિષ્ફળ."); // Failed to load Amar Sanjivni product.
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [apiBaseUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-green-700" />
        <p className="ml-3 text-gray-600">વિગતો લોડ કરી રહ્યાં છીએ...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-16 bg-red-50 border-t border-b border-red-200">
        <p className="text-red-800 font-semibold">
          {error || "અમરસંજીવની પ્રોડક્ટ ડેટા ઉપલબ્ધ નથી."}
        </p>
      </div>
    );
  }

  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${imageBaseUrl}/${product.image}`;

  const features = [
    "સંપૂર્ણ જમીન અને પાકને પોષણ આપનાર",
    "રોગપ્રતિકારક શક્તિ વધારનાર",
    "અમૃત, સંજીવની, ઓર્ગેનિક",
    "શક્તિવર્ધક, પૌષ્ટિક, સંતુલિત",
    "ગુણવત્તાસભર અને ઉત્તમ ઉત્પાદન આપનાર",
  ];

  const utilityPoints = [
    "તમામ પાકના મૂળને તંદુરસ્ત બનાવે છે",
    "જમીનને ફળદ્રુપ બનાવે છે",
    "વાતાવરણમાંથી નાઇટ્રોજન, ફોસ્ફરસ, પોટાશ, સલ્ફર અને અન્ય જરૂરી પોષક તત્ત્વો પૂરા પાડે છે",
    "પાકની રોગપ્રતિકારક શક્તિમાં વધારો કરે છે",
    "તમામ પ્રકારના પાક માટે યોગ્ય",
  ];

  return (
    <section className="relative py-10 md:py-10">
      {/* 1. Video Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          // preload="auto" is the key to ensure quick load and start
          preload="auto"
        >
          <source src={backgroundVideoSrc} type={backgroundVideoType} />
        </video>
        {/* Optional: Overlay for contrast and visual effect */}
        <div className="absolute inset-0  opacity-80"></div>
      </div>

      {/* 2. Content Layer: Ensure content is z-10 and relative */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-white mb-12 border-b-2 border-white/50 pb-4">
          અમારી ખાસ પ્રોડક્ટ: અમરસંજીવની <br className=" md:hidden" /> (Amar
          Sanjivni)
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
          {/* Column 1 & 2: Image and Left Details */}
          <div className="md:col-span-1 lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-6 md:p-10 rounded-2xl shadow-xl border-l-8 border-green-600">
              {/* Left Side: Product Image (1/3 of the inner grid) */}
              <div className="md:col-span-1 relative h-full  rounded-lg overflow-hidden shadow-lg w-full">
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={500}
                  height={600}
                  className="object-cover p-4 transition-transform duration-500 hover:scale-105"
                  priority
                  unoptimized
                />
              </div>

              {/* Right Side: Product Description & Features (2/3 of the inner grid) */}
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Leaf className="w-5 h-5 text-green-700" />
                  <span className="bg-green-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    100% ઓર્ગેનિક બાયો પ્રોડક્ટ
                  </span>
                </div>

                <h3 className="text-3xl font-bold text-green-800 mb-2">
                  {product.name} ({product.quantity.toLocaleString()})
                </h3>
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  દરેક પાકનો બેસ્ટ મિત્ર
                </p>

                <p className="text-gray-600 mb-4">
                  દરેક પ્રકારના શાકભાજી, અનાજ, કઠોળ, કંદમૂળ તેમજ ફળફૂલના ઉત્પાદન
                  માટે.
                </p>

                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-sm text-gray-700"
                    >
                      <Check className="w-4 h-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-gray-500 mt-4 italic">
                  A. Kumar & Co., અમર સંજીવની સ્ટોર્સ, ડીસા, પાટણ, હિંમતનગર,
                  મહેસાણા-ગુજરાત-ઉત્તરપ્રદેશ.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Utility Section */}
          <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-2xl shadow-xl border-t-8 border-yellow-500 h-full">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                અમરસંજીવનીની ઉપયોગિતા
              </h3>
            </div>

            <p className="text-gray-700 mb-6">
              અમરસંજીવની તમામ પાકના મૂળને તંદુરસ્ત બનાવે છે, જમીનને ફળદ્રુપ
              બનાવે છે તેમજ વાતાવરણમાંથી જરૂરી પોષક તત્ત્વો પૂરા પાડે છે.
            </p>

            <ul className="space-y-3">
              {utilityPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-yellow-600 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700 text-base">{point}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t pt-4">
              <p className="font-semibold text-green-800">
                અમરસંજીવનીની ભલામણ:
              </p>
              <p className="text-sm text-gray-600">
                પાકને તંદુરસ્ત અને ગુણવત્તાયુક્ત રાખવા માટે અમરસંજીવનીનો ઉપયોગ
                કરવો. (તમામ પાક માટે ઉપયોગી)
              </p>
              <Link
                href={`/products/${AMAR_SANJIVNI_PRODUCT_ID}`}
                className="text-center text-xl bg-green-900 text-white py-2 px-2 rounded-lg flex items-center justify-center gap-2 w-1/2 mt-3 mx-auto"
              >
                <ShoppingCart className="text-green-50" /> હમણાં જ ખરીદો
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
