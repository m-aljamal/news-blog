import { useRouter } from "next/router";
import { ICats } from "pages";
import prisma from "src/prisma";
import Link from "next/link";
import NavBar from "src/components/navbar";
import Post from "src/components/post";
import Image from "next/image";
import LogoNav from "src/components/navbar/LogoNav";
import PostWithDescription from "src/components/post/PostWithDescription";
export default function index({ posts, categories }: ICats) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  const { type } = router.query;
  const firstPost = posts?.[0];
  const threePosts = posts?.slice(1, 4);
  const restOfPosts = posts?.slice(4);

  return (
    <div>
      <LogoNav />
      <NavBar categories={categories} />
      <div className="bg-gray-100 py-10">
        <div className="container  ">
          <h2 onClick={() => router.back()} className="text-2xl cursor-pointer">
            {type}
          </h2>

          <div className="flex justify-around gap-6 mt-8">
            <div className="w-1/2 bg-white rounded-lg shadow-lg mb-4">
              <Link href={`/news/${firstPost.categoryName}/${firstPost.slug}`}>
                <div>
                  <Image
                    src={firstPost?.image}
                    layout="responsive"
                    width={650}
                    height={400}
                    className="rounded-t-lg cursor-pointer"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link
                  href={`/news/${firstPost.categoryName}/${firstPost.slug}`}
                >
                  <h2 className="heading hover:underline text-2xl text-gray-800">
                    {firstPost?.title}
                  </h2>
                </Link>
                <p className="postBody leading-loose text-xl mt-5">
                  {firstPost?.description}
                </p>
              </div>
            </div>
            <div className="w-1/2">
              {threePosts?.map((post) => (
                <PostWithDescription
                  post={post}
                  imageW={350}
                  imageH={450}
                  key={post.id}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            {restOfPosts?.map((post) => (
              <PostWithDescription
                post={post}
                imageW={350}
                imageH={250}
                key={post.id}
              />
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
