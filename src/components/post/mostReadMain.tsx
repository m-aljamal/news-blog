import Image from "next/image";
import Link from "next/link";
export default function MostReadMain({ post }) {
  const linkTo = `/news/${post.categoryName}/${post.slug}`;

  return (
    <div>
      <Link href={linkTo}>
        <div>
          <Image
            className="rounded-t-lg cursor-pointer"
            src={post.image}
            width={600}
            height={350}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </Link>

      <div className="p-5">
        <Link href={linkTo}>
          <h2 className="mt-2 heading">{post.title}</h2>
        </Link>
        <p className="postBody mt-4 ">{post.description}</p>
      </div>
    </div>
  );
}
