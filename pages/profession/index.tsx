import prisma from "src/prisma";
import { useState } from "react";
import Select from "src/components/Select";
import router from "next/router";
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
    <div className="container">
      <div className=" mt-4">
        <h2>ابحث عن محترفين محليين لأي شيء تقريبًا</h2>
        <div className="flex justify-between">
          <div className="w-1/2">
            <Select
              data={countries}
              type="country"
              selected={country}
              setSelected={setCountry}
            />
          </div>
          <div className="w-1/2">
            <Select
              data={filtetBusiness(country)}
              type="businessType"
              selected={prof}
              setSelected={setProf}
            />
          </div>
          <button
            onClick={handleSerch}
            className="border-2 border-gray-200 py-0 px-2 rounded-lg"
          >
            ابحث
          </button>
        </div>
      </div>
    </div>
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
