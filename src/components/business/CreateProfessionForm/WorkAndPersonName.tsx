import Input from "./Input";
export default function WorkAndPersonName({ register }) {
  return (
    <div className="grid grid-cols-3 gap-10">
      <Input text="الاسم والكنية:" reg={register("name")} />
      <Input text="اسم المحل أو الشركة:" reg={register("businessName")} />
      <Input
        text="نوع العمل:"
        reg={register("businessType")}
        holder="مثال: تجارة مواد غذائية"
      />
    </div>
  );
}
