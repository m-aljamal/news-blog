import PostWithDescription from "./PostWithDescription";
import Link from "next/link";
export default function PostList({ postList }) {
  if (!postList.posts.length) return <div></div>;
  return (
    <div className="container mt-4">
      <Link href={`/news/${postList.slugName}`}>
        <h2 className="cursor-pointer text-gray-500 text-xl">
          {postList.name}
        </h2>
      </Link>
      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        {postList.posts.map((post) => (
          <div key={post.id}>
            <PostWithDescription post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
