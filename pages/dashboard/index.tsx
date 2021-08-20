import React from "react";
import CardStatus from "src/components/dashboard/statistics/CardStatus";

import Sidebar from "src/components/dashboard/layout/Sidebar";

export default function Dashboard() {
  return (
    <div>
      <Sidebar />
      <div className="relative md:mr-64 bg-blueGray-100">
        {/* Header */}
        <div className="relative bg-blue md:pt-32 pb-32 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full">
            <div>{/* Card stats */}</div>
          </div>
        </div>
        {/* PageVisitStatus */}
      </div>
    </div>
  );
}
