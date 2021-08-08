import React from "react";
import Link from "next/link";
export default function BusinessCard({ business }) {
  return (
    <div>
      <Link href={`/profession/${business.id}`}>
        <p>الشركة: {business.businessName}</p>
      </Link>
      <p>صاحب الشركة: {business.name}</p>
      <hr />
    </div>
  );
}
