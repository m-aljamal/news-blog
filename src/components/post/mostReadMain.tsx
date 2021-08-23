import Image from "next/image";
import Link from "next/link";
import ShowDate from "../layout/ShowDate";
export default function MostReadMain({ post }) {
  const linkTo = `/news/${post?.categoryName}/${post?.slug}`;

  return (
    <div>
      <Link href={linkTo}>
        <div>
          {post && (
            <Image
              className="rounded-t-lg cursor-pointer"
              src={post.image.secure_url}
              width={600}
              height={350}
              layout="responsive"
              objectFit="cover"
            />
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={linkTo}>
          <h2 className="mt-2 heading text-xl">{post?.title}</h2>
        </Link>
        <p className="postBody mt-4 text-lg mb-3">{post?.description}</p>

        <ShowDate date={post?.createdAt} />
      </div>
    </div>
  );
}
