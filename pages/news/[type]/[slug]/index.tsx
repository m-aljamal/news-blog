import React from "react";
import { prisma } from "src/prisma";
import NavBar from "src/components/navbar";

export default function index({ categories, post }) {
  console.log(post);

  return (
    <div>
      <NavBar categories={categories} />
      <div>
        <p>{post?.title}</p>
        <img src={post?.image} />
        {post.block.blocks.map((block) => (
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
    paragraph: <p className="text-red-800 my-4">{data.text}</p>,
    header: <h2>{data.text}</h2>,
    list: <List data={data} />,
    delimiter: <hr />,
    quote: <blockquote>{data.text}</blockquote>,
    code: <p className="bg-black text-white">{data.code}</p>,
    raw: <p className="bg-gray-600 text-red-50">{data.html}</p>,
    embed: (
      <div>
        <iframe
          width="560"
          height="315"
          src={data.embed}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    ),
  };

  return <div>{blockDataByType[type]}</div>;
};

const List = ({ data }) => {
  console.log("list is here", data);

  return (
    <ul className="ml-10 list-disc">
      {data?.items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
};
