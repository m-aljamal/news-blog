import axios from "axios";
import { getSession } from "next-auth/client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "src/components/dashboard/layout";
import ShowDate from "src/components/layout/ShowDate";
import prisma from "src/prisma";
import useSWR, { trigger } from "swr";
export default function helpRequest({ requests }) {
  const API = "/api/profession/requests/helprequest";
  const { data, error } = useSWR(API, {
    initialData: requests,
  });

  return (
    <Layout>
      <div className="  p-4">
        <h2 className="title">طلبات المساعدة في اضافة المهن</h2>

        <div className="grid sm:grid-cols-3  gap-4 mt-8">
          {data.length ? (
            data?.map((d) => <HelpCard data={d} key={d.id} />)
          ) : (
            <p className="text-red-500">لايوجد طلبات</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

const HelpCard = ({ data }) => {
  const API = "/api/profession/requests/helprequest";

  const handleAddRequest = async (id) => {
    try {
      const res = await axios.put(API, {
        id,
      });
      if (res.status === 200) {
        trigger(API);
      }
    } catch (error) {
      toast.error("يوجد خطأ");
    }
  };

  return (
    <div className="bg-gray-100  border shadow-md p-4 rounded-md">
      <Toaster />
      <p>{data.name}</p>
      <a target="_blank" href={`https://wa.me/${data.whatsAppNumber}`}>
        {data.whatsAppNumber}
      </a>
      <ShowDate date={data.createdAt} />
      <button
        onClick={() => handleAddRequest(data.id)}
        className="border py-1 px-4 w-full mt-4 text-white font-bold bg-blue rounded-md"
      >
        تمت الاضافة
      </button>
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
  const requests = await prisma.businessHelpRequest.findMany({
    where: {
      hasProcessed: false,
    },
  });

  return {
    props: {
      requests: JSON.parse(JSON.stringify(requests)),
    },
  };
}
