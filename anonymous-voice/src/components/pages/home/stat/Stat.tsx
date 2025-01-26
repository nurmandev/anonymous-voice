import React from "react";
import { StatsSection } from "./StatsSection";
import { StatTypes } from "./types";

const stats: StatTypes[] = [
  {
    icon: "users",
    value: "15000+",
    label: "Interested Users",
  },
  {
    icon: "check",
    value: "1200+",
    label: "Responded Users",
  },
  {
    icon: "heart",
    value: "25+",
    label: "Need The Service",
  },
];

const Stat = () => {
  return (
    <div>
      <StatsSection stats={stats} />
    </div>
  );
};

export default Stat;
