import Link from "next/link";
import Image from "next/image";
import ShowDate from "../layout/ShowDate";
export default function Post({ post, ...props }) {
  const linkTo = `/news/${post.categoryName}/${post.slug}`;
  return (
    <div className="newsBox text-center ">
      <div className={props.style}>
        <Link href={linkTo}>
          <div>
            <Image
              width={250}
              height={140}
              src={post.image.secure_url}
              alt={post.title}
              objectFit="cover"
              layout="responsive"
              quality={100}
              className="cursor-pointer rounded-t-lg "
            />
          </div>
        </Link>
      </div>

      <div className="text-right p-4">
        <Link href={linkTo}>
          <h2 className=" heading hover:underline mb-3">{post.title}</h2>
        </Link>

        <ShowDate date={post.createdAt} />
      </div>
    </div>
  );
}
