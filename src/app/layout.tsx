import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
// import { WhatsAppButton } from "../components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";
import { AnimationProvider } from "@/providers/animation-provider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amar Sanjeevani - Premium Fertilizers & Pesticides",
  description:
    "Quality agricultural products including fertilizers, pesticides, herbicides, and fungicides. Trusted by farmers for superior crop health and yield.",
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
            <main>{children}</main>
            <Footer />
            {/* <WhatsAppButton /> */}
          </AnimationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
