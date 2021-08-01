import prisma from "src/prisma";
import NavBar from "src/components/navbar";
import Post from "src/components/post";
import TopPost from "src/components/post/TopPost";
import MostReadMain from "src/components/post/mostReadMain";
import PostList from "src/components/post/PostList";

import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";

export interface ICats {
  categories: ICategory[];
  importantPosts: IPost[];
  topPost: IPost;
  mostRead: IPost[];
  posts: IPost[];
}

interface ICategory {
  name: string;
  id: number;
  posts: IPost[];
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
export default function Home({
  categories,
  importantPosts,
  topPost,
  mostRead,
}: ICats) {
  return (
    <>
      <NavBar categories={categories} />
      <div className="bg-gray-100 py-10">
        <div className=" flex gap-6 container ">
          <TopPost post={topPost} />
          <div className="w-1/4 flex flex-col gap-4 justify-between">
            {importantPosts?.map((p: IPost) => (
              <Post post={p} />
            ))}
          </div>
        </div>
        <h2 className="container text-2xl mt-8 text-blue-500">الاكثر قراءة</h2>
        <div className="flex container mt-8 gap-4">
          <div className="bg-white rounded-lg shadow-lg">
            <MostReadMain post={mostRead[0]} />
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            {mostRead.map((post) => (
              <Post post={post} />
            ))}
          </div>
        </div>
        <h2 className="container text-2xl mt-8 text-blue-500">اخر الاخبار</h2>
        {categories.map((cat) => (
          <PostList postList={cat} />
        ))}
        {/* <div>share test</div>
        <FacebookShareButton
          url={"http://www.camperstribe.com"}
          quote={"CampersTribe - World is yours to explore"}
          hashtag="#camperstribe"
        >
          <FacebookIcon size={36} />
        </FacebookShareButton>
        <WhatsappShareButton
          url={"https://www.npmjs.com/package/react-share"}
          title={"شير على الوتس"}
        >
          <WhatsappIcon size={36} />
        </WhatsappShareButton> */}
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
        },
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
      },
      name: true,
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
  });
  const mostRead = await prisma.post.findMany({
    where: {
      mostRead: true,
    },
  });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      importantPosts: JSON.parse(JSON.stringify(importantPosts)),
      topPost: JSON.parse(JSON.stringify(topPost)),
      mostRead: JSON.parse(JSON.stringify(mostRead)),
    },
  };
};
