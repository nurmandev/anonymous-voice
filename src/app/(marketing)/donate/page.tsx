import TitleHeader from "@/components/common/TitleHeader";
import DonationDetails from "@/components/pages/donate/DonationDetails";
import React from "react";

const DonatePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <TitleHeader title="Make a Difference Today" />
      <DonationDetails />
    </div>
  );
};

export default DonatePage;
