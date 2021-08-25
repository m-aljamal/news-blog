import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
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
  const [userPlace, setUserPlace] = useState("");
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [typeAddress, setTypeAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const ref = useRef();
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
    setUserPlace(e.target.value);
    setTypeAddress(e.target.value);
  };

  useEffect(() => {
    const time = setTimeout(async () => {
      try {
        if (typeAddress) {
          const res = await axios.post("/api/profession/getcoordinates", {
            address: typeAddress,
          });

          setAutocomplete(res.data);
          setShowAutocomplete(true);
          // setCoordinates(res.data.coordinates);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, 2000);
    return () => clearTimeout(time);
  }, [typeAddress]);

  const handleAutoComplete = (place) => {
    setUserPlace(place.fullAddress);
    setCoordinates(place.coordinates);
    setShowAutocomplete(false);
  };

  useEffect(() => {
    const listener = (e) => {
      if (!(ref.current! as any).contains(e.target)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);
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
                <div className="">
                  <Input
                    text="العنوان:"
                    reg={register("country")}
                    holder="الدولة"
                  />
                  <div className="relative" ref={ref}>
                    <Input
                      holder="الافضل كتابة العنوان حسب لغة الدولة"
                      type="textaria"
                      onChange={handleCoordinates}
                      style="my-0"
                      value={userPlace}
                    />
                    <ul className="absolute   z-50 shadow-md bg-white w-full rounded-md">
                      {/* <List title="kilis" fullAddress="Kilis, Turkey" />
                      <List title="gaz" fullAddress="Kilis, Hastani yol" /> */}
                      {showAutocomplete &&
                        autocomplete.map((l) => (
                          <List
                            title={l.text}
                            fullAddress={l.place_name}
                            key={l.id}
                            onClick={handleAutoComplete}
                            coordinates={l.geometry.coordinates}
                          />
                        ))}
                    </ul>
                  </div>
                  <div className="rounded-lg shadow-md">
                    <Map title={"address"} coordinates={coordinates} />
                  </div>
                </div>
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
    <div className={`my-4 ${props.style}`}>
      <p className="title">{props.text}</p>
      {props.type === "textaria" ? (
        <textarea
          value={props.value}
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
          className="p-2 w-full text-gray-500 text-sm border outline mt-1 bg-gray-100"
        />
      )}
    </div>
  );
};

const List = ({ title, fullAddress, onClick, coordinates }) => {
  return (
    <li
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
      onClick={() => onClick({ fullAddress, coordinates })}
    >
      <h2 className="text-gray-800 font-bold">{title}</h2>
      <p className="text-gray-400 ">{fullAddress}</p>
    </li>
  );
};
