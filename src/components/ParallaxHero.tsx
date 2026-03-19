"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface ParallaxHeroProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function ParallaxHero({ src, alt, children }: ParallaxHeroProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    function onScroll() {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        if (imageRef.current) {
          const y = window.scrollY * 0.3;
          imageRef.current.style.transform = `translateY(${y}px)`;
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div ref={imageRef} className="absolute -inset-y-[20%] inset-x-0 will-change-transform">
        <Image src={src} alt={alt} fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-section">
        {children}
      </div>
    </section>
  );
}
