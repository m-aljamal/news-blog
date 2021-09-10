import prisma from "src/prisma";
import NavBar from "src/components/navbar";
import Post from "src/components/post";
import TopPost from "src/components/post/TopPost";
import MostReadMain from "src/components/post/mostReadMain";
import PostList from "src/components/post/PostList";
import Head from "next/head";
import LogoNav from "src/components/navbar/LogoNav";
export interface ICats {
  categories: ICategory[];
  importantPosts: IPost[];
  topPost: IPost;
  mostRead: IPost[];
  posts: IPost[];
}

interface ICategory {
  name: string;
  slugName: string;
  id: number;
  posts: IPost[];
}

export interface INav {
  categories: ICategory[];
}
interface IPost {
  title: string;
  image: {
    secure_url: string;
    public_id: string;
  };
  description: string;
  id: string;
  slug: string;
  categoryName: string;
  createdAt: string;
}

export interface IPosts {
  posts: IPost[];
}
export default function Home({
  categories,
  importantPosts,
  topPost,
  mostRead,
}: ICats) {
  return (
    <>
      <Head>
        <title>Social Media Preview</title>
        <meta property="og:url" content="your url" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="your fb app id" />
        <meta property="og:title" content="Social Media Preview Working?" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Hurray!! Yes Social Media Preview is Working"
        />
        <meta
          property="og:image"
          content={
            "https://a2d9f143654e.ngrok.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmohammadjamal%2Fimage%2Fupload%2Fv1627662526%2Fxtf39wum8tkmvix1cxit.webp&w=1920&q=75"
          }
        />
      </Head>
      <LogoNav />
      <NavBar categories={categories} />
      <div className="bg-gray-100 py-10">
        <div className=" lg:flex gap-6 container ">
          <TopPost post={topPost} />
          <div className=" lg:w-1/4 sm:flex lg:flex-col gap-4 justify-between mt-8 lg:mt-0">
            {importantPosts?.map((p: IPost) => (
              <div key={p.id} className="w-full my-10 sm:my-0">
                <Post post={p} />
              </div>
            ))}
          </div>
        </div>

        <h2 className="container text-2xl mt-8 text-blue">الاكثر قراءة</h2>
        <div className="sm:flex container mt-8 gap-4">
          <div className="bg-white rounded-lg shadow-lg sm:w-1/2">
            <MostReadMain post={mostRead[0]} />
          </div>
          <div className="sm:w-1/2 grid lg:grid-cols-2 gap-4 mt-4 sm:mt-0">
            {mostRead.map((post, i) => {
              if (i > 0) {
                return (
                  <div key={post.id}>
                    <Post post={post} style="hidden lg:block" />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <h2 className="container text-2xl mt-8 text-blue">اخر الاخبار</h2>
        {categories.map((cat) => (
          <div key={cat.name}>
            <PostList postList={cat} />
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const categories = await prisma.category.findMany({
    select: {
      posts: {
        where: {
          topNews: false,
          mostRead: false,
          important: false,
        },
        select: {
          title: true,
          createdAt: true,
          description: true,
          image: true,
          id: true,
          slug: true,
          categoryName: true,
        },
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
      },
      name: true,
      slugName: true,
    },
  });
  const topPost = await prisma.post.findFirst({
    where: {
      topNews: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const importantPosts = await prisma.post.findMany({
    where: {
      topNews: false,
      mostRead: false,
      important: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
  const mostRead = await prisma.post.findMany({
    where: {
      mostRead: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      importantPosts: JSON.parse(JSON.stringify(importantPosts)),
      topPost: JSON.parse(JSON.stringify(topPost)),
      mostRead: JSON.parse(JSON.stringify(mostRead)),
    },
    revalidate: 20,
  };
};
