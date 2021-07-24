import Link from "next/link";
import { INav } from "pages";

export default function index({ categories }: INav) {
  return (
    <nav className="flex gap-10 border-2">
      <Link href="/login">login</Link>
      <Link href="/dashboard">dashboard</Link>

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
