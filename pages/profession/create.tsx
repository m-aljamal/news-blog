import React from "react";
import CreateProfessionForm from "src/components/business/CreateProfessionForm";
import LogoNav from "src/components/navbar/LogoNav";
import prisma from "src/prisma";
import NavBar from "src/components/navbar/index";
export default function create({ categories }) {
  return (
    <>
      <LogoNav />
      <NavBar categories={categories} />
      <CreateProfessionForm />
    </>
  );
}
export const getStaticProps = async () => {
  const categories = await prisma.category.findMany();

  return {
    props: {
      categories,
    },
  };
};
