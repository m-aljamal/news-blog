import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
export default function Share({ title, description, categoryName }) {
  return (
    <div className="flex gap-4">
      <div>
        <FacebookShareButton
          url={
            "https://www.aljazeera.net/news/politics/2021/8/17/%D8%A5%D9%86%D8%AF%D8%A8%D9%86%D8%AF%D9%86%D8%AA-%D8%B3%D9%8A%D8%B7%D8%B1%D8%A9-%D8%B7%D8%A7%D9%84%D8%A8%D8%A7%D9%86-%D8%B9%D9%84%D9%89-%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A9"
          }
        >
          <FacebookIcon size={30} round />
        </FacebookShareButton>
      </div>
      <div>
        <WhatsappShareButton
          url={"https://www.npmjs.com/package/react-share"}
          title={"شير على الوتس"}
        >
          <WhatsappIcon size={30} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
