import Input from "./Input";
export default function WorkAndPersonName({ register, errors }) {
  return (
    <div className="grid md:grid-cols-3  grid-cols-1 gap-10">
      <Input
        text="الاسم والكنية:"
        reg={register("name")}
        errors={errors.name}
      />
      <Input
        text="اسم المحل أو الشركة:"
        reg={register("businessName")}
        errors={errors.businessName}
      />
      <Input
        text="نوع العمل:"
        reg={register("businessType")}
        holder="مثال: تجارة مواد غذائية"
        errors={errors.businessType}
      />
    </div>
  );
}
