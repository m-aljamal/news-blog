import TagButton from "./TagButton";
import ChoseImage from "./ChoseImage";
import ErrorMessageForm from "../layout/ErrorMessageForm";
const DescriptionSide = ({
  categories,
  register,
  ChosenCategory,
  setChosenCategory,
  typeOfPost,
  setTypeOfPost,
  previewImage,
  setPreviewImage,
  errors,
}) => {
  const postType = ["topNews", "mostRead", "important"];

  return (
    <div
      className=" border sm:w-1/2 shadow-md p-4 overflow-y-auto "
      style={{ height: "calc(100vh - 160px)" }}
    >
      <div>
        <InputTitleWithError
          title="تصنيف البوست:"
          error={errors.categoryName?.message}
        />
        <div className="flex flex-wrap gap-4 my-2 ">
          {categories?.map((cat) => (
            <TagButton
              name={cat.name}
              key={cat.id}
              choose={ChosenCategory}
              setchoose={setChosenCategory}
            />
          ))}
        </div>
        <input
          placeholder="سياسة"
          className="border w-full outline p-2 text-gray-500"
          onChange={(e) => setChosenCategory(e.target.value)}
        />
      </div>

      <div className="mt-2">
        <InputTitleWithError
          title="شرح مختصر:"
          error={errors.description?.message}
        />
        <p className="formTitle"></p>
        <textarea
          {...register("description")}
          className={`border w-full ${
            errors.description?.message
              ? " outline focus:ring-red-500"
              : "outline"
          }  p-2 text-gray-500 text-sm`}
          placeholder="شرح مختصر عن الخبر يجب ان لايزيد او ينقص عن 25 كلمة"
        />
      </div>
      <div>
        <InputTitleWithError
          title="رابط البوست:"
          error={errors.slug?.message}
        />

        <input
          {...register("slug")}
          className={`border w-full ${
            errors.slug?.message ? " outline focus:ring-red-500" : "outline"
          } p-2 text-gray-500 text-sm`}
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
        <InputTitleWithError
          title="الصورة الرئيسية:"
          error={errors.image?.message}
        />
        <ChoseImage
          buttonText="اختيار صورة البوست"
          error={errors.image?.message}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        />
      </div>
    </div>
  );
};

export default DescriptionSide;

const InputTitleWithError = ({ error, title }) => {
  return (
    <div className="flex">
      <p className="formTitle">{title}</p>
      <ErrorMessageForm text={error} />
    </div>
  );
};
