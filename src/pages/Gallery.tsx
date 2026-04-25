import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import WhatsAppFAB from "@/components/WhatsAppFAB";

import hero1 from "@/assets/hero-1-hd.jpg";
import hero2 from "@/assets/hero-2-hd.jpg";
import hero3 from "@/assets/hero-3-new-hd.jpg";
import hero4 from "@/assets/hero-4-hd.jpg";
import hero5 from "@/assets/hero-5-hd.jpg";
import hero6 from "@/assets/hero-6-hd.jpg";
import hero7 from "@/assets/hero-7-hd.jpg";
import hero8 from "@/assets/hero-8-hd.jpg";
import heroNewB from "@/assets/hero-new-b-hd.jpg";
import galleryCrane from "@/assets/gallery-crane-hd.jpg";

// 10 unique images — trees-only photo and duplicate street scene removed
const photos = [
  { src: hero1, alt: "FC Safety team reviewing site plans" },
  { src: hero2, alt: "FC Safety Consultants team on construction site" },
  { src: hero3, alt: "Safety representative inspecting building exterior on city street" },
  { src: hero4, alt: "Construction site scaffolding inspection" },
  { src: hero5, alt: "Safety officer reviewing documentation" },
  { src: hero6, alt: "Construction site safety overview" },
  { src: hero7, alt: "Safety equipment review" },
  { src: hero8, alt: "On-site safety briefing" },
  { src: heroNewB, alt: "Safety officer inspecting ductwork installation on site" },
  { src: galleryCrane, alt: "Tower crane operating on construction site" },
];

const Gallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lightboxPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    []
  );
  const lightboxNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    []
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightboxPrev();
      if (e.key === "ArrowRight") lightboxNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, lightboxPrev, lightboxNext]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-[110px] pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-display font-semibold"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>

          <header className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-primary mb-3">
              Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A glimpse of FC Safety Consultants on site — keeping South African workplaces safe and compliant. Click any image to enlarge.
            </p>
          </header>

          <div className="relative">
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
              <div className="flex">
                {photos.map((p, i) => {
                  const isActive = i === selectedIndex;
                  return (
                    <div
                      key={i}
                      className="relative shrink-0 grow-0 px-2"
                      style={{ flexBasis: "80%" }}
                    >
                      <button
                        type="button"
                        onClick={() => isActive && openLightbox(i)}
                        className="relative aspect-[16/9] block w-full overflow-hidden rounded-lg bg-black transition-all duration-500 cursor-pointer"
                        style={{
                          filter: isActive ? "blur(0px)" : "blur(6px)",
                          opacity: isActive ? 1 : 0.55,
                          transform: isActive ? "scale(1)" : "scale(0.95)",
                        }}
                        aria-label={isActive ? `Enlarge image: ${p.alt}` : p.alt}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <img
                          src={p.src}
                          alt={p.alt}
                          loading={i === 0 ? "eager" : "lazy"}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 hover:bg-black/80 text-white p-3 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 hover:bg-black/80 text-white p-3 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className="h-2.5 w-2.5 rounded-full border border-foreground/30 transition-all duration-300"
                style={{
                  backgroundColor: i === selectedIndex ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  transform: i === selectedIndex ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {selectedIndex + 1} / {photos.length} — {photos[selectedIndex]?.alt}
          </p>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
          >
            <X size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              lightboxPrev();
            }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              lightboxNext();
            }}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
          >
            <ChevronRight size={28} />
          </button>
          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
          />
          <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80 px-4">
            {lightboxIndex + 1} / {photos.length} — {photos[lightboxIndex].alt}
          </p>
        </div>
      )}

      <ContactFooter />
      <WhatsAppFAB />
    </>
  );
};

export default Gallery;
