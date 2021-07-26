import DropDown from "src/components/shared/DropDown";
import Link from "next/link";
export default function LogoNav() {
  return (
    <div className="shadow-md">
      <div className="container text-left text-3xl py-6 font-bold flex justify-between">
        <div>
          <span> موقع </span>
          <span className="text-red-400">اخبار </span>
        </div>
        <div>
          <div>
            <DropDown />
          </div>
        </div>
      </div>
    </div>
  );
}
