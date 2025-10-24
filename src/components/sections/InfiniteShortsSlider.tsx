"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  videoId: string;
  thumbnail: string;
}

const YouTubeShortsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [cardSpacing, setCardSpacing] = useState(350);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      videoId: "Hmkkc5RzIH0",
      thumbnail: "https://img.youtube.com/vi/Hmkkc5RzIH0/maxresdefault.jpg",
    },
    {
      id: "2",
      videoId: "76Hek-j5NR0",
      thumbnail: "https://img.youtube.com/vi/76Hek-j5NR0/default.jpg",
    },
    {
      id: "3",
      videoId: "EswxrWTLNT8",
      thumbnail: "https://img.youtube.com/vi/EswxrWTLNT8/maxresdefault.jpg",
    },
    {
      id: "4",
      videoId: "WVhYWSSQsBM",
      thumbnail: "https://img.youtube.com/vi/WVhYWSSQsBM/default.jpg",
    },
    {
      id: "5",
      videoId: "FFg3X3gl76k",
      thumbnail: "https://img.youtube.com/vi/FFg3X3gl76k/default.jpg",
    },
    {
      id: "6",
      videoId: "NegHPlGrDZ8",
      thumbnail: "https://img.youtube.com/vi/NegHPlGrDZ8/default.jpg",
    },
    {
      id: "7",
      videoId: "sQ4Gj694010",
      thumbnail: "https://img.youtube.com/vi/sQ4Gj694010/maxresdefault.jpg",
    },
    {
      id: "8",
      videoId: "FCnN3X2__og",
      thumbnail: "https://img.youtube.com/vi/FCnN3X2__og/default.jpg",
    },
    {
      id: "9",
      videoId: "5sZ1ne_CjvU",
      thumbnail: "https://img.youtube.com/vi/5sZ1ne_CjvU/default.jpg",
    },
  ];

  useEffect(() => {
    const checkDimensions = () => {
      const width = window.innerWidth;

      // Define breakpoints
      const isCurrentlyMobile = width < 768; // Below MD
      const isCurrentlyTablet = width >= 768 && width < 1024; // MD breakpoint

      setIsMobile(isCurrentlyMobile);
      setIsTablet(isCurrentlyTablet);

      let spacing = 350; // MD spacing
      if (width >= 1024) {
        // LG spacing
        spacing = 420;
      } else if (width < 768) {
        // Mobile spacing is irrelevant as scale becomes 0 for side cards,
        // but we keep the default for consistency in the logic below
        spacing = 300;
      }
      setCardSpacing(spacing);
    };

    checkDimensions();
    window.addEventListener("resize", checkDimensions);
    return () => window.removeEventListener("resize", checkDimensions);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const openVideo = (videoId: string) => {
    setActiveVideoId(videoId);
    setIsPlayerOpen(true);
    // Prevents scrolling while the modal is open
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setIsPlayerOpen(false);
    setActiveVideoId("");
    // Restores scrolling
    document.body.style.overflow = "unset";
  };

  const getVisibleTestimonials = () => {
    if (isMobile) {
      // Only show the current slide on mobile
      return [{ ...testimonials[currentIndex], position: 0 }];
    }

    const visible = [];
    // Show previous, current, and next slides on larger screens
    for (let i = -1; i <= 1; i++) {
      const index =
        (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 px-4">
            Client Testimonials
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 px-4">
            See what our customers have to say
          </p>
        </div>

        <div className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {getVisibleTestimonials().map((testimonial) => {
              const isCenter = testimonial.position === 0;

              let translateX = 0;
              if (!isMobile) {
                translateX = testimonial.position * cardSpacing;
              }

              const scale = isCenter ? 1 : isMobile ? 0 : 0.8;
              const opacity = isCenter ? 1 : isMobile ? 0 : 0.5;
              const zIndex = isCenter ? 20 : 10;

              return (
                <div
                  key={testimonial.id}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  <div
                    className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden 
                                 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px] 
                                 cursor-pointer group mx-auto"
                  >
                    <div
                      className="relative aspect-[9/16]"
                      onClick={() => isCenter && openVideo(testimonial.videoId)}
                    >
                      <Image
                        src={testimonial.thumbnail}
                        alt="YouTube video thumbnail"
                        className="w-full h-full object-cover"
                        width={500}
                        height={1000}
                        quality={100}
                        priority={isCenter} // Prioritize loading the center image
                      />
                      {isCenter && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                          <div className="bg-white rounded-full p-4 sm:p-5 md:p-6 transform group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600 fill-green-600" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 md:left-8 lg:left-12 z-30 bg-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:bg-gray-100 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 md:right-8 lg:right-12 z-30 bg-white rounded-full p-2 sm:p-3 md:p-4 shadow-xl hover:bg-gray-100 transition-all hover:scale-110 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600" />
          </button>
        </div>

        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all ${
                idx === currentIndex
                  ? "w-8 sm:w-10 md:w-12 h-2 sm:h-2.5 md:h-3 bg-white rounded-full"
                  : "w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-white bg-opacity-40 rounded-full hover:bg-opacity-60"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Fullscreen Video Player - FIXED with correct Close Button position */}
      {isPlayerOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-95 z-[9999] flex items-center justify-center"
          onClick={closeVideo} // Click on the overlay to close
        >
          {/* * CORRECTED CLOSE BUTTON:
           * Positioned absolutely relative to the fixed overlay (top right corner of the screen)
           */}
          <button
            onClick={closeVideo}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 
                       bg-white rounded-full p-2 sm:p-2.5 md:p-3 hover:bg-gray-200 transition-all z-[99999] active:scale-95"
            aria-label="Close video"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-gray-800" />
          </button>

          {/* Video Container - Centered and sized for short format */}
          <div
            className={`
              relative bg-black rounded-lg overflow-hidden shadow-2xl m-4
              ${
                isMobile
                  ? "w-full max-w-[95vw] h-auto aspect-[9/16] max-h-[85vh]"
                  : isTablet
                  ? "w-full max-w-[85vw] md:max-w-[500px] aspect-[9/16] max-h-[80vh]"
                  : "w-full max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] aspect-[9/16] max-h-[85vh]"
              }
            `}
            onClick={(e) => e.stopPropagation()} // Stop click from bubbling up to the overlay's closeVideo
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeShortsSlider;
