import { ChangeEvent } from "react";
import { PhotographIcon } from "@heroicons/react/solid";

const ChoseImage = ({ reg, previewImage, setPreviewImage }) => {
  return (
    <div className="  h-60 mx-auto mb-4">
      <div className="bg-gray-100 h-full rounded-md">
        {previewImage && (
          <img
            src={previewImage}
            className="w-full h-full rounded-md object-cover"
          />
        )}
      </div>
      <div className="mt-4 py-2 shadow-md bg-gray-200 relative text-center rounded-md ">
        <span className=" ">
          اختيار الصورة
          <PhotographIcon className="h-5 w-5 mr-3 inline-block" />
        </span>

        <input
          id="file"
          type="file"
          className="absolute top-0 right-0 opacity-0 w-full cursor-pointer "
          accept="image/*"
          {...reg}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (event?.target?.files?.[0]) {
              const file = event.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setPreviewImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChoseImage;
