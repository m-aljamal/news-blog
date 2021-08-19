import Layout from "src/components/dashboard/layout";
import prisma from "src/prisma";
import Image from "next/image";
import { useState } from "react";
export default function posts({ posts }) {
  const [choosePost, setChoosePost] = useState({});

  return (
    <Layout>
      <div className="bg-gray-100 p-4">
        <div>Search</div>
        <div className="flex justify-between mt-8">
          <div className="bg-red-300">edit</div>
          <div className="w-96">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => setChoosePost(post)}
                className="bg-white flex mb-8  justify-between rounded-md hover:bg-gray-200"
              >
                <div className="w-1/2 p-2">
                  <p className="text-gray-400">{post.categoryName}</p>
                  <h2 className=" text-gray-800 mt-3 text-sm">{post.title}</h2>
                </div>
                <Image src={post.image} width={150} height={100} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
