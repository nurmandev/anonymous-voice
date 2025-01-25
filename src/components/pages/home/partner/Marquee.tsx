import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = "normal",
}: MarqueeProps) {
  const speeds = {
    slow: "40s",
    normal: "20s",
    fast: "10s",
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-8",
          pauseOnHover && "hover:[animation-play-state:paused]",
          className,
        )}
        style={{
          animation: `scroll${reverse ? "Reverse" : ""} ${speeds[speed]} linear infinite`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
