import Input from "./Input";
export default function WorkDescription({ register }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 ">
      <Input
        text="شرح عن الخدمات المقدمة:"
        reg={register("jobDescription")}
        holder="مثال: مبيع الخضراوات والفواكه بجميع انواعها"
        type="textaria"
      />
      <Input
        text="لمحة عن المحل او الشركة:"
        reg={register("description")}
        holder="مثال: تأسست الشركة عام 2015 وهي الان احد اقوى الشركات التجارية"
        type="textaria"
      />
      <Input
        text="سنوات الخبرة في العمل:"
        reg={register("businessStart")}
        holder="مثال: 5 سنوات"
      />
      <Input
        text="عدد الموظفين:"
        reg={register("NumberOfEmployees")}
        type="number"
      />
    </div>
  );
}
