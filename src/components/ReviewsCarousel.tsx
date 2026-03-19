"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    title: "Reliable from the start",
    text: "Clear communication and dependable service from quote to finish. Jason was prompt, professional and easy to deal with throughout.",
    name: "Sarah T.",
    location: "Wellington",
  },
  {
    title: "Clean and tidy in your home",
    text: "Respectful working methods and a neat approach throughout the job. You wouldn't know anyone had been working — left everything spotless.",
    name: "Mark D.",
    location: "Taunton",
  },
  {
    title: "A finish you'll be happy with",
    text: "Care and attention to the details that make the finished result look right. Really pleased with how the rooms turned out.",
    name: "Jane P.",
    location: "Tiverton",
  },
  {
    title: "Excellent tiling work",
    text: "Jason tiled our kitchen and bathroom — the finish is superb. Neat grouting, clean lines, and he took the time to get everything level and right.",
    name: "Chris W.",
    location: "Wellington",
  },
  {
    title: "Would highly recommend",
    text: "From the first call to the final tidy-up, everything was straightforward and professional. The painting looks fantastic and was done on time.",
    name: "Emma R.",
    location: "Taunton",
  },
  {
    title: "Great exterior painting",
    text: "Jason repainted the outside of our house — fascias, window frames and front door. It all looks fresh and well done. Very happy with the result.",
    name: "David L.",
    location: "Tiverton",
  },
];

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) handleManualNav(next);
    else if (delta < -50) handleManualNav(prev);
    touchStartX.current = null;
    touchEndX.current = null;
  }

  function handleManualNav(fn: () => void) {
    setIsAutoPlaying(false);
    fn();
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }

  // Show 3 cards on desktop, 1 on mobile
  const getVisibleReviews = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(reviews[(current + i) % reviews.length]);
    }
    return items;
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Cards */}
      <div
        className="grid md:grid-cols-3 gap-6 mb-8"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {getVisibleReviews().map((review, idx) => (
          <div
            key={`${review.name}-${idx}`}
            className={`relative bg-background rounded-2xl p-7 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(254,126,4,0.08)] hover:border-primary/20 transition-all duration-500${idx > 0 ? " hidden md:block" : ""}`}
            style={{
              animation: "fadeSlideIn 0.5s ease-out forwards",
              animationDelay: `${idx * 100}ms`,
              opacity: 0,
            }}
          >
            <Quote className="h-8 w-8 text-primary/15 absolute top-5 right-5" />

            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>

            {/* Review text */}
            <h3 className="font-bold text-lg mb-2">{review.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm mb-5">
              {review.text}
            </p>

            {/* Reviewer */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{review.name}</p>
                <p className="text-xs text-slate-400">{review.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => handleManualNav(prev)}
          className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          aria-label="Previous reviews"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                handleManualNav(() => setCurrent(idx));
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-6 bg-primary"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => handleManualNav(next)}
          className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          aria-label="Next reviews"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
