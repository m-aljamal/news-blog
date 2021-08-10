import React from "react";

import UserDropdown from "./UserDropdowm";

export default function Navbar() {
  return (
    <>
      <nav className="absolute  top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center py-4 px-16">
        <div className="flex justify-between items-center w-full">
          <p className="text-white">لوحة التحكم</p>
          <p className="text-white">خيارات</p>
        </div>
      </nav>
    </>
  );
}
