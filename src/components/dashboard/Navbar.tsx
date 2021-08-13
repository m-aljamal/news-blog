import React from "react";

export default function Navbar({ children }) {
  return (
    <>
      <nav className="absolute  shadow-md bg-white top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center py-4 px-16">
        {children}
      </nav>
    </>
  );
}
