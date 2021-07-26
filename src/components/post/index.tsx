import Link from "next/link";
export default function Post({ post }) {
  return (
    <div className="mb-4">
      <div key={post.id} className="flex gap-6">
        <Link href={`/news/${post.categoryName}/${post.slug}`}>
          <p className="w-1/2">{post.title}</p>
        </Link>
        <img src={post.image} className="w-1/2" />
      </div>
    </div>
  );
}
