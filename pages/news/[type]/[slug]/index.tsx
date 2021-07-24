import React from "react";
import { prisma } from "src/prisma";
import NavBar from "src/components/navbar";
import Paragraph from "src/components/block/Paragraph";
import List from "src/components/block/List";
import Iframe from "src/components/block/Iframe";
import Image from "src/components/block/Image";
import LinkBox from "src/components/block/LinkBox";
export default function index({ categories, post }) {
  console.log(post);

  return (
    <div>
      <NavBar categories={categories} />
      <div>
        <p>{post?.title}</p>
        <img src={post?.image} />
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
    fallback: false,
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
    image: <Image data={data} />,
    embed: <Iframe data={data} />,
    linkTool: <LinkBox data={data} />,
  };

  return <div>{blockDataByType[type]}</div>;
};
