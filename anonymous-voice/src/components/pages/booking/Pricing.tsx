"use client";

import { usePricingPackages } from "@/hooks/usePricingPackages";
import { Package } from "@/types/pricing-packages";
import { Skeleton } from "@/components/ui/skeleton";

interface PricingProps {
  packages?: Package[];
  onSelectPackage?: (pkg: Package) => void;
}

const PackageCard = ({
  pkg,
  onClick,
}: {
  pkg: Package;
  onClick: () => void;
}) => (
  <div
    key={pkg.id}
    className="bg-[#F3F4FF] rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
    onClick={onClick}
  >
    <h3 className="text-gray-900 font-medium mb-2">{pkg.name}</h3>
    {pkg.isCustom ? (
      <div className="text-gray-600 mb-2">
        Custom
        <br />
        Package
      </div>
    ) : (
      <>
        <div className="text-gray-600 mb-1">Duration : {pkg.duration}</div>
        <div className="text-gray-600 mb-4">{pkg.validity}</div>
        <div className="text-red-500 font-medium">${pkg.price}</div>
      </>
    )}
  </div>
);

const PackageSkeleton = () => (
  <div className="bg-[#F3F4FF] rounded-2xl p-6 flex flex-col items-center space-y-2">
    <Skeleton className="h-6 w-24" />
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-5 w-16" />
  </div>
);

export default function Pricing({ onSelectPackage = () => {} }: PricingProps) {
  const { packages, isLoading, error } = usePricingPackages();

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  const renderPackageCards = (pkg: Package) => (
    <PackageCard key={pkg.id} pkg={pkg} onClick={() => onSelectPackage(pkg)} />
  );

  const renderSkeletons = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <PackageSkeleton key={index} />
      ))}
    </>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-medium text-gray-900 mb-8">Pricing</h2>

      <div className="hidden md:grid grid-cols-5 gap-4">
        {isLoading ? renderSkeletons() : packages.map(renderPackageCards)}
      </div>

      <div className="md:hidden space-y-4">
        {isLoading ? renderSkeletons() : packages.map(renderPackageCards)}
      </div>
    </div>
  );
}
