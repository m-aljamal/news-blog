import { useRef } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { createSignature, uploadImage } from "../uploadImage";
const Editor = dynamic(() => import("src/components/Editor"), { ssr: false });
interface IFormData {
  title: string;
  image: FileList;
  description: string;
  slug: string;
  categoryName: string;
  topNews: boolean;
  mostRead: boolean;
}
interface IUploadImageResponse {
  secure_url: string;
}
export default function CreatePost() {
  const editor = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IFormData>({});

  const onSubmit = async (data: IFormData) => {
    const { signature, timestamp } = await createSignature();

    if (signature) {
      const mainImage = await uploadImage(data.image[0], signature, timestamp);

      let block;
      if (editor.current) {
        block = await editor.current.save();
      }
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            block,
            image: mainImage.secure_url,
          }),
        });
        // reset();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h2>create new post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">title</label>
          <input
            id="title"
            {...register("title")}
            className="border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="image">الصورة الرئيسية</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            {...register("image")}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="description">description</label>
          <textarea
            id="description"
            {...register("description")}
            className="border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="slug">slug</label>
          <input
            id="slug"
            {...register("slug")}
            className="border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="categoryName">categoryName</label>
          <input
            id="categoryName"
            {...register("categoryName")}
            className="border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="topNews">TopNews</label>
          <input
            type="checkbox"
            id="topNews"
            {...register("topNews")}
            className="border-2 border-black"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="topNews">Most Read</label>
          <input
            type="checkbox"
            id="mostRead"
            {...register("mostRead")}
            className="border-2 border-black"
          />
        </div>
        <button type="submit" className="cursor-pointer mt-50">
          submit
        </button>
        <Editor editor={editor} />
      </form>
    </div>
  );
}