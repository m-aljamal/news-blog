import React from "react";
import CardStatus from "src/components/dashboard/statistics/CardStatus";

import Sidebar from "src/components/dashboard/layout/Sidebar";
import { getSession } from "next-auth/client";

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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session.role !== "ADMINISTRATOR") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
