import Input from "./Input";
export default function WorkDescription({ register, errors }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 ">
      <Input
        text="شرح عن الخدمات المقدمة:"
        reg={register("jobDescription")}
        holder="مثال: مبيع الخضراوات والفواكه بجميع انواعها"
        type="textaria"
        errors={errors.jobDescription}
      />
      <Input
        text="لمحة عن المحل او الشركة:"
        reg={register("description")}
        holder="مثال: تأسست الشركة عام 2015 وهي الان احد اقوى الشركات التجارية"
        type="textaria"
        errors={errors.description}
      />
      <Input
        text="سنوات الخبرة في العمل:"
        reg={register("businessStart")}
        holder="مثال: 5 سنوات"
        errors={errors.businessStart}
      />
      <Input
        text="عدد الموظفين:"
        reg={register("NumberOfEmployees")}
        type="number"
        errors={errors.NumberOfEmployees}
      />
    </div>
  );
}
