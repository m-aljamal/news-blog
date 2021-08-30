import Layout from "src/components/dashboard/layout";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import prisma from "src/prisma";
import axios from "axios";
import Form from "src/components/dashboard/postForm/";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession } from "next-auth/client";

export const validationSchema = yup.object().shape({
  title: yup.string().required("الرجاء كتابة عنوان للبوست"),
  categoryName: yup.string().required("الرجاء اختيار تصنيف البوست"),
  description: yup.string().required("الرجاء كتابة شرح مختصر 25 كلمة"),
  slug: yup.string().required("الرجاء كتابة رابط للبوست"),
  // image: yup.object().required("الرجاء اختيار صورة للبوست"),
});

export interface IFormData {
  title: string;
  image: { secure_url: string; public_id: string };
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
  const [previewImage, setPreviewImage] = useState({
    secure_url: "",
    public_id: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
  });
  const editor = useRef(null);
  setValue("categoryName", ChosenCategory);
  setValue("image", previewImage);

  const onSubmit = async (data: IFormData, e) => {
    setLoading(true);

    let block;
    if (editor.current) {
      block = await editor.current.save();
    }
    try {
      const res = await axios.post("/api/posts/create", {
        ...data,
        block,
        [`${typeOfPost}`]: true,
      });
      if (res.statusText === "OK") {
        setLoading(false);
        toast.success("تم النشر بنجاح!");
        e.target.reset();
        setTypeOfPost("");
        setPreviewImage({
          secure_url: "",
          public_id: "",
        });
        setChosenCategory("");
        await editor.current.clear();
      }
    } catch (error) {
      console.log(error.response);
      toast.error("خطأ لم يتم النشر", error.response);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Toaster />
      <Form
        errors={errors}
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
  return {
    props: { categories },
  };
}
