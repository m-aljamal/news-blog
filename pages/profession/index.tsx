import prisma from "src/prisma";
import { useEffect, useState } from "react";
import Select from "src/components/Select";
import router from "next/router";
import Image from "next/image";
import LogoNav from "src/components/navbar/LogoNav";
import NavBar from "src/components/navbar/index";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
interface IProf {
  profession: string;
  country: string;
  name: string;
  phone: string;
}
export default function profession({ countries, businessType, categories }) {
  const [prof, setProf] = useState("اختيار المهنة");
  const [country, setCountry] = useState("اختر البلد");

  const validationSchema = yup.object().shape({});
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
    return businessType.filter((b) => b.country === country);
  };

  useEffect(() => {
    if (prof !== "اختيار المهنة" && country !== "اختر البلد") {
      handleSerch();
    }
  }, [prof]);
  return (
    <>
      <LogoNav />
      <NavBar categories={categories} />
      <div className="container">
        <h2 className="title my-6 py-2 border-b w-[fit-content] border-red-500">
          ابحث عن محترفين محليين لأي شيء تقريبًا
        </h2>

        <SerchForm
          countries={countries}
          country={country}
          setCountry={setCountry}
          filtetBusiness={filtetBusiness}
          prof={prof}
          setProf={setProf}
          handleSerch={handleSerch}
        />

        <div className="mt-16">
          <h2 className="title  title my-6 py-2 border-b w-[fit-content] border-red-500">
            سجل مهنتك مجاناً
          </h2>

          <div className="mt-8">
            <h2>مساعدة في التسجيل</h2>
            <div>
              <p className="text-gray-600">الاسم</p>
              <input placeholder="الاسم والكنية" />
            </div>
            <div>
              <p className="text-gray-600">رقم التواصل</p>
            </div>
          </div>

          <Link href="/profession/create">
            <button
              type="button"
              className="  rounded-lg border px-8 py-1 w-full text-white bg-blue"
            >
              سجل لوحدك
            </button>
          </Link>
        </div>
        {/* <div className="flex  justify-around mt-8">
          <div>
            <h2 className="title mb-3">
              ابحث عن محترفين محليين لأي شيء تقريبًا
            </h2>
            <SerchForm
              countries={countries}
              country={country}
              setCountry={setCountry}
              filtetBusiness={filtetBusiness}
              prof={prof}
              setProf={setProf}
              handleSerch={handleSerch}
            />
          </div>
          <div>
            <h2 className="title mb-3">سجل مهنتك مجاناً</h2>
            <div>
              <Link href="/profession/create">
                <button
                  type="button"
                  className="  rounded-lg border px-8 py-1 w-full text-white bg-blue"
                >
                  سجل لوحدك
                </button>
              </Link>
              <Link href="/profession/create">
                <button
                  type="button"
                  className=" rounded-lg border px-8 py-1 w-full text-white bg-blue mt-4"
                >
                  دعنا نسجل
                </button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const categories = await prisma.category.findMany();

  const businessType = await prisma.business.groupBy({
    by: ["businessType", "country"],
  });
  const countries = await prisma.business.groupBy({
    by: ["country"],
  });
  return {
    props: {
      countries,
      businessType,
      categories,
    },
  };
};

const SerchForm = ({
  countries,
  country,
  setCountry,
  filtetBusiness,
  prof,
  setProf,
  handleSerch,
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-8  ">
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
      {/* <button
        onClick={handleSerch}
        className=" mt-6 w-1/2 	 rounded-lg border px-8 py-1   text-white bg-blue"
        disabled={country === "اختر البلد" || prof === "اختيار المهنة"}
      >
        بحث
      </button> */}
    </div>
  );
};
