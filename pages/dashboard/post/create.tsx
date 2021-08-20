import Layout from "src/components/dashboard/layout";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { createSignature, uploadImage } from "src/components/uploadImage";
import prisma from "src/prisma";
import axios from "axios";
import Form from "src/components/dashboard/postForm/";
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
