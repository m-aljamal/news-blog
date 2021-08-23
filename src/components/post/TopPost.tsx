import Image from "next/image";
import Link from "next/link";
import ShowDate from "../layout/ShowDate";
export default function TopPost({ post }) {
  const linkTo = `/news/${post?.categoryName}/${post?.slug}`;
  return (
    <div className="newsBox lg:w-3/4 ">
      <Link href={linkTo}>
        <h2 className="heading mb-4 p-4 text-2xl">{post?.title}</h2>
      </Link>
      <Link href={linkTo}>
        <div>
          {post?.image && (
            <Image
              className="cursor-pointer"
              alt="Mountains"
              src={post?.image.secure_url}
              width={700}
              height={450}
              layout="responsive"
            />
          )}
        </div>
      </Link>
      <div className="mt-3 p-4">
        <p className=" postBody text-xl mb-3 ">{post?.description}</p>
        <ShowDate date={post?.createdAt} />
      </div>
    </div>
  );
}
