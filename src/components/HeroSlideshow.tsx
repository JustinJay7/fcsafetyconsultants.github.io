import { useState, useEffect, useCallback } from "react";
import hero1 from "@/assets/hero-1-hd.jpg";
import hero2 from "@/assets/hero-2-hd.jpg";
import hero3 from "@/assets/hero-3-new-hd.jpg";
import hero4 from "@/assets/hero-4-hd.jpg";
import hero5 from "@/assets/hero-5-hd.jpg";
import hero6 from "@/assets/hero-6-hd.jpg";

const slides = [
  { src: hero1, alt: "FC Safety team reviewing site plans" },
  { src: hero2, alt: "FC Safety Consultants team on construction site" },
  { src: hero3, alt: "Construction site safety inspection" },
  { src: hero4, alt: "Construction site scaffolding inspection" },
  { src: hero5, alt: "Safety officer reviewing documentation" },
  { src: hero6, alt: "Construction site safety overview" },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
    });
  }, []);

  const goTo = useCallback((index: number) => setCurrent(index), []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black"
      style={{
        marginTop: "95px",
        height: "60vh",
        minHeight: "360px",
        maxHeight: "540px",
        border: "none",
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 will-change-[opacity]"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 800ms ease-in-out",
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            decoding={i === 0 ? "sync" : "async"}
            className="absolute inset-0 h-full w-full"
            style={{
              objectFit: "cover",
              objectPosition: "center 30%",
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 px-4 text-center">
        <h1
          className="font-display text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl lg:text-6xl drop-shadow-lg mb-3"
          style={{ lineHeight: "1.1", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
        >
          FC Safety Consultants
        </h1>
        <p
          className="font-display text-base font-semibold text-white sm:text-lg md:text-xl max-w-2xl"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
        >
          Your Trusted Health &amp; Safety Consultant
        </p>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="h-2.5 w-2.5 rounded-full border border-white/40 transition-all duration-300"
            style={{
              backgroundColor: i === current ? "hsl(var(--primary))" : "rgba(255,255,255,0.45)",
              transform: i === current ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;
