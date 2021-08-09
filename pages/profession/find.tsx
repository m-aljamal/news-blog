import React from "react";
import { useRouter } from "next/router";
import prisma from "src/prisma";
import BusinessCard from "src/components/business/BusinessCard";
import BackLinkButton from "src/components/business/BackLinkButton";
export default function findProfPage({ findProf }) {
  const { query } = useRouter();

  return (
    <div className="mt-4  container ">
      <BackLinkButton text="رجوع للخلف" />

      <h2 className="businessTitle mt-8">
        تم العثور على {findProf.length} شركة مختصة في
        <span className="text-red-500"> {query.prof}</span>:
      </h2>
      {findProf?.map((p) => (
        <div key={p.id} className=" py-4">
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
    select: {
      businessName: true,
      id: true,
      jobDescription: true,
      name: true,
      logo: true,
      reviews: {
        select: {
          star: true,
        },
      },
    },
  });

  return {
    props: {
      findProf: JSON.parse(JSON.stringify(findProf)),
    },
  };
}
