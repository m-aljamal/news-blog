import { useRouter } from "next/router";
import { ICats } from "pages";
import prisma from "src/prisma";
import Link from "next/link";
import NavBar from "src/components/navbar";
import Post from "src/components/post";
import Image from "next/image";
import LogoNav from "src/components/navbar/LogoNav";
import PostWithDescription from "src/components/post/PostWithDescription";
import ShowDate from "src/components/layout/ShowDate";
export default function index({ posts, categories }: ICats) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  const { type } = router.query;
  const firstPost = posts?.[0];
  const threePosts = posts?.slice(1, 4);
  const restOfPosts = posts?.slice(4);
  const link = `/news/${firstPost.categoryName}/${firstPost.slug}`;
  return (
    <div>
      <LogoNav />
      <NavBar categories={categories} />
      <div className="bg-gray-100 py-10">
        <div className="container  ">
          <h2 className="text-gray-800 text-2xl">{type}</h2>
          <div className="lg:flex justify-around gap-6 mt-8">
            <div className="lg:w-1/2 bg-white rounded-lg shadow-lg mb-4">
              <Link href={link}>
                <div className="relative h-96">
                  <Image
                    src={firstPost?.image}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg cursor-pointer "
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={link}>
                  <h2 className="heading hover:underline text-3xl text-gray-800">
                    {firstPost?.title}
                  </h2>
                </Link>
                <p className="postBody leading-loose text-xl mt-5">
                  {firstPost?.description}
                </p>
                <div className="mt-3">
                  <ShowDate date={firstPost.createdAt} />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              {threePosts?.map((post) => (
                <PostWithDescription
                  post={post}
                  key={post.id}
                  style="lg:mb-4 lg:my-0 my-10 "
                />
              ))}
            </div>
          </div>
          <div className="lg:mt-12">
            {restOfPosts?.map((post) => (
              <PostWithDescription post={post} key={post.id} style="my-10" />
            ))}
          </div>
        </div>
      </div>
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
    return {
      params: { type: m.categoryName },
    };
  });
  return {
    fallback: false,
    paths: ids,
  };
}
