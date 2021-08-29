import prisma from "src/prisma";
import NavBar from "src/components/navbar";
import Paragraph from "src/components/block/Paragraph";
import List from "src/components/block/List";
import Iframe from "src/components/block/Iframe";
import BlogImage from "src/components/block/BlogImage";
import LinkBox from "src/components/block/LinkBox";
import Image from "next/image";
import Post from "src/components/post";
import Share from "src/components/post/Share";
import Head from "next/head";
import LogoNav from "src/components/navbar/LogoNav";
import { useRouter } from "next/router";
import Link from "next/link";
import ShowDate from "src/components/layout/ShowDate";

export default function index({ categories, post, relatedPosts }) {
  if (!post) {
    return <p>Loading</p>;
  }
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta
          property="og:image:secure_url"
          content="https://a2d9f143654e.ngrok.io/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fmohammadjamal%2Fimage%2Fupload%2Fv1627662526%2Fxtf39wum8tkmvix1cxit.webp&w=1920&q=75"
        />
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
      <div className="bg-gray-100 py-10 relative">
        <div className="container">
          <Link href={`/news/${router.query.type}`}>
            <a className="text-gray-500 text-xl hover:underline cursor-pointer">
              {router.query.type}
            </a>
          </Link>
          <div className="md:flex md:gap-8 mt-8">
            <div className="bg-white md:w-3/4 rounded-lg">
              <div className="p-6">
                <h2 className="heading cursor-default sm:text-3xl text-2xl mb-6">
                  {post?.title}
                </h2>
                <div className="sm:flex justify-between items-center">
                  <ShowDate date={post.createdAt} />
                  <Share
                    link={`${process.env.NEXT_PUBLIC_DOMAIN}/news/${post.categoryName}/${post.slug}`}
                  />
                </div>
              </div>
              <div className="relative h-[350px] md:h-[450px] xl:h-[500px]">
                <Image
                  src={post?.image.secure_url}
                  alt={post?.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                {post?.block?.blocks?.map((block) => (
                  <DataBlock
                    data={block.data}
                    type={block.type}
                    key={block.id}
                  />
                ))}
              </div>
            </div>
            <div className="md:w-1/4 ">
              <div className="sticky top-0 rounded-lg">
                <h2 className="p-4 text-blue text-xl">اقرأ ايضا</h2>
                <div className="flex justify-between gap-8 md:block">
                  {relatedPosts?.map((post) => (
                    <div className="my-4 w-1/2 md:w-auto" key={post.id}>
                      <Post post={post} key={post.id} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(ctx) {
  const categories = await prisma.category.findMany();
  const post = await prisma.post.findUnique({
    where: {
      slug: ctx.params.slug,
    },
    select: {
      title: true,
      block: true,
      id: true,
      createdAt: true,
      updatedAt: true,
      image: true,
      description: true,
      slug: true,
      categoryName: true,
    },
  });
  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryName: ctx.params.type,
      NOT: {
        slug: ctx.params.slug,
      },
    },
    take: 2,
  });
  return {
    props: {
      categories,
      post: JSON.parse(JSON.stringify(post)),
      relatedPosts: JSON.parse(JSON.stringify(relatedPosts)),
    },
  };
}

export async function getStaticPaths() {
  const posts = await prisma.post.findMany();
  const ids = posts.map((m) => {
    return {
      params: { type: m.categoryName, slug: m.slug },
    };
  });
  return {
    fallback: false,
    paths: ids,
  };
}

const DataBlock = ({ data, type }) => {
  const blockDataByType = {
    paragraph: <Paragraph data={data} />,
    header: <h2>{data.text}</h2>,
    list: <List data={data} />,
    delimiter: <hr className="my-4" />,
    quote: <blockquote>{data.text}</blockquote>,
    code: <p className="bg-black text-white">{data.code}</p>,
    raw: <p className="bg-gray-600 text-red-50">{data.html}</p>,
    image: <BlogImage data={data} />,
    embed: <Iframe data={data} />,
    linkTool: <LinkBox data={data} />,
  };

  return <div>{blockDataByType[type]}</div>;
};
