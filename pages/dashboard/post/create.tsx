import Layout from "src/components/dashboard/layout";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { createSignature, uploadImage } from "src/components/uploadImage";
import prisma from "src/prisma";
import axios from "axios";
import Form from "src/components/dashboard/postForm/";
import toast, { Toaster } from "react-hot-toast";

export interface IFormData {
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
          toast.success("تم النشر بنجاح!");
          reset();
          setChosenCategory("");
          setTypeOfPost("");
          setPreviewImage("");
          await editor.current.clear();
        }
      } catch (error) {
        console.log(error.response);
        toast.error("خطأ لم يتم النشر", error.response);

        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <Toaster />

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
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await prisma.category.findMany();
  return {
    props: { categories },
  };
}
