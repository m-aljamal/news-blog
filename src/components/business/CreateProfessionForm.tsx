// import { yupResolver } from "@hookform/resolvers/yup";
// import React, { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { createSignature, uploadImage } from "../uploadImage";
// import * as yup from "yup";
// import ChoseImage from "../dashboard/postForm/ChoseImage";
// import Link from "next/link";
// import Map from "src/components/business/Map";
// import Head from "next/head";
// import axios from "axios";

// import SvgLoading from "../layout/SvgLoading";




// export default function CreateProfessionForm() {
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     getValues,
//     reset,
//   } = useForm<IProf>({
//     resolver: yupResolver(validationSchema),
//   });
//   const onSubmit = (data) => {
//     setLoading(true);
//     console.log(data);
//   };

//   return (
//     <>
//       <Head>
//         <link
//           href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
//           rel="stylesheet"
//         />
//       </Head>
//       <form onSubmit={handleSubmit(onSubmit)} className="mt-8 container">
//         <h2 className="title mb-8 border-b w-[fit-content] border-red-600 py-2">
//           تسجيل مهنة جديدة:
//         </h2>
//         <SectionContainer title="الاسم ونوع العمل">
//           <WorkAndPersonName register={register} />
//         </SectionContainer>

//         <SectionContainer title="شرح عن العمل">
//           <WorkDescription register={register} />
//         </SectionContainer>

//         <SectionContainer title="عنوان العمل">
//           <WorkAddress register={register} setValue={setValue} />
//         </SectionContainer>

//         <SectionContainer title="وسائل التواصل">
//           <SocialMedia register={register} />
//         </SectionContainer>

//         <SectionContainer title="صور العمل">
//           <ChooseImages register={register} setValue={setValue} />
//         </SectionContainer>
//         <div className="flex pb-8 justify-around">
//           <div className="bg-green-500 text-white px-10 py-1 rounded-md relative">
//             {loading && (
//               <SvgLoading style="text-white right-[85px] top-2 w-5 h-5" />
//             )}
//             <button type="submit" className="font-bold">
//               تسجيل
//             </button>
//           </div>
//           <button className="bg-red-500 font-bold text-white px-10 py-1 rounded-md">
//             الغاء
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }

// const Input = (props) => {
//   return (
//     <div className={` ${props.style}`}>
//       <p className="text-gray-600">{props.text}</p>
//       {props.type === "textaria" ? (
//         <textarea
//           disabled={props.disabled}
//           value={props.value}
//           onChange={props.onChange}
//           {...props.reg}
//           placeholder={props.holder}
//           className={`p-2 w-full text-gray-600 text-sm border outline mt-1 bg-gray-100 ${props.textAriaStyle}`}
//         />
//       ) : (
//         <input
//           id={props.id}
//           {...props.reg}
//           type={props.type}
//           placeholder={props.holder}
//           className={`p-2 w-full text-gray-500 text-sm border outline mt-1 bg-gray-100 ${props.inputStyle}`}
//         />
//       )}
//     </div>
//   );
// };

// const List = ({ title, fullAddress, onClick, coordinates }) => {
//   return (
//     <li
//       className="px-4 py-2 cursor-pointer hover:bg-gray-100 "
//       onClick={() => onClick({ fullAddress, coordinates })}
//     >
//       <h2 className="text-gray-800 font-bold text-sm">{title}</h2>
//       <p className="text-gray-400 text-sm">{fullAddress}</p>
//     </li>
//   );
// };

// const SectionContainer = ({ children, title }) => {
//   return (
//     <>
//       <div className="flex">
//         <h2 className="title ml-12">{title}</h2>
//         <div className="flex-grow ">{children}</div>
//       </div>
//       <hr className="my-10" />
//     </>
//   );
// };

// const WorkAndPersonName = ({ register }) => {
//   return (
//     <div className="grid grid-cols-3 gap-10">
//       <Input text="الاسم والكنية:" reg={register("name")} />
//       <Input text="اسم المحل أو الشركة:" reg={register("businessName")} />
//       <Input
//         text="نوع العمل:"
//         reg={register("businessType")}
//         holder="مثال: تجارة مواد غذائية"
//       />
//     </div>
//   );
// };

// const WorkDescription = ({ register }) => {
//   return (
//     <div className="grid grid-cols-2 gap-x-8 gap-y-4 ">
//       <Input
//         text="شرح عن الخدمات المقدمة:"
//         reg={register("jobDescription")}
//         holder="مثال: مبيع الخضراوات والفواكه بجميع انواعها"
//         type="textaria"
//       />
//       <Input
//         text="لمحة عن المحل او الشركة:"
//         reg={register("description")}
//         holder="مثال: تأسست الشركة عام 2015 وهي الان احد اقوى الشركات التجارية"
//         type="textaria"
//       />
//       <Input
//         text="سنوات الخبرة في العمل:"
//         reg={register("businessStart")}
//         holder="مثال: 5 سنوات"
//       />
//       <Input
//         text="عدد الموظفين:"
//         reg={register("NumberOfEmployees")}
//         type="number"
//       />
//     </div>
//   );
// };

// const WorkAddress = ({ register, setValue }) => {
//   const [userPlace, setUserPlace] = useState("");
//   const [coordinates, setCoordinates] = useState([35.2433, 38.9637]);
//   const [typeAddress, setTypeAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [autocomplete, setAutocomplete] = useState(null);
//   const [showAutocomplete, setShowAutocomplete] = useState(false);
//   const ref = useRef();
//   const handleCoordinates = async (e) => {
//     setLoading(true);
//     setUserPlace(e.target.value);
//     setTypeAddress(e.target.value);
//   };
//   const handleAutoComplete = (place) => {
//     setUserPlace(place.fullAddress);
//     setCoordinates(place.coordinates);
//     setShowAutocomplete(false);
//   };

//   useEffect(() => {
//     const time = setTimeout(async () => {
//       try {
//         if (typeAddress) {
//           const res = await axios.post("/api/profession/getcoordinates", {
//             address: typeAddress,
//           });
//           setLoading(false);
//           setAutocomplete(res.data);
//           setShowAutocomplete(true);
//         }
//       } catch (error) {
//         console.log(error);
//         setLoading(false);
//       }
//     }, 2000);
//     return () => clearTimeout(time);
//   }, [typeAddress]);

//   useEffect(() => {
//     const listener = (e) => {
//       if (!(ref.current! as any).contains(e.target)) {
//         setLoading(false);
//         setShowAutocomplete(false);
//       }
//     };
//     document.addEventListener("click", listener);
//     return () => {
//       document.removeEventListener("click", listener);
//     };
//   }, []);
//   setValue("address", userPlace);
  // return (
  //   <div className="grid grid-cols-2 gap-x-8 gap-y-4 ">
  //     <Input
  //       type="textaria"
  //       text="الدولة:"
  //       reg={register("country")}
  //       holder="مثال: تركيا"
  //     />
  //     <div>
  //       <div className="relative" ref={ref}>
  //         <div className="relative ">
  //           {loading && <SvgLoading />}
  //           <Input
  //             text="العنوان:"
  //             holder="الافضل كتابة العنوان حسب لغة الدولة"
  //             type="textaria"
  //             onChange={handleCoordinates}
  //             value={userPlace}
  //             textAriaStyle=""
  //           />
  //         </div>
  //         <ul className="absolute   z-50 shadow-md bg-white w-full rounded-md">
  //           {showAutocomplete &&
  //             autocomplete.map((l) => (
  //               <List
  //                 title={l.text}
  //                 fullAddress={l.place_name}
  //                 key={l.id}
  //                 onClick={handleAutoComplete}
  //                 coordinates={l.geometry.coordinates}
  //               />
  //             ))}
  //         </ul>
  //       </div>
  //     </div>
  //     <div className="rounded-lg shadow-md col-start-1 col-end-3">
  //       <Map title={"address"} coordinates={coordinates} />
  //     </div>
  //   </div>
  // );
};

// const SocialMedia = ({ register }) => {
//   return (
//     <div>
//       <div className="grid grid-cols-3 gap-x-8 gap-y-4 ">
//         <InputWithIcon icon="fas fa-phone text-blue">
//           <Input
//             reg={register("phone")}
//             holder="رقم الهاتف مثال: 009053975914266"
//             inputStyle="pr-9"
//           />
//         </InputWithIcon>
//         <InputWithIcon icon="fab fa-whatsapp text-green-600">
//           <Input
//             reg={register("whatsAppNumber")}
//             holder="رقم وتس اب مثال: 009053975914266"
//             inputStyle="pr-9"
//           />
//         </InputWithIcon>
//         <InputWithIcon icon="fab fa-facebook text-blue">
//           <Input
//             id="faceBook"
//             reg={register("faceBook")}
//             holder="رابط صفحة فيس بوك"
//             inputStyle="pr-9"
//           />
//         </InputWithIcon>
//         <InputWithIcon icon="fab fa-instagram text-pink-500">
//           <Input
//             reg={register("instagram")}
//             holder="رابط صفحة انستغرام"
//             inputStyle="pr-9"
//           />
//         </InputWithIcon>
//         <InputWithIcon icon="fab fa-youtube text-red-500 ">
//           <Input
//             reg={register("youtube")}
//             holder="رابط قناة يوتيوب"
//             inputStyle="pr-9"
//           />
//         </InputWithIcon>
//         <InputWithIcon icon="fas fa-globe text-green-500">
//           <Input
//             reg={register("website")}
//             holder="رابط الموقع الالكتروني"
//             inputStyle="pr-9"
//           />
//         </InputWithIcon>
//         <InputWithIcon icon="fas fa-envelope text-red-500 ">
//           <Input reg={register("email")} holder="الايميل" inputStyle="pr-9" />
//         </InputWithIcon>
//       </div>
//     </div>
//   );
// };

// const InputWithIcon = ({ children, icon }) => {
//   return (
//     <label htmlFor="faceBook" className="relative">
//       <i
//         className={` ${icon}  fa-lg absolute top-1/2 transform -translate-y-1/2 right-3`}
//       ></i>
//       {children}
//     </label>
//   );
// };

// const ChooseImages = ({ register, setValue }) => {
//   const [previewLogo, setPreviewLogo] = useState("");
//   const [previewImages, setPreviewImages] = useState([]);
//   setValue("logo", previewLogo);
//   setValue("images", previewImages);
//   return (
//     <div className="grid grid-cols-2 gap-10">
//       <div>
//         <ChoseImage
//           buttonText="اختيار لوغو"
//           error={null}
//           previewImage={previewLogo}
//           setPreviewImage={setPreviewLogo}
//         />
//       </div>
//       <div>
//         <ChoseImage
//           buttonText="اختيار صور عن العمل"
//           error={null}
//           previewImage={previewImages}
//           setPreviewImage={setPreviewImages}
//           multiple
//         />
//       </div>
//     </div>
//   );
// };
