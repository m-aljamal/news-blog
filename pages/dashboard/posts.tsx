import Layout from "src/components/dashboard/layout";
import prisma from "src/prisma";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IFormData } from "./post/create";
import Form from "src/components/dashboard/postForm";
export default function posts({ posts, categories }) {
  const [choosePost, setChoosePost] = useState({
    title: "",
    image: "",
    description: "",
    slug: "",
    categoryName: "",
    topNews: false,
    mostRead: false,
    important: false,
  });
  console.log(choosePost);

  const [ChosenCategory, setChosenCategory] = useState("");
  const [typeOfPost, setTypeOfPost] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IFormData>({
    defaultValues: {},
  });
  const editor = useRef(null);
  const onSubmit = async (data: IFormData) => {
    console.log(data);
  };

  useEffect(() => {
    setValue("title", choosePost.title);
    setValue("description", choosePost.description);
    setValue("slug", choosePost.slug);
    //  find the type of object true
    setPreviewImage(choosePost.image);
    setChosenCategory(choosePost.categoryName);
  }, [choosePost]);

  return (
    <Layout>
      <div className=" p-4 ">
        <div>
          <input placeholder="بحث عن بوست" />
        </div>
        <div className="flex justify-between mt-8 gap-8 relative">
          <div className="w-96">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setVisible(true);
                  setChoosePost(post);
                }}
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
          <div className="w-full sticky top-0 rounded-lg h-[fit-content]">
            {visible && (
              <Form
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                setPreviewImage={setPreviewImage}
                previewImage={previewImage}
                categories={categories}
                ChosenCategory={ChosenCategory}
                setChosenCategory={setChosenCategory}
                typeOfPost={typeOfPost}
                setTypeOfPost={setTypeOfPost}
                editor={editor}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await prisma.category.findMany();

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)), categories },
  };
}
