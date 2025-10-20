"use client";

// ✅ Safe shim to prevent Framer Motion’s “debug is not defined” issue
if (
  typeof window !== "undefined" &&
  typeof (window as any).debug === "undefined"
) {
  (window as any).debug = () => {};
}

import { useRef, useEffect, useState, useCallback, memo } from "react";
import { motion, useAnimation } from "framer-motion";

// --- Data (Unchanged) ---
const testimonials = [
  { id: 1, videoUrl: "Hmkkc5RzIH0" },
  { id: 2, videoUrl: "76Hek-j5NR0" },
  { id: 3, videoUrl: "EswxrWTLNT8" },
  { id: 4, videoUrl: "WVhYWSSQsBM" },
  { id: 5, videoUrl: "FFg3X3gl76k" },
  { id: 6, videoUrl: "NegHPlGrDZ8" },
  { id: 7, videoUrl: "sQ4Gj694010" },
  { id: 8, videoUrl: "FCnN3X2__og" },
  { id: 9, videoUrl: "5sZ1ne_CjvU" },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

// --- 9:16 Testimonial Card Component (Modified) ---

interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
}

const TestimonialCard = memo(({ testimonial }: TestimonialCardProps) => {
  // Use a YouTube Short embed URL with minimal controls
  const embedUrl = `https://www.youtube.com/embed/${testimonial.videoUrl}?controls=0&modestbranding=1&rel=0&autoplay=0`;

  return (
    // Adjusted width to w-72 for a slightly narrower card better suited for vertical video
    <div className="flex-shrink-0 w-72 sm:w-80 p-4">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transform transition-all hover:scale-[1.02] duration-300 border border-green-300">
        {/* 💡 THE KEY CHANGE: Aspect Ratio Wrapper */}
        {/* Relative container for absolute iframe */}
        <div className="relative w-full">
          {/* Padding-Top forces the 9:16 vertical aspect ratio (16/9 * 100% = 177.77%) */}
          <div className="pt-[177.77%]"></div>

          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={`Testimonial Video ${testimonial.id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = "TestimonialCard";

// --- Main Slider Component (Logic Unchanged) ---

export const InfiniteShortsSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderControls = useAnimation();
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const DURATION = 50;

  const calculateSliderWidth = useCallback((): number => {
    if (sliderRef.current) {
      return sliderRef.current.scrollWidth / 2;
    }
    return 0;
  }, []);

  const startSlider = useCallback(() => {
    const width = calculateSliderWidth();
    if (width > 0) {
      sliderControls.start({
        x: -width,
        transition: {
          duration: DURATION,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [sliderControls, calculateSliderWidth]);

  // Start animation after DOM ready
  useEffect(() => {
    if (!sliderRef.current) return;
    const timer = setTimeout(() => {
      startSlider();
    }, 300);
    return () => clearTimeout(timer);
  }, [startSlider]);

  // Pause/resume when hovering
  useEffect(() => {
    if (isSliderPaused) {
      sliderControls.stop();
    } else {
      startSlider();
    }
  }, [isSliderPaused, startSlider, sliderControls]);

  return (
    <section className="py-16 bg-green-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <h2 className="text-4xl font-extrabold text-green-50 mb-2">
          ખેડૂતો દ્વારા વિશ્વસનીય
        </h2>
        <p className="text-xl text-gray-100">
          અમારા ખેડૂતો અમર સંજીવની ઉત્પાદનો વિશે શું કહે છે તે જુઓ.
        </p>
      </div>

      <div
        ref={sliderRef}
        className="flex whitespace-nowrap"
        onMouseEnter={() => setIsSliderPaused(true)}
        onMouseLeave={() => setIsSliderPaused(false)}
      >
        <motion.div
          className="flex"
          animate={sliderControls}
          initial={{ x: 0 }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InfiniteShortsSlider;
