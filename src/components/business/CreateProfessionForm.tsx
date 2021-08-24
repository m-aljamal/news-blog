import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createSignature, uploadImage } from "../uploadImage";
import * as yup from "yup";
import ChoseImage from "../dashboard/postForm/ChoseImage";
import Link from "next/link";
import Map from "src/components/business/Map";
import Head from "next/head";
import axios from "axios";
import LoadingSpinner from "../layout/LoadingSpinner";

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
  const [chosenLogo, setChosenLogo] = useState("");
  const [coordinates, setCoordinates] = useState([34.1938487, 40.0189354]);
  const [typeAddress, setTypeAddress] = useState("");
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
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleCoordinates = async (e) => {
    setLoading(true);
    setTypeAddress(e.target.value);
  };

  useEffect(() => {
    const time = setTimeout(async () => {
      try {
        if (typeAddress) {
          const res = await axios.post("/api/profession/getcoordinates", {
            address: typeAddress,
          });
          setLoading(false);
          console.log(res);
          // setCoordinates(res.data.coordinates);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, 3000);
    return () => clearTimeout(time);
  }, [typeAddress]);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className=" mt-8 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <h2 className="title mb-4">تسجيل مهنة جديدة:</h2>
            <div className="sm:flex sm:gap-8  ">
              <div className="sm:w-1/2">
                <Input text="الاسم والكنية:" reg={register("name")} />
                <Input
                  text="اسم المحل أو الشركة:"
                  reg={register("businessName")}
                />
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
              <div className="sm:w-1/2">
                <div>
                  <Input
                    text="وسائل التواصل:"
                    reg={register("phone")}
                    holder="رقم الهاتف مثال: 009053975914266"
                  />
                  <Input
                    reg={register("whatsAppNumber")}
                    holder="رقم وتس اب مثال: 009053975914266"
                  />
                  <Input
                    reg={register("faceBook")}
                    holder="رابط صفحة فيس بوك"
                  />
                  <Input
                    reg={register("instagram")}
                    holder="رابط صفحة انستغرام"
                  />
                  <Input reg={register("youtube")} holder="رابط قناة يوتيوب" />
                  <Input
                    reg={register("website")}
                    holder="رابط الموقع الشخصي"
                  />
                  <Input reg={register("email")} holder="الايميل الشخصي" />
                </div>
                <div className="">
                  <Input
                    text="العنوان:"
                    reg={register("country")}
                    holder="الدولة"
                  />
                  <Input
                    holder="الافضل كتابة العنوان حسب لغة الدولة"
                    type="textaria"
                    onChange={handleCoordinates}
                  />
                  <div className="rounded-lg shadow-md">
                    {loading ? (
                      <div className="w-full h-72 bg-gray-200">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      <Map title={"address"} coordinates={coordinates} />
                    )}
                  </div>
                </div>
                {/* <div>
                <p className="title">اختيار اللوغو:</p>
                <ChoseImage
                  error={null}
                  previewImage={chosenLogo}
                  setPreviewImage={setChosenLogo}
                />
              </div> */}
              </div>
            </div>
          </div>
          <div className="bg-white border sticky bottom-0 py-2 z-20">
            <div className="flex justify-around text-white">
              <button
                type="submit"
                className="border px-3 py-1 bg-blue rounded-md w-32"
              >
                تسجيل
              </button>
              <Link href="/profession">
                <button
                  type="button"
                  className="border px-3 py-1 bg-red-500 rounded-md w-32"
                >
                  الغاء
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

const Input = (props) => {
  return (
    <div className="my-4">
      <p className="title">{props.text}</p>
      {props.type === "textaria" ? (
        <textarea
          onChange={props.onChange}
          {...props.reg}
          placeholder={props.holder}
          className="p-2 w-full text-gray-500 text-sm border outline mt-1"
        />
      ) : (
        <input
          {...props.reg}
          type={props.type}
          placeholder={props.holder}
          className="p-2 w-full text-gray-500 text-sm border outline mt-1"
        />
      )}
    </div>
  );
};
