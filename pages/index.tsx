import prisma from "src/prisma";
import NavBar from "src/components/navbar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";

export interface ICats {
  categories: ICategory[];
  posts: IPost[];
}

interface ICategory {
  name: string;
  id: number;
}

export interface INav {
  categories: ICategory[];
}
interface IPost {
  title: string;
  image: string;
  description: string;
  id: string;
  slug: string;
  categoryName: string;
}

export interface IPosts {
  posts: IPost[];
}
export default function Home({ categories, posts }: ICats) {
  const [session, loading] = useSession();

  return (
    <>
      <NavBar categories={categories} />
      <div>
        <h1>All posts</h1>
        <div className="text-red-700  ">
          {posts?.map((p: IPost) => (
            <div key={p.id}>
              <Link href={`/news/${p.categoryName}/${p.slug}`}>{p.title}</Link>
              <img src={p.image} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const categories = await prisma.category.findMany({});

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
