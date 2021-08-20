import React from "react";
import Drop from "src/components/layout/Drop";
import DescriptionSide from "./DescriptionSide";
import EditorSide from "./EditorSide";
import { CheckIcon } from "@heroicons/react/solid";

export default function index({
  register,
  handleSubmit,
  onSubmit,
  setPreviewImage,
  previewImage,
  categories,
  ChosenCategory,
  setChosenCategory,
  typeOfPost,
  setTypeOfPost,
  editor,
}) {
  return (
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
        <DescriptionSide
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          register={register}
          categories={categories}
          ChosenCategory={ChosenCategory}
          setChosenCategory={setChosenCategory}
          typeOfPost={typeOfPost}
          setTypeOfPost={setTypeOfPost}
        />
        <EditorSide editor={editor} />
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
  );
}