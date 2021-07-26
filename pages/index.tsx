import prisma from "src/prisma";
import NavBar from "src/components/navbar";
import Post from "src/components/post";
import TopPost from "src/components/post/TopPost";
export interface ICats {
  categories: ICategory[];
  posts: IPost[];
  topPost: IPost;
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
export default function Home({ categories, posts, topPost }: ICats) {
  console.log(posts);
  console.log(topPost);

  return (
    <>
      <NavBar categories={categories} />
      <div className="mt-5 flex gap-6 container">
        <TopPost post={topPost} />
        <div className="text-red-700 w-1/2">
          {posts?.map((p: IPost) => (
            <Post post={p} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const categories = await prisma.category.findMany({});
  const topPost = await prisma.post.findFirst({
    where: {
      topNews: true,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      topNews: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      posts: JSON.parse(JSON.stringify(posts)),
      topPost: JSON.parse(JSON.stringify(topPost)),
    },
  };
};
