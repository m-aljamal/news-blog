import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import SvgLoading from "src/components/layout/SvgLoading";
import SectionContainer from "./SectionContainer";
import WorkAndPersonName from "./WorkAndPersonName";
import WorkDescription from "./WorkDescription";
import WorkAddress from "./WorkAddress";
import ChooseImages from "./ChooseImages";
import SocialMedia from "./SocialMedia";
import toast, { Toaster } from "react-hot-toast";
import router from "next/router";
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
  images: Image[];
  logo: Image;
  businessStart: string;
  NumberOfEmployees: number;
  faceBook: string;
  instagram: string;
  youtube: string;
  whatsAppNumber: string;
  coordinates: [];
}
interface Image {
  public_id: string;
  secure_url: string;
}
export default function CreateProfessionForm() {
  const validationSchema = yup.object().shape({
    name: yup.string().required("الرجاء كتابة الاسم والكنية"),
    businessName: yup.string().required("الرجاء كتابة اسم الشركة "),
    businessType: yup.string().required("الرجاء كتابة نوع العمل "),
    description: yup.string().required("الرجاء ادخال لمحة عن الشركة"),
    jobDescription: yup.string().required("الرجاء ادخال شرح عن الشركة"),
    businessStart: yup.string().required("الرجاء ادخال سنوات الخبرة"),
    NumberOfEmployees: yup
      .number()
      .typeError("يجب ان يكون الرقم صفر او اكبر")
      .min(0, "يجب ان يكون الرقم صفر او اكبر")
      .required("الرجاء ادخال عدد الموظفين"),
    address: yup.string().required("الرجاء ادخل العنوان"),
    phone: yup.string().required("الرجاء ادخال رقم الهاتف"),
    whatsAppNumber: yup.string().required("الرجاء ادخال رقم الوتس اب"),
  });
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    reset,
    clearErrors,
  } = useForm<IProf>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/profession/createNew", data);
      if (res.status === 200) {
        toast(
          `
          يشرفنا انضمامك معنا في موقعنا، سوف تتم الإضافة خلال يومين عمل كحد أقصى أو سيتم التواصل معكم من أجل تعديل طلبكم.
          `,
          {
            duration: 10000,
            icon: "👏",
          }
        );
        setLoading(false);
        router.push("/profession");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ الرجاء التواصل معنا او اعادة المحاولة");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 container">
        <h2 className="title mb-8 border-b w-[fit-content] border-red-600 py-2">
          تسجيل مهنة جديدة:
        </h2>
        <SectionContainer title="الاسم ونوع العمل">
          <WorkAndPersonName
            register={register}
            errors={{
              name: errors.name?.message,
              businessName: errors.businessName?.message,
              businessType: errors.businessType?.message,
            }}
          />
        </SectionContainer>

        <SectionContainer title="شرح عن العمل">
          <WorkDescription
            register={register}
            errors={{
              description: errors.description?.message,
              jobDescription: errors.jobDescription?.message,
              businessStart: errors.businessStart?.message,
              NumberOfEmployees: errors.NumberOfEmployees?.message,
            }}
          />
        </SectionContainer>

        <SectionContainer title="عنوان العمل">
          <WorkAddress
            setValue={setValue}
            errors={errors.address?.message}
            clearErrors={clearErrors}
          />
        </SectionContainer>

        <SectionContainer title="وسائل التواصل">
          <SocialMedia
            register={register}
            errors={{
              phone: errors.phone?.message,
              whatsAppNumber: errors.phone?.message,
            }}
          />
        </SectionContainer>

        <SectionContainer title="صور العمل">
          <ChooseImages register={register} setValue={setValue} />
        </SectionContainer>
        <div className="flex pb-8 justify-around">
          <div className="bg-green-500 text-white px-10 py-1 rounded-md relative">
            {loading && (
              <SvgLoading style="text-white right-[88px] top-2 w-4 h-4" />
            )}
            <button type="submit" className="font-bold">
              تسجيل
            </button>
          </div>
          <Link href="/profession">
            <button className="bg-red-500 font-bold text-white px-10 py-1 rounded-md">
              الغاء
            </button>
          </Link>
        </div>
      </form>
    </>
  );
}
