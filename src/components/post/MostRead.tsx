import Image from "next/image";
import Link from "next/link";
export default function MostRead({ post }) {
  const linkTo = `/news/${post.categoryName}/${post.slug}`;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <Link href={linkTo}>
        <Image
          className="rounded-t-lg cursor-pointer"
          src={post.image}
          width={600}
          height={350}
          layout="responsive"
          objectFit="cover"
        />
      </Link>

      <div className="p-5">
        <Link href={linkTo}>
          <h2 className="mt-2 font-bold cursor-pointer text-gray-800">
            {post.title}
          </h2>
        </Link>
      </div>
    </div>
  );
}
