import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="lg:right-0 bg-gray-100 border-l lg:block lg:fixed lg:top-0 lg:bottom-0 lg:overflow-y-auto lg:flex-row lg:flex-nowrap lg:overflow-hidden shadow-xl   flex flex-wrap items-center justify-between relative lg:w-64 z-10 py-4 px-6">
        <div className="lg:flex-col lg:items-stretch lg:min-h-full lg:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a className="lg:block text-right lg:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              الخيارات لوحة
            </a>
          </Link>
          {/* User */}
          <ul className="lg:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <p className="ml-4">notification</p>
            </li>
            <li className="inline-block relative">
              <p>user</p>
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "lg:flex lg:flex-col lg:items-stretch lg:opacity-100 lg:relative lg:mt-4 lg:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="lg:min-w-full lg:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <p className="lg:block text-left lg:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                    ...الخيارات لوحة التحكم
                  </p>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <ul>
              <Nav link="/dashboard" text="الرئيسية" icon="fas fa-tv" />
            </ul>
            {/* Divider */}
            <hr className="my-4 lg:min-w-full" />
            {/* Heading */}
            <h6 className="lg:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              الاخبار
            </h6>
            {/* Navigation */}
            <ul>
              <Nav
                link="/dashboard/post/create"
                text="بوست جديد"
                icon="far fa-clipboard"
              />
              <Nav
                link="/dashboard/posts"
                text="جميع الاخبار"
                icon="far fa-newspaper"
              />
            </ul>
            <hr className="my-4 lg:min-w-full" />
            <h6 className="lg:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              خدمات
            </h6>
            <ul>
              <Nav
                link="/dashboard/profession/create"
                text="المهن"
                icon="far fa-clipboard"
              />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

const Nav = ({ text, icon, link }) => {
  const { asPath } = useRouter();

  return (
    <div className="bg-gray-200 my-2 rounded-lg hover:bg-white">
      <li className="items-center p-3">
        <Link href={link}>
          <p
            className={` ${
              asPath === link ? "text-pink-500" : "text-gray-600 "
            }  cursor-pointer  text-sm uppercase font-bold block `}
          >
            <i className={`${icon} opacity-75 ml-2 text-base`}></i>
            {text}
          </p>
        </Link>
      </li>
    </div>
  );
};
