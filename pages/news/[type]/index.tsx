import { useRouter } from "next/router";
import { ICats } from "pages";
import prisma from "src/prisma";
import Link from "next/link";
import NavBar from "src/components/navbar";
import Post from "src/components/post";
import Image from "next/image";
import LogoNav from "src/components/navbar/LogoNav";
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
          <h2 className="text-2xl">{type}</h2>
          <div className="flex justify-around gap-6 mt-8">
            <div className="w-1/2 bg-white rounded-lg shadow-lg mb-4">
              <Link href={`/news/${firstPost.categoryName}/${firstPost.slug}`}>
                <Image
                  src={firstPost?.image}
                  layout="responsive"
                  width={450}
                  height={300}
                  className="rounded-t-lg cursor-pointer"
                />
              </Link>
              <div className="p-4">
                <Link
                  href={`/news/${firstPost.categoryName}/${firstPost.slug}`}
                >
                  <h2 className="heading ">{firstPost?.title}</h2>
                </Link>
                <p className="postBody ">{firstPost?.description}</p>
              </div>
            </div>
            <div className="w-1/2">
              {threePosts?.map((post) => (
                <div
                  key={post.id}
                  className="flex justify-around gap-4 bg-white mb-4 rounded-lg"
                >
                  <div className="w-3/5 p-4">
                    <Link href={`/news/${post.categoryName}/${post.slug}`}>
                      <h2 className="heading">{post.title}</h2>
                    </Link>
                    <p className="postBody mt-4">{post.description}</p>
                  </div>
                  <div className="w-2/5">
                    <Link href={`/news/${post.categoryName}/${post.slug}`}>
                      <Image
                        src={post?.image}
                        layout="responsive"
                        objectFit="cover"
                        width={350}
                        height={450}
                        className="rounded-tl-lg rounded-bl-lg cursor-pointer"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4  mt-8">
            {restOfPosts?.map((post) => (
              <div key={post.id}>
                <Post post={post} />
              </div>
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
