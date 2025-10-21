"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { useAnimation } from "@/providers/animation-provider";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Product interface matching your API
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

  // Direction ref to avoid re-renders
  const isForwardRef = useRef(true);

  // === Fetch products ===
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

  // === Automatic horizontal scroll (FIXED) ===
  useEffect(() => {
    // 1. Guard against animation and missing ref/data
    if (
      !enableAnimations ||
      !scrollRef.current ||
      newArrivalsProducts.length === 0 ||
      loading
    ) {
      return;
    }

    // 2. Only start animation if element is in view
    if (!inView) {
      return;
    }

    const scrollContainer = scrollRef.current;
    let animationFrame: number;

    const animateScroll = () => {
      // --- THE FIX IS HERE: Re-calculate and check maxScroll for validity ---
      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;

      // If there's no room to scroll, stop the animation loop.
      if (maxScroll <= 0) {
        cancelAnimationFrame(animationFrame);
        return;
      }
      // ---------------------------------------------------------------------

      const step = 0.5; // scroll speed
      let nextScroll = scrollContainer.scrollLeft;

      if (isForwardRef.current) {
        nextScroll += step;
        if (nextScroll >= maxScroll) {
          nextScroll = maxScroll;
          isForwardRef.current = false;
        }
      } else {
        nextScroll -= step;
        if (nextScroll <= 0) {
          nextScroll = 0;
          isForwardRef.current = true;
        }
      }

      scrollContainer.scrollLeft = nextScroll;
      animationFrame = requestAnimationFrame(animateScroll);
    };

    // 3. Start the animation loop
    animationFrame = requestAnimationFrame(animateScroll);

    // 4. Cleanup function
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, enableAnimations, loading, newArrivalsProducts.length]); // Dependencies remain correct

  const handleClickProduct = (id: string) => {
    router.push(`/products/${id}`);
  };

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
          બધા પ્રોડક્ટસ્
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
            >
              {newArrivalsProducts.map((product) => (
                <motion.div
                  key={product._id}
                  className="group flex-shrink-0 w-64 sm:w-72 lg:w-80" // FIXED WIDTH
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
                    className="card group overflow-hidden bg-card rounded-2xl shadow-green-900 hover:shadow-lg transition-shadow duration-300 border border-green-950 flex flex-col h-full" // Added flex-col h-full for better structure
                    onClick={() => handleClickProduct(product._id)}
                  >
                    {/* 👇 MODIFICATION HERE: Fixed height for image wrapper 👇 */}
                    <div className="relative w-full py-2 overflow-hidden h-40 flex items-center justify-center bg-gray-50">
                      {" "}
                      {/* Added h-40 and centering classes */}
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE}/uploads/${product.image}`}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" // Increased hover scale for effect
                        quality={100}
                        priority
                        unoptimized
                      />
                    </div>
                    {/* 👆 END OF MODIFICATION 👆 */}

                    {/* Card Body */}
                    <div className="p-4 bg-white flex flex-col flex-grow">
                      {" "}
                      {/* Added flex-grow */}
                      <p className="text-xs text-green-900 uppercase tracking-wider mb-1">
                        {product.categoryName}
                      </p>
                      <h4 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 text-base flex-grow">
                        {" "}
                        {/* Added flex-grow */}
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between mt-auto">
                        {" "}
                        {/* Used mt-auto to push to bottom */}
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

            {/* View All Button */}
            {/* <div className="text-center pt-8">
              <Link href="/category/new-arrivals">
                <Button size="lg" className="btn-primary group">
                  View All New Arrivals
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div> */}
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
