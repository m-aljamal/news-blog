import Layout from "src/components/dashboard/layout";
import prisma from "src/prisma";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IFormData } from "./post/create";
import Form from "src/components/dashboard/postForm";
import { SearchIcon } from "@heroicons/react/solid";
import axios from "axios";
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
    block: [],
    id: "",
  });

  const [ChosenCategory, setChosenCategory] = useState("");
  const [typeOfPost, setTypeOfPost] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  const [search, setSearch] = useState("");
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
    if (data.image.length) {
      console.log("find image");
    }

    let block;
    if (editor.current) {
      block = await editor.current.save();
    }
    try {
      const res = await axios.put("/api/posts/update", {
        ...data,
        block,

        id: choosePost.id,

        image: choosePost.image,
        [`${typeOfPost}`]: true,

        categoryName: ChosenCategory,
      });

      // if (res.statusText === "OK") {
      //   setLoading(false);
      //   setMessage("تم النشر بنجاح");
      //   reset();
      //   setChosenCategory("");
      //   setTypeOfPost("");
      //   setPreviewImage("");
      //   await editor.current.clear();
      // }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setMessage("خطأ لم يتم النشر");
    }
  };

  useEffect(() => {
    setValue("title", choosePost.title);
    setValue("description", choosePost.description);
    setValue("slug", choosePost.slug);
    setTypeOfPost(findPostType(choosePost));
    findPostType(choosePost);
    setPreviewImage(choosePost.image);
    setChosenCategory(choosePost.categoryName);
  }, [choosePost]);

  const findPostType = (post) => {
    const keys = Object.keys(post);

    return keys.filter((key) => post[key] === true)[0];
  };

  return (
    <Layout>
      <div className=" p-4">
        <div className="flex justify-between   gap-8 relative">
          <div className={`${visible && "w-1/2"} `}>
            {/* Search for posts */}
            <div className="border flex px-2 py-1 rounded-lg mb-8">
              <input
                className="w-full outline-none text-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className="h-5 w-5  text-pink-400" />
            </div>
            {posts
              .filter((post) => post.title.includes(search))
              .map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setVisible(true);
                    setChoosePost(post);
                  }}
                  className={`${
                    choosePost.id === post.id
                      ? "bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-300 "
                  }  text-white flex mb-8  justify-between rounded-md shadow-md
                `}
                >
                  <div className="sm:w-3/4 p-2 ">
                    <p className="text-white text-sm bg-blue w-[fit-content] p-1">
                      {post.categoryName}
                    </p>
                    <h2
                      className={` ${
                        choosePost.id === post.id
                          ? "text-white"
                          : "text-gray-800"
                      }   mt-3 text-base`}
                    >
                      {post.title}
                    </h2>
                  </div>
                  <div className="w-1/4 relative hidden sm:inline-block">
                    <Image
                      src={post.image}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-tl-md rounded-bl-md"
                    />
                  </div>
                </div>
              ))}
          </div>
          <div
            // h-[fit-content]
            className={`w-full sticky top-5 rounded-lg overflow-auto h-[fit-content] ${
              visible && "border"
            }`}
          >
            {visible && (
              <Form
                block={choosePost.block}
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
      topNews: true,
      mostRead: true,
      important: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)), categories },
  };
}
