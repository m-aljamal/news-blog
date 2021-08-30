import Layout from "src/components/dashboard/layout";
import prisma from "src/prisma";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IFormData, validationSchema } from "./post/create";
import { SearchIcon } from "@heroicons/react/solid";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MenuItem } from "src/components/layout/Drop";
import { TrashIcon } from "@heroicons/react/solid";
import Model from "src/components/layout/Model";
import dynamic from "next/dynamic";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession } from "next-auth/client";

const Form = dynamic(() => import("src/components/dashboard/postForm"));

export default function posts({ posts, categories }) {
  const [choosePost, setChoosePost] = useState({
    title: "",
    image: { secure_url: "", public_id: "" },
    description: "",
    slug: "",
    categoryName: "",
    topNews: false,
    mostRead: false,
    important: false,
    block: [],
    id: "",
  });
  const [postsData, setPostsData] = useState(posts);
  const [ChosenCategory, setChosenCategory] = useState("");
  const [typeOfPost, setTypeOfPost] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState({
    secure_url: "",
    public_id: "",
  });
  const [search, setSearch] = useState("");
  const [deleteModel, setDeletModel] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
    clearErrors,
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
  });
  setValue("categoryName", ChosenCategory);
  setValue("image", previewImage);
  const editor = useRef(null);

  const onSubmit = async (data: IFormData) => {
    setLoading(true);

    let block;
    if (editor.current) {
      block = await editor.current.save();
    }
    try {
      const res = await axios.put("/api/posts/update", {
        ...data,
        block,
        id: choosePost.id,
        [`${typeOfPost}`]: true,
      });

      if (res.status === 200) {
        const newArray = [...postsData];
        const index = newArray.findIndex((p) => p.id === res.data.id);
        newArray[index] = res.data;
        setPostsData(newArray);
        setLoading(false);
        toast.success("تم التعديل بنجاح!");
      }
    } catch (error) {
      console.log(error.response);
      toast.error("خطأ لم يتم التعديل", error.response);
      setLoading(false);
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
    clearErrors("title");
    clearErrors("categoryName");
    clearErrors("description");
    clearErrors("slug");
    clearErrors("image");
  }, [choosePost]);

  const findPostType = (post) => {
    const keys = Object.keys(post);

    return keys.filter((key) => post[key] === true)[0];
  };

  const handleConfirm = async (postId: string) => {
    try {
      const res = await axios.delete(`/api/posts/${postId}`);
      if (res.status === 200) {
        setPostsData(postsData.filter((post) => post.id !== res.data.id));
        setVisible(false);
        setDeletModel(false);
        toast.success("تم حذف البوست بنجاح!");
      } else {
        toast.error("خطأ في حذف البوست");
      }
    } catch (error) {
      toast.error("خطأ في حذف البوست");
    }
  };
  return (
    <Layout>
      <Toaster />
      <Model
        type="confirm"
        handleConfirm={() => handleConfirm(choosePost.id)}
        open={deleteModel}
        setOpen={setDeletModel}
        title="تأكيد الحذف"
        content={
          <div>
            <p className="text-red-400 mb-3">هل متأكد من حذف بوست:</p>
            <p>{choosePost.title}</p>
          </div>
        }
      />
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
            {postsData
              ?.filter((post) => post.title.includes(search))
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
                      src={post.image.secure_url}
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
                errors={errors}
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
                dropButtonItems={
                  <MenuItem
                    onClick={() => setDeletModel(true)}
                    text="حذف"
                    icon={<TrashIcon className="w-5 h-5 ml-1" />}
                  />
                }
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session.role !== "ADMINISTRATOR") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
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
