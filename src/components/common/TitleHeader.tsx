import React from "react";

interface TitleHeaderProps {
  title: (() => string) | string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  const headerText = typeof title === "function" ? title() : title;

  return (
    <div className="relative mb-8 w-full">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: "url('/images/header_title_bg.png')" }}
        />
        <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16">
          <div className="absolute inset-0 rounded-full -translate-x-1/4 -translate-y-1/4" />
          <div className="absolute inset-0 rounded-full translate-x-1/4 translate-y-1/4 scale-75" />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 transform rotate-90">
          <div className="absolute inset-0 rounded-full -translate-x-1/4 -translate-y-1/4" />
          <div className="absolute inset-0 rounded-full translate-x-1/4 translate-y-1/4 scale-75" />
        </div>
      </div>
      <h1 className="relative text-center text-white text-lg md:text-2xl lg:text-3xl py-6 sm:py-8 md:py-10 font-semibold">
        {headerText}
      </h1>
    </div>
  );
};

export default TitleHeader;
