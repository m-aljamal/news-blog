import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import Map from "src/components/business/Map";
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
  const validationSchema = yup.object().shape({});
  const [loading, setLoading] = useState(false);
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
  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    toast(
      `سعيدين بأضافة عملك معنا 
      سوف تتم الاضافة كحد اقصى خلال يومين عمل
      او سيتم التواصل معكم اذا كان في تعديل في طلبكم
      `,
      {
        duration: 6000,
        icon: "👏",
      }
    );
    // try {
    //   const res = await axios.post("/api/profession/createNew", data);
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    // }
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
          <WorkAndPersonName register={register} />
        </SectionContainer>

        <SectionContainer title="شرح عن العمل">
          <WorkDescription register={register} />
        </SectionContainer>

        <SectionContainer title="عنوان العمل">
          <WorkAddress setValue={setValue} />
        </SectionContainer>

        <SectionContainer title="وسائل التواصل">
          <SocialMedia register={register} />
        </SectionContainer>

        <SectionContainer title="صور العمل">
          <ChooseImages register={register} setValue={setValue} />
        </SectionContainer>
        <div className="flex pb-8 justify-around">
          <div className="bg-green-500 text-white px-10 py-1 rounded-md relative">
            {loading && (
              <SvgLoading style="text-white right-[85px] top-2 w-5 h-5" />
            )}
            <button type="submit" className="font-bold">
              تسجيل
            </button>
          </div>
          <button className="bg-red-500 font-bold text-white px-10 py-1 rounded-md">
            الغاء
          </button>
        </div>
      </form>
    </>
  );
}
