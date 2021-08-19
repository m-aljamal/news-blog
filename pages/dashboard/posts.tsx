import Layout from "src/components/dashboard/layout";
import prisma from "src/prisma";
export default function posts({ posts }) {
  return (
    <Layout>
      <div>Search</div>
      <div>
        {posts.map((post) => (
          <p className="py-3 ">{post.title}</p>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
