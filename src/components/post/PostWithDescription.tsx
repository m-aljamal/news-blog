import Link from "next/link";
import React from "react";
import Image from "next/image";
import ShowDate from "../layout/ShowDate";
export default function PostWithDescription({ post, ...props }) {
  return (
    <div
      key={post.id}
      className={`flex justify-around gap-4 bg-white min-h-[250px] rounded-lg sm:flex-row flex-col-reverse shadow-md ${props.style}`}
    >
      <div className="w-full sm:w-3/5 p-4">
        <Link href={`/news/${post.categoryName}/${post.slug}`}>
          <h2 className="heading text-lg hover:underline">{post.title}</h2>
        </Link>
        <p className="postBody mt-4 text-base mb-3">{post.description}</p>

        <ShowDate date={post.createdAt} />
      </div>
      <div className="w-full  sm:w-2/5">
        <Link href={`/news/${post.categoryName}/${post.slug}`}>
          <div className="relative h-[250px]  sm:h-[100%]">
            <Image
              src={post?.image.secure_url}
              layout="fill"
              objectFit="cover"
              className="rounded-tl-lg sm:rounded-bl-lg cursor-pointer rounded-tr-lg sm:rounded-tr-none"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
