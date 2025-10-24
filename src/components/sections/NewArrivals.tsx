"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { useAnimation } from "@/providers/animation-provider";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface NewArrivalsProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  categoryName: string;
  discountPrice?: number;
}

const fadeInFromBottom = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function NewArrivals() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const { enableAnimations } = useAnimation();

  const [newArrivalsProducts, setNewArrivalsProducts] = useState<
    NewArrivalsProduct[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get<NewArrivalsProduct[]>(
          `${process.env.NEXT_PUBLIC_API_BASE}/products/simple`
        );

        const filtered = res.data;
        setNewArrivalsProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Infinite scroll animation
  useEffect(() => {
    if (
      !enableAnimations ||
      !scrollRef.current ||
      newArrivalsProducts.length === 0 ||
      loading ||
      !inView
    ) {
      return;
    }

    const scrollContainer = scrollRef.current;
    let animationFrame: number;
    const scrollSpeed = 0.5; // Adjust speed here (pixels per frame)

    const animateScroll = () => {
      if (!scrollContainer) return;

      // Get the halfway point (where original content ends and duplicate begins)
      const maxScroll = scrollContainer.scrollWidth / 2;

      // Increment scroll position
      scrollContainer.scrollLeft += scrollSpeed;

      // Reset to start when we reach the halfway point for seamless loop
      if (scrollContainer.scrollLeft >= maxScroll) {
        scrollContainer.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(animateScroll);
    };

    animationFrame = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, enableAnimations, loading, newArrivalsProducts.length]);

  const handleClickProduct = (id: string) => {
    router.push(`/products/${id}`);
  };

  // Duplicate products array for seamless infinite scroll
  const duplicatedProducts = [...newArrivalsProducts, ...newArrivalsProducts];

  return (
    <section ref={ref} className="py-5 lg:py-16">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInFromBottom}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-4">
          બધા પ્રોડક્ટ્સ
        </h2>
      </motion.div>

      <div className="mx-auto w-full">
        {loading ? (
          <div className="text-center text-lg text-muted-foreground">
            Loading new products...
          </div>
        ) : newArrivalsProducts.length > 0 ? (
          <>
            {/* Scrollable products row */}
            <motion.div
              ref={scrollRef}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex overflow-x-scroll pb-10 space-x-6 scrollbar-hide lg:overflow-x-hidden cursor-grab"
              style={{ scrollBehavior: "auto" }}
            >
              {duplicatedProducts.map((product, index) => (
                <motion.div
                  key={`${product._id}-${index}`}
                  className="group flex-shrink-0 w-64 sm:w-72 lg:w-80"
                  variants={{
                    hidden: enableAnimations ? { opacity: 0, y: 50 } : {},
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" },
                    },
                  }}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <div
                    className="card group overflow-hidden bg-card rounded-2xl shadow-green-900 hover:shadow-lg transition-shadow duration-300 border border-green-950 flex flex-col h-full"
                    onClick={() => handleClickProduct(product._id)}
                  >
                    <div className="relative w-full py-2 overflow-hidden h-40 flex items-center justify-center bg-gray-50">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE}/uploads/${product.image}`}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        quality={100}
                        priority
                        unoptimized
                      />
                    </div>

                    <div className="p-4 bg-white flex flex-col flex-grow">
                      <p className="text-xs text-green-900 uppercase tracking-wider mb-1">
                        {product.categoryName}
                      </p>
                      <h4 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 text-base flex-grow">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold text-primary">
                          ₹ {product.price}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-muted-foreground ml-1">
                            (4.9)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <div className="text-center text-lg text-muted-foreground">
            No new products are currently available.
          </div>
        )}
      </div>
    </section>
  );
}
