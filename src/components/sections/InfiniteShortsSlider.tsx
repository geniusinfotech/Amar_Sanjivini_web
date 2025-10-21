"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";
import { motion, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// --- Data ---
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

// Create extended array for seamless infinite scrolling
const extendedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

// --- Testimonial Card Component ---
interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
  index: number;
  onVideoStateChange: (index: number, isPlaying: boolean) => void;
  isActive: boolean;
}

const TestimonialCard = memo(
  ({
    testimonial,
    index,
    onVideoStateChange,
    isActive,
  }: TestimonialCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const playerRef = useRef<any>(null);

    const videoId = testimonial.videoUrl;

    // Initialize YouTube Player
    useEffect(() => {
      // Load YouTube IFrame API
      if (!(window as any).YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }

      const initPlayer = () => {
        if (!containerRef.current || playerRef.current) return;

        const YT = (window as any).YT;
        if (!YT || !YT.Player) {
          setTimeout(initPlayer, 100);
          return;
        }

        const playerId = `player-${index}-${videoId}`;
        const playerDiv = containerRef.current.querySelector(`#${playerId}`);

        if (!playerDiv) return;

        playerRef.current = new YT.Player(playerId, {
          videoId: videoId,
          playerVars: {
            controls: 1,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: () => setPlayerReady(true),
            onStateChange: (event: any) => {
              if (event.data === YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                onVideoStateChange(index, true);
              } else if (
                event.data === YT.PlayerState.PAUSED ||
                event.data === YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
                onVideoStateChange(index, false);
              }
            },
          },
        });
      };

      const timer = setTimeout(initPlayer, 500);
      return () => {
        clearTimeout(timer);
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      };
    }, [videoId, index, onVideoStateChange]);

    // Pause video when carousel moves (card becomes inactive)
    useEffect(() => {
      if (!isActive && isPlaying && playerRef.current && playerReady) {
        try {
          playerRef.current.pauseVideo();
        } catch (e) {
          console.error("Error pausing video:", e);
        }
      }
    }, [isActive, playerReady]);

    return (
      <div className="flex-shrink-0 w-72 sm:w-80 md:w-72 lg:w-80 px-3 pb-5">
        <div
          ref={containerRef}
          className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-green-200 relative"
        >
          <div className="relative w-full">
            {/* 9:16 aspect ratio for vertical shorts */}
            <div className="pt-[177.77%]"></div>
            <div
              id={`player-${index}-${videoId}`}
              className="absolute inset-0 w-full h-full"
            ></div>
          </div>
        </div>
      </div>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

// --- Main Slider Component ---
export const InfiniteShortsSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [cardWidth, setCardWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(
    null
  );
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate card width
  useEffect(() => {
    const calculateWidth = () => {
      if (sliderRef.current) {
        const firstCard = sliderRef.current.querySelector(
          ".flex-shrink-0"
        ) as HTMLElement;
        if (firstCard) setCardWidth(firstCard.offsetWidth);
      }
    };
    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // Handle video state changes
  const handleVideoStateChange = useCallback(
    (index: number, isPlaying: boolean) => {
      setIsVideoPlaying(isPlaying);
      setPlayingVideoIndex(isPlaying ? index : null);
    },
    []
  );

  // Slide to specific index
  const slideTo = useCallback(
    (index: number, immediate = false) => {
      if (cardWidth === 0) return;
      setCurrentIndex(index);
      if (sliderRef.current) {
        const offset = -index * cardWidth;
        sliderRef.current.style.transition = immediate
          ? "none"
          : "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        sliderRef.current.style.transform = `translateX(${offset}px)`;
      }
    },
    [cardWidth]
  );

  // Handle infinite loop reset
  useEffect(() => {
    if (cardWidth === 0) return;
    const handleTransitionEnd = () => {
      if (currentIndex >= testimonials.length * 2)
        slideTo(testimonials.length, true);
      else if (currentIndex <= 0) slideTo(testimonials.length, true);
    };
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("transitionend", handleTransitionEnd);
      return () =>
        slider.removeEventListener("transitionend", handleTransitionEnd);
    }
  }, [currentIndex, slideTo, cardWidth]);

  const handleNext = useCallback(
    () => slideTo(currentIndex + 1),
    [currentIndex, slideTo]
  );
  const handlePrev = useCallback(
    () => slideTo(currentIndex - 1),
    [currentIndex, slideTo]
  );

  // Auto-play functionality
  useEffect(() => {
    if (isHovered || isDragging || isVideoPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => handleNext(), 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, isDragging, isVideoPlaying, handleNext]);

  // Drag handlers
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const threshold = 50;
    if (info.offset.x > threshold) handlePrev();
    else if (info.offset.x < -threshold) handleNext();
    else slideTo(currentIndex);
  };

  // Initialize position
  useEffect(() => {
    if (cardWidth > 0 && currentIndex === testimonials.length) {
      slideTo(testimonials.length, true);
    }
  }, [cardWidth, currentIndex, slideTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="py-16 bg-green-900 overflow-hidden relative bg-contain bg-no-repeat bg-left-bottom bg-[url('/background/farmer-p.png')]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-50 mb-3 tracking-tight">
          ખેડૂતો દ્વારા વિશ્વસનીય
        </h2>
        <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
          અમારા ખેડૂતો અમર સંજીવની ઉત્પાદનો વિશે શું કહે છે તે જુઓ.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={sliderRef}
            className="flex cursor-grab active:cursor-grabbing"
            drag={isVideoPlaying ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
                index={index}
                onVideoStateChange={handleVideoStateChange}
                isActive={
                  playingVideoIndex === null || playingVideoIndex === index
                }
              />
            ))}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={isVideoPlaying}
          className="absolute top-1/2 -left-2 md:left-0 transform -translate-y-1/2 p-3 md:p-4 bg-white hover:bg-green-50 text-green-800 rounded-full shadow-xl hover:shadow-2xl z-20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Previous videos"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={handleNext}
          disabled={isVideoPlaying}
          className="absolute top-1/2 -right-2 md:right-0 transform -translate-y-1/2 p-3 md:p-4 bg-white hover:bg-green-50 text-green-800 rounded-full shadow-xl hover:shadow-2xl z-20 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          aria-label="Next videos"
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => slideTo(testimonials.length + index)}
              disabled={isVideoPlaying}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:cursor-not-allowed ${
                currentIndex % testimonials.length === index
                  ? "w-8 bg-green-50"
                  : "w-2 bg-green-300 hover:bg-green-200"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfiniteShortsSlider;
