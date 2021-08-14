import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 bg-gray-100 border-r md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl   flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a className="md:block text-right md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              الخيارات لوحة
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
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
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <p className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                    ...الخيارات لوحة التحكم
                  </p>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
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
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
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
          </div>
        </div>
      </nav>
    </>
  );
}

const Nav = ({ text, icon, link }) => {
  const { asPath } = useRouter();

  return (
    <div className="bg-gray-200 my-2 rounded-md hover:bg-white">
      <li className="items-center p-3">
        <Link href={link}>
          <p
            className={` ${
              asPath === link ? "text-pink-500" : "text-gray-600 "
            }  cursor-pointer  text-xs uppercase font-bold block`}
          >
            <i className={`${icon} opacity-75 ml-2 text-base`}></i>
            {text}
          </p>
        </Link>
      </li>
    </div>
  );
};
