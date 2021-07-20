import Link from "next/link";
import { INav } from "pages";

export default function index({ categories }: INav) {
  return (
    <nav>
      <div>
        <Link href="/dashboard">dashboard</Link>
      </div>
      {categories?.map((cat) => (
        <div key={cat.id}>
          <Link href={`/news/${cat.name}`}>
            <a>{cat.name}</a>
          </Link>
        </div>
      ))}
    </nav>
  );
}
