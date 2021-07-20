import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRef } from "react";
const Editor = dynamic(() => import("src/components/Editor"), { ssr: false });

interface IFormData {
  title: string;
  image: string;
  description: string;
  slug: string;
  categoryName: string;
  topNews: boolean;
}
export default function dashboard() {
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
        }),
      });

      // reset();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
            <label htmlFor="image">image url</label>
            <input
              id="image"
              {...register("image")}
              className="border-2 border-black"
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
          <button type="submit" className="cursor-pointer mt-50">
            submit
          </button>
          <Editor editor={editor} />
        </form>
      </div>
      <p>content</p>
    </div>
  );
}
