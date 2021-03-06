import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DisplayRate } from "pages/profession/[id]";
export default function BusinessCard({ business }) {
  const avg = (arr) => {
    if (arr.length) {
      const number = arr?.reduce((acc, cur) => acc + cur) / arr.length;
      return Math.round(number);
    }
  };
  const starAvrage = avg(business?.reviews?.map((n) => n.star));

  return (
    <div className="rounded-lg shadow-lg border-2 border-gray-100 border-opacity-30">
      <Link href={`/profession/${business.id}`}>
        <div className="flex items-center p-4 justify-between cursor-pointer h-72">
          <div className="w-3/4 px-4">
            <div className="flex gap-4 items-center">
              <p className="title">{business.businessName}</p>
              <DisplayRate
                avrage={starAvrage}
                starCount={business.reviews.length}
              />
            </div>
            <p className="businessBody"> {business.name}</p>
            <p className="businessBody mt-4">{business.jobDescription}</p>
          </div>
          <div className="w-1/4 text-center relative  h-full">
            {business?.logo?.secure_url && (
              <Image
                className="rounded-lg"
                src={business?.logo?.secure_url}
                objectFit="cover"
                layout="fill"
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
