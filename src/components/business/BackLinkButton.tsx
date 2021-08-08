import router from "next/router";

export default function BackLinkButton({ text }) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer mt-4 text-blue"
      onClick={() => router.back()}
    >
      <i className="fas fa-angle-right fa-lg"></i>
      <p>{text}</p>
    </div>
  );
}
