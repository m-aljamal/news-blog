import { useState } from "react";
import ChoseImage from "src/components/dashboard/postForm/ChoseImage";
const ChooseImages = ({ register, setValue }) => {
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  setValue("logo", previewLogo);
  setValue("images", previewImages);
  return (
    <div className="grid   md:grid-cols-2 gap-10">
      <div>
        <ChoseImage
          buttonText="اختيار لوغو"
          error={null}
          previewImage={previewLogo}
          setPreviewImage={setPreviewLogo}
        />
      </div>
      <div>
        <ChoseImage
          buttonText="اختيار صور عن العمل"
          error={null}
          previewImage={previewImages}
          setPreviewImage={setPreviewImages}
          multiple
        />
      </div>
    </div>
  );
};

export default ChooseImages;
