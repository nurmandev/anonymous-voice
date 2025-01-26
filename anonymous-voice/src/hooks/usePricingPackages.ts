import { useState, useEffect } from "react";

interface Package {
  id: number;
  name: string;
  duration: string;
  validity: string;
  price: number;
  isCustom?: boolean;
}

interface PricingData {
  packages: Package[];
}

export function usePricingPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/data/pricing-packages.json");
        if (!response.ok) {
          throw new Error("Failed to fetch pricing packages");
        }
        const data: PricingData = await response.json();
        setPackages(data.packages);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch packages",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, isLoading, error };
}
