import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { createSignature, uploadImage } from "../uploadImage";
import * as yup from "yup";

interface IProf {
  name: string;
  businessName: string;
  businessType: string;
  jobDescription: string;
  description: string;
  website: string;
  phone: string;
  address: string;
  country: string;
  email: string;
  images: string[];
  logo: string;
  businessStart: string;
  NumberOfEmployees: number;
  faceBook: string;
  instagram: string;
  youtube: string;
  whatsAppNumber: string;
}

export const validationSchema = yup.object().shape({});

export default function CreateProfessionForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IProf>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="container mt-8">
      <h2 className="title mb-4">تسجيل مهنة جديدة:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input text="الاسم والكنية:" reg={register("name")} />
          <Input text="اسم المحل أو الشركة:" reg={register("businessName")} />
          <Input
            text="نوع العمل:"
            reg={register("businessType")}
            holder="مثال: تجارة مواد غذائية"
          />
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
        </div>
        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
}

const Input = ({ text, reg, ...props }) => {
  return (
    <div className="my-4">
      <p className="title">{text}</p>
      {props.type === "textaria" ? (
        <textarea
          {...reg}
          placeholder={props.holder}
          className="p-2 w-1/2 text-gray-500 text-sm border outline mt-1"
        />
      ) : (
        <input
          {...reg}
          placeholder={props.holder}
          className="p-2 w-1/2 text-gray-500 text-sm border outline mt-1"
        />
      )}
    </div>
  );
};
