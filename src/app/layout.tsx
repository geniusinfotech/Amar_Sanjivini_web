import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
// import { WhatsAppButton } from "../components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";
import { AnimationProvider } from "@/providers/animation-provider";
import ScrollToTop from "@/components/ScrollToTop";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // 1. PRIMARY SEO: TITLE (Max 60 characters for best display)
  title: "Amar Sanjeevani: Premium Fertilizers & Crop Care for High Yield",

  // 2. PRIMARY SEO: DESCRIPTION (Max 155-160 characters, must be compelling)
  description:
    "Trusted by farmers & gardeners. Shop superior fertilizers, organic pesticides, herbicides, and fungicides for optimal crop health and maximized yield.",

  // 3. KEYWORDS (While Google says it doesn't use this for ranking, others might, and it helps define the topic)
  keywords: [
    "fertilizers",
    "pesticides",
    "herbicides",
    "fungicides",
    "crop care",
    "organic farming",
    "gardening supplies",
    "high yield fertilizers",
    "farmer products",
    "Amar Sanjeevani",
    "Khatar",
  ],

  // 4. OPEN GRAPH (For social media, helps with rich previews on Facebook/LinkedIn)
  openGraph: {
    title: "Amar Sanjeevani: Premium Fertilizers & Crop Care for High Yield",
    description:
      "Trusted by farmers & gardeners. Shop superior fertilizers, organic pesticides, herbicides, and fungicides for optimal crop health and maximized yield.",
    url: "https://www.amarsanjeevani.com/", // Replace with your actual URL
    siteName: "Amar Sanjeevani - Agricultural Solutions",
    images: [
      {
        url: "og-image-amarsanjeevani.png", // Recommended size: 1200x630px
        width: 1200,
        height: 630,
        alt: "Amar Sanjeevani Premium Fertilizers and Crop Protection Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 5. TWITTER CARDS (For X/Twitter, also uses OG data if not specified)
  twitter: {
    card: "summary_large_image",
    title: "Amar Sanjeevani: Premium Fertilizers & Crop Care",
    description:
      "Trusted by farmers & gardeners. Shop superior fertilizers, organic pesticides, herbicides, and fungicides for optimal crop health and maximized yield.",
    creator: "@YourTwitterHandle", // Optional: Your company's Twitter handle
    images: ["og-image-amarsanjeevani.png"], // Must be an absolute path
  },

  // 6. VIEWPORT & ROBOTS (Crucial for modern web and indexing)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <AnimationProvider>
            <Navbar />
            <ScrollToTop />
            <main>{children}</main>
            <Footer />
            {/* <WhatsAppButton /> */}
          </AnimationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
