import React from "react";
import { useRouter } from "next/router";
import prisma from "src/prisma";
import BusinessCard from "src/components/business/BusinessCard";
export default function findProfPage({ findProf }) {
  const { query } = useRouter();

  return (
    <div className="mt-8  container">
      <h2>{query.prof}:</h2>
      {findProf?.map((p) => (
        <div key={p.id} className=" py-8">
          <BusinessCard business={p} />
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const findProf = await prisma.business.findMany({
    where: {
      country: ctx.query.country,
      businessType: ctx.query.prof,
    },
  });

  return {
    props: {
      findProf: JSON.parse(JSON.stringify(findProf)),
    },
  };
}
