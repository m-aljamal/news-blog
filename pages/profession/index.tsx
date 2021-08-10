import prisma from "src/prisma";
import { useState } from "react";
import Select from "src/components/Select";
import router from "next/router";
import Image from "next/image";
import LogoNav from "src/components/navbar/LogoNav";
export default function profession({ countries, businessType }) {
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

      <div className="container">
        <div className=" mt-4">
          <h2 className="businessTitle">
            ابحث عن محترفين محليين لأي شيء تقريبًا
          </h2>
          <div className="mt-8 w-2/4">
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
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
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
