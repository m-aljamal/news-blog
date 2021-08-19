import Layout from "src/components/dashboard/layout";
import Drop from "src/components/layout/Drop";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { createSignature, uploadImage } from "src/components/uploadImage";
import prisma from "src/prisma";
import { PhotographIcon, CheckIcon, RewindIcon } from "@heroicons/react/solid";
import dynamic from "next/dynamic";
import axios from "axios";
const Editor = dynamic(() => import("src/components/Editor"), { ssr: false });

interface IFormData {
  title: string;
  image: FileList;
  description: string;
  slug: string;
  categoryName: string;
  topNews: boolean;
  mostRead: boolean;
  important: boolean;
}

export default function create({ categories }) {
  const [ChosenCategory, setChosenCategory] = useState("");
  const [typeOfPost, setTypeOfPost] = useState("");
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>();
  useEffect(() => {
    if (!message) {
      setVisible(false);
      setMessage("");
      return;
    }
    setVisible(true);
    const time = setTimeout(() => {
      setVisible(false);
      setMessage("");
    }, 5000);
    return () => clearTimeout(time);
  }, [message]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IFormData>({
    defaultValues: {
      title: "عنوان الخبر",
    },
  });
  const editor = useRef(null);

  const onSubmit = async (data: IFormData) => {
    setLoading(true);
    const { signature, timestamp } = await createSignature();
    if (signature) {
      const mainImage = await uploadImage(data.image[0], signature, timestamp);
      let block;
      if (editor.current) {
        block = await editor.current.save();
      }
      try {
        const res = await axios.post("/api/posts/create", {
          ...data,
          block,
          image: mainImage.secure_url,
          [`${typeOfPost}`]: true,
          categoryName: ChosenCategory,
        });

        if (res.statusText === "OK") {
          setLoading(false);
          setMessage("تم النشر بنجاح");
          reset();
          setChosenCategory("");
          setTypeOfPost("");
          setPreviewImage("");
          await editor.current.clear();
        }
      } catch (error) {
        console.log(error.response);
        setLoading(false);
        setMessage("خطأ لم يتم النشر");
      }
    }
  };

  return (
    <Layout>
      {visible && (
        <div className=" absolute top-2 bg-gray-200 left-1/2 p-4 z-40">
          {message}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative "
        style={{ height: "100vh" }}
      >
        <div className=" shadow-md">
          <div className="flex justify-between p-4 ">
            <input {...register("title")} className="outline title w-1/2" />
            <Drop icon={<i className="fas fa-ellipsis-v text-pink-400"></i>} />
          </div>
        </div>
        <div className="mt-4 p-4 sm:flex gap-4">
          <RightSide
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            register={register}
            categories={categories}
            ChosenCategory={ChosenCategory}
            setChosenCategory={setChosenCategory}
            typeOfPost={typeOfPost}
            setTypeOfPost={setTypeOfPost}
          />
          <LeftSide editor={editor} />
        </div>

        <div className=" sticky bottom-0 left-0 right-0 border-t px-4 bg-white ">
          <div className="my-2 flex justify-between items-center">
            <div className="border   cursor-pointer rounded-md bg-green-500 text-white">
              <button type="submit" className="px-4 py-2 ">
                نشر
              </button>
              <CheckIcon className="h-5 w-5 inline-block" />
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}


const PostForm = () =>{
  return(
    <form>

    </form>
  )
}


const TagButton = ({ name, choose, setchoose }) => {
  return (
    <button
      type="button"
      className={`bg-gray-100 rounded-md p-2 cursor-pointer ${
        choose !== name ? "opacity-40" : "opacity-100"
      }`}
      onClick={() => {
        if (choose === name) {
          setchoose("");
        }
        if (!choose || (choose && choose !== name)) {
          setchoose(name);
        }
      }}
    >
      # {name}
    </button>
  );
};

const ChoseImage = ({ reg, previewImage, setPreviewImage }) => {
  return (
    <div className="  h-60 mx-auto mb-4">
      <div className="bg-gray-100 h-full rounded-md">
        {previewImage && (
          <img
            src={previewImage}
            className="w-full h-full rounded-md object-cover"
          />
        )}
      </div>
      <div className="mt-4 py-2 shadow-md bg-gray-200 relative text-center rounded-md ">
        <span className=" ">
          اختيار الصورة
          <PhotographIcon className="h-5 w-5 mr-3 inline-block" />
        </span>

        <input
          id="file"
          type="file"
          className="absolute top-0 right-0 opacity-0 w-full cursor-pointer "
          accept="image/*"
          {...reg}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (event?.target?.files?.[0]) {
              const file = event.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviewImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const categories = await prisma.category.findMany();
  return {
    props: { categories },
  };
}

const LeftSide = ({ editor }) => {
  return (
    <div
      className=" border  mt-4 sm:mt-0 sm:w-1/2   shadow-md p-3 overflow-y-auto overflow-x-auto"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <Editor editor={editor} />
    </div>
  );
};

const RightSide = ({
  categories,
  register,
  ChosenCategory,
  setChosenCategory,
  typeOfPost,
  setTypeOfPost,
  previewImage,
  setPreviewImage,
}) => {
  const postType = ["topNews", "mostRead", "important"];

  return (
    <div
      className=" border sm:w-1/2 shadow-md p-4 overflow-y-auto "
      style={{ height: "calc(100vh - 160px)" }}
    >
      <input
        placeholder="التصنيف"
        className="border w-full outline p-2 text-gray-500"
        onChange={(e) => setChosenCategory(e.target.value)}
      />
      <div className="flex flex-wrap gap-4 my-4">
        {categories?.map((cat) => (
          <TagButton
            name={cat.name}
            key={cat.id}
            choose={ChosenCategory}
            setchoose={setChosenCategory}
          />
        ))}
      </div>
      <div>
        <p className="formTitle">شرح مختصر:</p>
        <textarea
          {...register("description")}
          className="border w-full outline p-2 text-gray-500"
          placeholder="شرح مختصر عن الخبر يجب ان لايزيد او ينقص عن 25 كلمة"
        />
      </div>
      <div>
        <p className="formTitle">رابط البوست:</p>
        <input
          {...register("slug")}
          className="border w-full outline p-2 text-gray-500"
          placeholder="حل-مشكلة-البطالة"
        />
      </div>
      <div className="mt-4">
        <p className="formTitle">تصنيف البوست:</p>
        <div className="flex flex-wrap gap-4 mb-4">
          {postType?.map((t) => (
            <TagButton
              name={t}
              choose={typeOfPost}
              setchoose={setTypeOfPost}
              key={t}
            />
          ))}
        </div>
      </div>
      <div className="mt-4  ">
        <p className="formTitle">الصورة الرئيسية:</p>
        <ChoseImage
          reg={{ ...register("image") }}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      </div>
    </div>
  );
};
