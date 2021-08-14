import Layout from "src/components/dashboard/layout";
import Drop from "src/components/shared/Drop";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { createSignature, uploadImage } from "src/components/uploadImage";
import prisma from "src/prisma";

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
export default function create({ categories }) {
  const editor = useRef(null);
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

  const onSubmit = async (data: IFormData) => {
    console.log(data);

    // const { signature, timestamp } = await createSignature();

    // if (signature) {
    //   const mainImage = await uploadImage(data.image[0], signature, timestamp);

    //   let block;
    //   if (editor.current) {
    //     block = await editor.current.save();
    //   }
    //   try {
    //     const res = await fetch("/api/posts/create", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         ...data,
    //         block,
    //         image: mainImage.secure_url,
    //       }),
    //     });
    //     // reset();
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" shadow-md">
          <div className="flex justify-between p-4">
            <input {...register("title")} className="outline title" />
            <div>
              <Drop icon={<i className="fas fa-ellipsis-v"></i>} />
            </div>
          </div>
        </div>
        <div className="mt-4 p-4">
          <div className="flex flex-wrap gap-4 mb-4">
            {categories?.map((cat) => (
              <Category name={cat.name} key={cat.id} set={setValue} />
            ))}
          </div>
          <div>
            <p className="text-gray-800 font-bold mb-2">شرح مختصر:</p>
            <textarea
              {...register("description")}
              className="border w-full outline p-2 text-gray-500"
              placeholder="شرح مختصر عن الخبر يجب ان لايزيد او ينقص عن 25 كلمة"
            />
          </div>
        </div>
        <button type="submit">s</button>
      </form>
    </Layout>
  );
}

const Category = ({ name, set }) => {
  return (
    <p
      className="bg-gray-100 rounded-md p-2 cursor-pointer opacity-40"
      onClick={() => {
        set("categoryName", name);
      }}
    >
      # {name}
    </p>
  );
};

export async function getStaticProps() {
  const categories = await prisma.category.findMany();
  return {
    props: { categories },
  };
}
