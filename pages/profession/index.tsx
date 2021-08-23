import prisma from "src/prisma";
import { useState } from "react";
import Select from "src/components/Select";
import router from "next/router";
import Image from "next/image";
import LogoNav from "src/components/navbar/LogoNav";
import NavBar from "src/components/navbar/index";
import Link from "next/link";
export default function profession({ countries, businessType, categories }) {
  const [prof, setProf] = useState("اختيار المهنة");
  const [country, setCountry] = useState("اختر البلد");
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

  return (
    <>
      <LogoNav />
      <NavBar categories={categories} />
      <div className="container">
        <div className="flex  justify-around mt-8">
          <div className="">
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
            <Link href="/profession/create">
              <button
                type="button"
                className="  rounded-lg border px-8 py-1 w-full text-white bg-blue"
              >
                تسجيل
              </button>
            </Link>
          </div>
        </div>
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
      <div>
        <Select
          data={countries}
          type="country"
          selected={country}
          setSelected={setCountry}
        />
      </div>
      <div className="mt-6">
        <Select
          data={filtetBusiness(country)}
          type="businessType"
          selected={prof}
          setSelected={setProf}
        />
      </div>
      <button
        onClick={handleSerch}
        className=" mt-6 rounded-lg border px-8 py-1 w-full text-white bg-blue"
      >
        بحث
      </button>
    </div>
  );
};
