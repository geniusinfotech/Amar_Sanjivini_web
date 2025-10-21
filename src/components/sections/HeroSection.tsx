"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnimation } from "@/providers/animation-provider";

const heroSlides = [
  {
    id: 1,
    title: "banner1",
    desktop: "/background/b-1.png",
    mobile: "/background/m-b-1.png",
    desktopWidth: 1920,
    desktopHeight: 1080,
    mobileWidth: 750,
    mobileHeight: 800,
  },
  {
    id: 2,
    title: "banner2",
    desktop: "/background/b-2.png",
    mobile: "/background/m-b-2.png",
    desktopWidth: 1920,
    desktopHeight: 1080,
    mobileWidth: 750,
    mobileHeight: 800,
  },
  {
    id: 3,
    title: "banner3",
    desktop: "/background/b-3.png",
    mobile: "/background/m-b-3.png",
    desktopWidth: 1920,
    desktopHeight: 1080,
    mobileWidth: 750,
    mobileHeight: 800,
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { enableAnimations } = useAnimation();

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

  const currentSlideData = heroSlides[currentSlide];
  const imageUrl = isMobile
    ? currentSlideData.mobile
    : currentSlideData.desktop;
  const imageWidth = isMobile
    ? currentSlideData.mobileWidth
    : currentSlideData.desktopWidth;
  const imageHeight = isMobile
    ? currentSlideData.mobileHeight
    : currentSlideData.desktopHeight;

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-green-50"
    >
      {/* Background Images */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`${
              index === currentSlide ? "relative" : "absolute inset-0"
            } w-full`}
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
            }}
            transition={{
              duration: enableAnimations ? 1 : 0,
              ease: "easeInOut",
            }}
          >
            <div
              className={`w-full ${index === currentSlide ? "z-10" : "z-0"}`}
            >
              <Image
                src={imageUrl}
                alt={`Banner ${slide.id}`}
                width={imageWidth}
                height={imageHeight}
                className="object-contain mx-auto block w-full"
                unoptimized
                quality={100}
                priority
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="flex items-center space-x-1 sm:space-x-2 bg-black/30 backdrop-blur-md rounded-full px-1.5 sm:px-3 py-1 sm:py-1.5">
          {/* Previous */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="text-white hover:text-primary-300 hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>

          {/* Dots */}
          <div className="flex space-x-1 sm:space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-primary-400 scale-110"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="text-white hover:text-primary-300 hover:bg-white/10"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </Button>

          {/* Play / Pause */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAutoPlay}
            className="text-white hover:text-primary-300 hover:bg-white/10 ml-1 sm:ml-2"
          >
            {isAutoPlaying ? (
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            ) : (
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 text-white/70 z-20"
      >
        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
          <span className="text-[10px] sm:text-xs md:text-sm uppercase tracking-wider">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-6 sm:h-7 md:h-8 bg-white/50"
          />
        </div>
      </motion.div>
    </section>
  );
}
