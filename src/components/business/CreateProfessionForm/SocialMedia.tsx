import Input from "./Input";
import InputWithIcon from "./InputWithIcon";
const SocialMedia = ({ register, errors }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 ">
        <InputWithIcon
          icon={`fas fa-phone text-blue ${errors.phone && "-translate-y-4"}`}
        >
          <Input
            reg={register("phone")}
            holder="رقم الهاتف مثال: 009053975914266"
            inputStyle="pr-9"
            errors={errors.phone}
          />
        </InputWithIcon>
        <InputWithIcon
          icon={`fab fa-whatsapp text-green-600 ${
            errors.whatsAppNumber && "-translate-y-4"
          }`}
        >
          <Input
            reg={register("whatsAppNumber")}
            holder="رقم وتس اب مثال: 009053975914266"
            inputStyle="pr-9"
            errors={errors.whatsAppNumber}
          />
        </InputWithIcon>
        <InputWithIcon
          icon={`fab fa-facebook text-blue ${
            errors.whatsAppNumber && "-translate-y-4"
          }`}
        >
          <Input
            id="faceBook"
            reg={register("faceBook")}
            holder="رابط صفحة فيس بوك"
            inputStyle="pr-9"
          />
        </InputWithIcon>
        <InputWithIcon icon="fab fa-instagram text-pink-500">
          <Input
            reg={register("instagram")}
            holder="رابط صفحة انستغرام"
            inputStyle="pr-9"
          />
        </InputWithIcon>
        <InputWithIcon icon="fab fa-youtube text-red-500 ">
          <Input
            reg={register("youtube")}
            holder="رابط قناة يوتيوب"
            inputStyle="pr-9"
          />
        </InputWithIcon>
        <InputWithIcon icon="fas fa-globe text-green-500">
          <Input
            reg={register("website")}
            holder="رابط الموقع الالكتروني"
            inputStyle="pr-9"
          />
        </InputWithIcon>
        <InputWithIcon icon="fas fa-envelope text-red-500 ">
          <Input reg={register("email")} holder="الايميل" inputStyle="pr-9" />
        </InputWithIcon>
      </div>
    </div>
  );
};

export default SocialMedia;
