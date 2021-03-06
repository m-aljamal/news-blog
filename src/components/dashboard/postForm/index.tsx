import React from "react";
import Drop from "src/components/layout/Drop";
import DescriptionSide from "./DescriptionSide";
import EditorSide from "./EditorSide";
import { CheckIcon } from "@heroicons/react/solid";
import ErrorMessageForm from "../layout/ErrorMessageForm";
import SvgLoading from "src/components/layout/SvgLoading";

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
  errors,
  ...props
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative "
      style={{ height: "100vh" }}
    >
      <div className=" shadow-md">
        <div className="flex justify-between p-4 ">
          <div className="w-4/5 ">
            <input
              {...register("title")}
              className={` ${
                errors.title?.message
                  ? " outline focus:ring-red-500 focus:ring-1"
                  : "outline"
              } title w-full text-lg
              `}
              placeholder="عنوان الخبر"
            />

            <ErrorMessageForm text={errors.title?.message} />
          </div>
          <Drop icon={<i className="fas fa-ellipsis-v text-pink-400"></i>}>
            {props.dropButtonItems}
          </Drop>
        </div>
      </div>
      <div className="mt-1 p-3 sm:flex gap-4">
        <DescriptionSide
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          register={register}
          categories={categories}
          ChosenCategory={ChosenCategory}
          setChosenCategory={setChosenCategory}
          typeOfPost={typeOfPost}
          setTypeOfPost={setTypeOfPost}
          errors={errors}
        />
        <EditorSide editor={editor} block={props.block} />
      </div>

      <div className=" sticky z-20   bottom-0 left-0 right-0 border-t px-4 bg-white ">
        <div className="my-2 flex justify-between items-center  ">
          <div
            className={`border px-8 cursor-pointer rounded-md ${
              props.loading
                ? "bg-gray-500 opacity-50"
                : "bg-green-500 opacity-100"
            }  text-white relative `}
          >
            <button
              type="submit"
              className="px-4 py-2 "
              disabled={props.loading}
            >
              نشر
            </button>
            <CheckIcon className="h-5 w-5 inline-block " />
            {props.loading && <SvgLoading style="top-2  " />}
          </div>
        </div>
      </div>
    </form>
  );
}
