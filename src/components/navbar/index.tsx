import Link from "next/link";
import { INav } from "pages";
export default function index({ categories }: INav) {
  return (
    <div className="bg-blue">
      <nav className="flex justify-between items-center container py-4 text-white">
        <div className="flex gap-10">
          {categories?.map((cat) => (
            <div key={cat.name}>
              <Link href={`/news/${cat.slugName}`}>
                <a>{cat.name}</a>
              </Link>
            </div>
          ))}
          <div>
            <Link href="/profession">
              <a>خدمة المهن</a>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
