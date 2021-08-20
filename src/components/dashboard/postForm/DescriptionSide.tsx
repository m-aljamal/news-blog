import TagButton from "./TagButton";
import ChoseImage from "./ChoseImage";
const DescriptionSide = ({
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

export default DescriptionSide;
