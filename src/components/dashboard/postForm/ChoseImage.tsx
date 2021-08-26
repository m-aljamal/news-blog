import { ChangeEvent, useState } from "react";
import { PhotographIcon } from "@heroicons/react/solid";
import { createSignature, uploadImage } from "src/components/uploadImage";
import axios from "axios";
import LoadingSpinner from "src/components/layout/LoadingSpinner";
import SvgLoading from "src/components/layout/SvgLoading";
import Image from "next/image";
const ChoseImage = ({
  previewImage,
  buttonText,
  setPreviewImage,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  // const deleteLastImage = async () => {
  //   await axios.post("/api/cloudinary/delete", {
  //     imgId: "bkqqmxv3ueji9vkk8oap",
  //   });
  // };
  console.log(previewImage);

  return (
    <div className="  h-60 mx-auto mb-16">
      <div
        className={`bg-gray-100 h-full rounded-md ${
          props.error ? "ring ring-red-500" : ""
        }  `}
      >
        {loading && <LoadingSpinner />}
        {props.multiple && previewImage.length > 1 ? (
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-5 h-full">
            {previewImage.map((img) => (
              <Image
                key={img.public_id}
                width={100}
                height={100}
                src={img.secure_url}
                className="w-full h-full rounded-md object-cover"
              />
            ))}
          </div>
        ) : (
          previewImage.secure_url && (
            <img
              src={previewImage.secure_url}
              className="w-full h-full rounded-md object-cover"
            />
          )
        )}
      </div>
      <div className="mt-4 py-2 shadow-md    bg-gray-200 relative text-center rounded-md ">
        {loading && <SvgLoading style="top-2" />}
        <span>
          {buttonText}
          <PhotographIcon className="h-5 w-5 mr-3 inline-block text-blue" />
        </span>

        <input
          id="file"
          multiple={props.multiple}
          type="file"
          className="absolute top-0 right-0 opacity-0 w-full cursor-pointer "
          accept="image/*"
          disabled={loading}
          onChange={async (event: ChangeEvent<HTMLInputElement>) => {
            if (event?.target?.files?.[0]) {
              // if (previewImage.secure_url) {
              //   deleteLastImage();
              // }

              setPreviewImage({
                secure_url: "",
                public_id: "",
              });
              setLoading(true);
              const { signature, timestamp } = await createSignature();
              if (signature) {
                if (props.multiple) {
                  let imgs = [];
                  for (let i = 0; i < event?.target?.files.length; i++) {
                    const image = await uploadImage(
                      event?.target?.files[i],
                      signature,
                      timestamp
                    );
                    imgs.push({
                      secure_url: image.secure_url,
                      public_id: image.public_id,
                    });
                  }
                  setLoading(false);
                  setPreviewImage(imgs);
                } else {
                  const mainImage = await uploadImage(
                    event?.target?.files?.[0],
                    signature,
                    timestamp
                  );
                  setLoading(false);

                  setPreviewImage({
                    secure_url: mainImage.secure_url,
                    public_id: mainImage.public_id,
                  });
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChoseImage;
