"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { initLenis } from "@/lib/lenis";

type SmoothScrollContextType = {
  lenis: Lenis | null;
};

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
});

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = initLenis();
    setLenis(lenisInstance);
    return () => lenisInstance.destroy();
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);

  const scrollTo = (target: string | HTMLElement | number) => {
    context.lenis?.scrollTo(target, {
      offset: 0,
      duration: 1.2,
    });
  };

  return { scrollTo };
};
