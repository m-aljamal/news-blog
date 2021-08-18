import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function PostWithDescription({ post }) {
  return (
    <div
      key={post.id}
      className="flex justify-around gap-4 bg-white mb-4 rounded-lg"
    >
      <div className="w-3/5 p-4">
        <Link href={`/news/${post.categoryName}/${post.slug}`}>
          <h2 className="heading text-lg hover:underline">{post.title}</h2>
        </Link>
        <p className="postBody mt-4 text-base">{post.description}</p>
      </div>
      <div className="w-2/5">
        <Link href={`/news/${post.categoryName}/${post.slug}`}>
          <div className="relative h-60">
            <Image
              src={post?.image}
              layout="fill"
              objectFit="cover"
              className="rounded-tl-lg rounded-bl-lg cursor-pointer"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
