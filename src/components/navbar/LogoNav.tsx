import DropDown from "src/components/layout/DropDown";
import Link from "next/link";
export default function LogoNav() {
  return (
    <div className="shadow-md">
      <div className="container text-left text-3xl py-6 font-bold flex justify-between">
        <Link href="/">
          <div className="cursor-pointer">
            <span> ياسمين </span>
            <span className="text-red-400">برس </span>
          </div>
        </Link>
        <div>
          <div>
            <DropDown />
          </div>
        </div>
      </div>
    </div>
  );
}
