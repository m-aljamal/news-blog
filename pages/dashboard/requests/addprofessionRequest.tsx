import Layout from "src/components/dashboard/layout";
import prisma from "src/prisma";
import Link from "next/link";
import axios from "axios";
import useSWR, { trigger } from "swr";
import toast, { Toaster } from "react-hot-toast";
import { getSession } from "next-auth/client";
export default function AddProfessionRequest({ reqests }) {
  const API = "/api/profession/requests/addprofession";
  const { data, error } = useSWR(API, {
    initialData: reqests,
  });
  if (error) {
    return <p>يوجد خطأ في تحميل الداتا</p>;
  }
  if (!data) {
    return <p>الرجاء الانتظار</p>;
  }

  const handleApprove = async (id) => {
    try {
      const res = await axios.put("/api/profession/update", { id });
      if (res.status === 200) {
        trigger(API);
        toast.success("تم اضافة المهنة بنجاح");
      }
    } catch (error) {
      toast.error("يوجد خطأ الرجاء اعادة المحاولة");
    }
  };
  return (
    <Layout>
      <div className="p-4">
        <h2 className="title">طلبات اضافة المهن</h2>
        <Toaster />
        <div
          className={`mt-8 grid ${
            data.length > 2 ? "xl:grid-cols-3" : ""
          } gap-4 sm:grid-cols-2`}
        >
          {data.length ? (
            data.map((r) => (
              <div
                key={r.id}
                className="border shadow-sm bg-gray-100 p-3 rounded-md"
              >
                <div className=" ">
                  <ReqCard text={r.name} icon="fas fa-user" />
                  <ReqCard
                    text={r.businessType}
                    icon="far fa-building text-gray-700"
                  />
                  <ReqCard text={r.businessName} icon="fas fa-briefcase  " />
                </div>
                <div className="flex justify-between mt-4">
                  <Link href={`/profession/${r.id}`}>
                    <a
                      className="
                    border px-6 py-1  bg-white font-bold rounded-md text-blue  border-blue
                    "
                    >
                      المزيد
                    </a>
                  </Link>
                  <button
                    onClick={() => handleApprove(r.id)}
                    className="border px-6 py-1  bg-white font-bold rounded-md text-green-600  border-green-600 "
                  >
                    موافقة
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-500">لايوجد طلبات </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

const ReqCard = ({ text, icon }) => {
  return (
    <div className="flex items-center">
      <i className={`${icon} text-gray-700`}></i>
      <p className="text-gray-600 mr-3">{text}</p>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session.role !== "ADMINISTRATOR") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const reqests = await prisma.business.findMany({
    where: {
      approved: false,
    },
    select: {
      name: true,
      businessName: true,
      id: true,
    },
  });
  return {
    props: {
      reqests: JSON.parse(JSON.stringify(reqests)),
    },
  };
}
