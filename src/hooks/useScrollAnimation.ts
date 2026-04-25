import { useEffect, useRef, useState } from "react";

type AnimationType = "slide-up" | "slide-left" | "slide-right" | "drop-down";

export function useScrollAnimation(animation: AnimationType = "slide-up", threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const classMap: Record<AnimationType, string> = {
    "slide-up": "animate-slide-up",
    "slide-left": "animate-slide-left",
    "slide-right": "animate-slide-right",
    "drop-down": "animate-drop-down",
  };

  return {
    ref,
    className: isVisible ? classMap[animation] : "opacity-0",
  };
}
