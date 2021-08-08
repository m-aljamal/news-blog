import { useRouter } from "next/router";
import { useState } from "react";

export default function ShareBusiness() {
  const [shareByCopy, setShareByCopy] = useState("نسخ رابط");

  const router = useRouter();

  const url = `${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`;

  const hanleCopy = () => {
    setShareByCopy("!تم نسخ الرابط");
    setTimeout(function () {
      setShareByCopy("نسخ رابط");
    }, 2000);
  };
  return (
    <ul className="text-sm text-gray-500">
      <li
        onClick={() => {
          navigator.clipboard.writeText(url).then(hanleCopy);
        }}
      >
        {shareByCopy}
      </li>
      <li>فيس بوك</li>
      <li>تويتر</li>
      <li>واتس اب</li>
    </ul>
  );
}
