import Image from "next/image";
import Link from "next/link";
export default function TopPost({ post }) {
  const linkTo = `/news/${post.categoryName}/${post.slug}`;
  return (
    <div className="newsBox w-3/4 ">
      <Link href={linkTo}>
        <h2 className="heading mb-4 p-4">{post.title}</h2>
      </Link>
      <Link href={linkTo}>
        <div>
          <Image
            className="cursor-pointer"
            alt="Mountains"
            src={post.image}
            width={700}
            height={450}
            layout="responsive"
          />
        </div>
      </Link>

      <p className="mt-3 postBody text-base p-4">{post.description}</p>
    </div>
  );
}
