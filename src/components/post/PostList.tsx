import Post from "./index";
export default function PostList({ postList }) {
  return (
    <div className="container mt-4">
      <h2>{postList.name}</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {postList.posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
