import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScrollProvider } from "@/context/smooth-scroll";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
      <Toaster />
    </>
  );
}
