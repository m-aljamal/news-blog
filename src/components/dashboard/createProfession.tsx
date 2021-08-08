import { useForm } from "react-hook-form";
import { createSignature, uploadImage } from "../uploadImage";

interface IProf {
  name: string;
  businessName: string;
  businessType: string;
  website: string;
  phone: string;
  address: string;
  country: string;
  email: string;
  description: string;
  images: string[];
  logo: string;
  jobDescription: string;
  businessStart: string;
  NumberOfEmployees: number;
  faceBook: string;
  instagram: string;
  youtube: string;
  whatsAppNumber: string;
}

export default function createProfession() {
  const { register, handleSubmit } = useForm<IProf>({});
  const onSubmit = async (values) => {
    if (values.images.length > 5) {
      alert("only 5 images are alowed");
      return;
    }

    const { signature, timestamp } = await createSignature();

    if (signature) {
      let imgs = [];
      const imageLogo = await uploadImage(values.logo[0], signature, timestamp);
      for (let i = 0; i < values.images.length; i++) {
        const image = await uploadImage(values.images[i], signature, timestamp);
        imgs.push({ image: image.secure_url, public_id: image.public_id });
      }

      try {
        const res = await fetch("/api/profession/createNew", {
          method: "POST",
          body: JSON.stringify({
            ...values,
            images: imgs,
            logo: {
              image: imageLogo.secure_url,
              public_id: imageLogo.public_id,
            },
          }),
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <h2>Create new business</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p>الاسم والكنية</p>
          <input {...register("name")} className="border-2 border-black" />
        </div>
        <div>
          <p>نوع العمل</p>
          <input
            {...register("businessType")}
            className="border-2 border-black"
          />
        </div>
        <div>
          <p>اسم الشركة</p>
          <input
            {...register("businessName")}
            className="border-2 border-black"
          />
        </div>
        <div>
          <p>لوغو الشركة</p>
          <input type="file" accept="image/*" {...register("logo")} />
        </div>
        <div>
          <p>الموقع</p>
          <input {...register("website")} className="border-2 border-black" />
        </div>
        <div>
          <p>الهاتف</p>
          <input {...register("phone")} className="border-2 border-black" />
        </div>
        <div>
          <p>العنوان</p>
          <input {...register("address")} className="border-2 border-black" />
        </div>
        <div>
          <p>الدولة</p>
          <input {...register("country")} className="border-2 border-black" />
        </div>
        <div>
          <p>الايميل</p>
          <input {...register("email")} className="border-2 border-black" />
        </div>
        <div>
          <p>عدد الموظفين</p>
          <input
            type="number"
            {...register("NumberOfEmployees")}
            className="border-2 border-black"
          />
        </div>
        <div>
          <p>شرح عن الخدمات المقدمة</p>
          <input
            {...register("jobDescription")}
            className="border-2 border-black"
          />
        </div>
        <div>
          <p>منذ متى تعمل الشركة</p>
          <input
            placeholder="5 سنوات"
            {...register("businessStart")}
            className="border-2 border-black"
          />
        </div>
        <div>
          <p>لمحة عن الشركة</p>
          <textarea
            {...register("description")}
            className="border-2 border-black"
          />
        </div>
        <div>
          <p>صور عن مشاريع</p>
          <input
            id="image"
            type="file"
            accept="image/*"
            multiple
            {...register("images")}
          />
        </div>
        <div>
          <p>رابط فيس بوك</p>
          <input {...register("faceBook")} />
        </div>
        <div>
          <p>رابط انستغرام</p>
          <input {...register("instagram")} />
        </div>
        <div>
          <p>رابط يوتيوب</p>
          <input {...register("youtube")} />
        </div>
        <div>
          <p>رقم وتس اب</p>
          <input {...register("whatsAppNumber")} />
        </div>
        <button>save</button>
      </form>
    </div>
  );
}
