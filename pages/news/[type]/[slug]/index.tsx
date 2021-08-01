import React from "react";
import prisma from "src/prisma";
import NavBar from "src/components/navbar";
import Paragraph from "src/components/block/Paragraph";
import List from "src/components/block/List";
import Iframe from "src/components/block/Iframe";
import BlogImage from "src/components/block/BlogImage";
import LinkBox from "src/components/block/LinkBox";
import Image from "next/image";
export default function index({ categories, post }) {
  if (!post) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <NavBar categories={categories} />
      <div>
        <p>{post?.title}</p>
        <Image src={post?.image} width={800} height={500} alt={post?.title} />

        {post?.block?.blocks?.map((block) => (
          <DataBlock data={block.data} type={block.type} key={block.id} />
        ))}
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

  return {
    props: { categories, post: JSON.parse(JSON.stringify(post)) },
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
    fallback: true,
    paths: ids,
  };
}

const DataBlock = ({ data, type }) => {
  const blockDataByType = {
    paragraph: <Paragraph data={data} />,
    header: <h2>{data.text}</h2>,
    list: <List data={data} />,
    delimiter: <hr />,
    quote: <blockquote>{data.text}</blockquote>,
    code: <p className="bg-black text-white">{data.code}</p>,
    raw: <p className="bg-gray-600 text-red-50">{data.html}</p>,
    image: <BlogImage data={data} />,
    embed: <Iframe data={data} />,
    linkTool: <LinkBox data={data} />,
  };

  return <div>{blockDataByType[type]}</div>;
};
