import { ChangeEvent, useState } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import { createSignature, uploadImage } from "src/components/uploadImage";
import axios from "axios";

const ChoseImage = ({ previewImage, setPreviewImage, ...props }) => {
  const [loading, setLoading] = useState(false);
  const deleteLastImage = async () => {
    await axios.post("/api/cloudinary/delete", {
      imgId: "bkqqmxv3ueji9vkk8oap",
    });
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

        {previewImage.secure_url && (
          <img
            src={previewImage.secure_url}
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
              if (previewImage.secure_url) {
                deleteLastImage();
              }
              setPreviewImage({
                secure_url: "",
                public_id: "",
              });
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

                setPreviewImage({
                  secure_url: mainImage.secure_url,
                  public_id: mainImage.public_id,
                });
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChoseImage;
