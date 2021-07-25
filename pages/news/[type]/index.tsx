import { useRouter } from "next/router";
import { ICats } from "pages";
import prisma from "src/prisma";
import Link from "next/link";
import NavBar from "src/components/navbar";
export default function index({ posts, categories }: ICats) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar categories={categories} />
      <h2 className="text-red-700">{router.query.type}</h2>
      {posts?.map((post) => (
        <div key={post.id}>
          <Link href={`/news/${router.query.type}/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
          <div>
            <img src={post.image} />
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps(ctx) {
  const categories = await prisma.category.findMany();

  const posts = await prisma.post.findMany({
    where: {
      categoryName: ctx.params.type,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)), categories },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const posts = await prisma.post.findMany();
  const ids = posts.map((m) => {
    console.log(m);

    return {
      params: { type: m.categoryName },
    };
  });
  return {
    fallback: false,
    paths: ids,
  };
}
