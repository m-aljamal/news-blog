import prisma from "src/prisma";
import { useEffect, useState } from "react";
import Select from "src/components/Select";
import router from "next/router";
import LogoNav from "src/components/navbar/LogoNav";
import NavBar from "src/components/navbar/index";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Input from "src/components/business/CreateProfessionForm/Input";
import InputWithIcon from "src/components/business/CreateProfessionForm/InputWithIcon";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";
interface IProf {
  profession: string;
  country: string;
  name: string;
  whatsAppNumber: string;
}
export default function profession({ countries, businessType, categories }) {
  const { data, error } = useSWR("/api/profession/find", {
    initialData: {
      businessType,
      countries,
    },
  });

  const [prof, setProf] = useState("اختيار المهنة");
  const [country, setCountry] = useState("اختر البلد");
  const validationSchema = yup.object().shape({
    name: yup.string().required("الرجاء اكتب الاسم والكنية"),
    whatsAppNumber: yup.string().required("الرجاء اكتب رقم وتس اب"),
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<IProf>({
    resolver: yupResolver(validationSchema),
  });
  const handleSerch = () => {
    router.push(
      {
        pathname: "/profession/find",
        query: { prof, country },
      },
      undefined,
      { shallow: true }
    );
  };
  const filtetBusiness = (country) => {
    return data?.businessType?.filter((b) => b.country === country);
  };

  useEffect(() => {
    if (prof !== "اختيار المهنة" && country !== "اختر البلد") {
      handleSerch();
    }
  }, [prof]);
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/profession/helprequest", data);

      if (res.status === 200) {
        toast.success(
          "شكرا لطلبكم الانضمام معنا, سيتم التواصل معكم في مدة اقصاها يوميان",
          {
            duration: 6000,
            icon: "👏",
          }
        );
      }
    } catch (error) {
      toast.error("يوجد خطأ الرجاء اعادة المحاولة");
      console.error(error);
    }
  };
  return (
    <>
      <LogoNav />
      <NavBar categories={categories} />

      <div className="container">
        <h2 className="title my-6 py-2 border-b w-[fit-content] border-red-500">
          ابحث عن محترفين محليين
        </h2>
        <Toaster />
        <SerchForm
          countries={data?.countries}
          country={country}
          setCountry={setCountry}
          filtetBusiness={filtetBusiness}
          prof={prof}
          setProf={setProf}
        />

        <div className="mt-16">
          <h2 className="title  title my-6 py-2 border-b w-[fit-content] border-red-500">
            سجل مهنتك مجاناً
          </h2>

          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:flex">
              <h2 className="ml-8 title mb-4 sm:mb-0">مساعدة في التسجيل</h2>
              <div className="flex-1">
                <div className="grid md:grid-cols-2 md:gap-8 gap-2 ">
                  <Input
                    text="الاسم والكنية"
                    reg={register("name")}
                    errors={errors.name?.message}
                  />
                  <InputWithIcon
                    icon={`fab fa-whatsapp text-green-600 translate-y-2 ${
                      errors.whatsAppNumber && "-translate-y-2"
                    }`}
                  >
                    <Input
                      text="رقم الهاتف"
                      reg={register("whatsAppNumber")}
                      holder="رقم وتس اب مثال: 009053975914266"
                      inputStyle="pr-9"
                      errors={errors.whatsAppNumber?.message}
                    />
                  </InputWithIcon>
                </div>
                <div>
                  <button
                    type="submit"
                    className="rounded-lg w-full mt-4 border px-8 py-1 text-white bg-blue"
                  >
                    ارسل
                  </button>
                  <p className="text-center my-2 title">أو</p>
                  <Link href="/profession/create">
                    <button
                      type="button"
                      className="   rounded-lg border px-8 py-1 w-full text-white bg-gray-400"
                    >
                      سجل بنفسك
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const categories = await prisma.category.findMany();

  const businessType = await prisma.business.groupBy({
    by: ["businessType", "country"],
    where: {
      approved: true,
    },
  });
  const countries = await prisma.business.groupBy({
    by: ["country"],
    where: {
      approved: true,
    },
  });
  return {
    props: {
      countries,
      businessType,
      categories,
    },
    revalidate: 50,
  };
};

const SerchForm = ({
  countries,
  country,
  setCountry,
  filtetBusiness,
  prof,
  setProf,
}) => {
  return (
    <div>
      <div className="grid md:grid-cols-2 md:gap-8 gap-3  ">
        <div>
          <Select
            data={countries}
            type="country"
            selected={country}
            setSelected={setCountry}
          />
        </div>
        <div>
          <Select
            data={filtetBusiness(country)}
            type="businessType"
            selected={prof}
            setSelected={setProf}
          />
        </div>
      </div>
    </div>
  );
};
