import Link from "next/link";
import { INav } from "pages";
import DropDown from "../shared/DropDown";
export default function index({ categories }: INav) {
  return (
    <nav className="flex justify-between items-center container ">
      <div className="flex gap-10">
        {categories?.map((cat) => (
          <div key={cat.id}>
            <Link href={`/news/${cat.name}`}>
              <a>{cat.name}</a>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <DropDown />
      </div>
    </nav>
  );
}
