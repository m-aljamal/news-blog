import Link from "next/link";
import Image from "next/image";
export default function Post({ post }) {
  const linkTo = `/news/${post.categoryName}/${post.slug}`;
  return (
    <div className="newsBox text-center ">
      <Link href={linkTo}>
        <Image
          width={250}
          height={140}
          src={post.image}
          alt={post.title}
          objectFit="cover"
          layout="responsive"
          quality={100}
          className="cursor-pointer rounded-t-lg "
        />
      </Link>
      <Link href={linkTo}>
        <h2 className=" heading text-right p-4 ">{post.title}</h2>
      </Link>
    </div>
  );
}
