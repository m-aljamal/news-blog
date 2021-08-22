import { ChangeEvent, useState } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import { createSignature, uploadImage } from "src/components/uploadImage";
import { deleteImage } from "src/components/deleteImage";

const ChoseImage = ({ previewImage, setPreviewImage, ...props }) => {
  const [loading, setLoading] = useState(false);
  const deleteLastImage = async () => {
    const { signature, timestamp } = await createSignature();
    if (signature) {
      const deleteImg = await deleteImage(
        "yagbasmo0o22rxnu951g",
        signature,
        timestamp
      );
      console.log(deleteImg);
    }
  };
  return (
    <div className="  h-60 mx-auto mb-16">
      <div
        className={`bg-gray-100 h-full rounded-md  ${
          props.error ? "ring ring-red-500" : ""
        }  `}
      >
        {loading && (
          <div className="w-full h-full grid">
            <div className=" flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue"></div>
            </div>
          </div>
        )}

        {previewImage && (
          <img
            src={previewImage}
            className="w-full h-full rounded-md object-cover"
          />
        )}
      </div>
      <div className="mt-4 py-2 shadow-md    bg-gray-200 relative text-center rounded-md ">
        <span>
          اختيار الصورة
          <PhotographIcon className="h-5 w-5 mr-3 inline-block" />
        </span>

        <input
          id="file"
          type="file"
          className="absolute top-0 right-0 opacity-0 w-full cursor-pointer "
          accept="image/*"
          onChange={async (event: ChangeEvent<HTMLInputElement>) => {
            if (event?.target?.files?.[0]) {
              deleteLastImage();
              setPreviewImage("");
              setLoading(true);
              const { signature, timestamp } = await createSignature();
              if (signature) {
                const mainImage = await uploadImage(
                  event?.target?.files?.[0],
                  signature,
                  timestamp
                );
                setLoading(false);
                console.log(mainImage);

                setPreviewImage(mainImage.secure_url);
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChoseImage;
