"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode[];
  mobileItemsPerView?: number;
  desktopItemsPerView?: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  mobileItemsPerView = 1,
  desktopItemsPerView = 3,
  gap = 16,
  autoPlay = false,
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(mobileItemsPerView);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate total slides based on items per view
  const totalSlides = Math.max(0, children.length - itemsPerView + 1);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setItemsPerView(desktopItemsPerView);
      } else {
        setItemsPerView(mobileItemsPerView);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileItemsPerView, desktopItemsPerView]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, totalSlides, autoPlayInterval]);

  // Navigation functions
  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
    },
    [totalSlides]
  );

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < totalSlides - 1) {
      goToNext();
    }
    if (isRightSwipe && currentIndex > 0) {
      goToPrevious();
    }

    // Resume auto-play after interaction
    if (autoPlay) {
      setTimeout(() => setIsAutoPlaying(true), 2000);
    }
  };

  // Mouse handlers for desktop
  const handleMouseEnter = () => {
    if (autoPlay) setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    if (autoPlay) setIsAutoPlaying(true);
  };

  // Calculate transform based on current index
  const itemWidth = 100 / itemsPerView;
  const transform = `translateX(-${currentIndex * itemWidth}%)`;

  if (children.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative w-full max-w-7xl mx-auto ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-2xl">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform,
            gap: `${gap}px`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-none"
              style={{
                width: `calc(${itemWidth}% - ${
                  (gap * (itemsPerView - 1)) / itemsPerView
                }px)`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          {/* Previous arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-slate-600/50 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:text-blue-300 transition-colors duration-300" />
          </button>

          {/* Next arrow */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full flex items-center justify-center text-white hover:bg-slate-700/80 hover:border-slate-600/50 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            disabled={currentIndex === totalSlides - 1}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:text-blue-300 transition-colors duration-300" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-blue-500 to-cyan-400 w-8"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress indicator for auto-play */}
      {autoPlay && isAutoPlaying && totalSlides > 1 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse opacity-60"
          style={{
            width: `${((currentIndex + 1) / totalSlides) * 100}%`,
            transition: "width 0.5s ease-out",
          }}
        />
      )}
    </div>
  );
};

export default Carousel;
