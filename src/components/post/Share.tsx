import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
export default function Share({ title, description, categoryName, slug }) {
  const link = `${process.env.NEXT_PUBLIC_DOMAIN}/news/${categoryName}/${slug}`;

  return (
    <div className="flex gap-1 sm:gap-4 sm:justify-between flex-wrap items-center mt-4">
      <div>
        <FacebookShareButton url={link}>
          <FacebookIcon size={30} round />
        </FacebookShareButton>
      </div>
      <div>
        <WhatsappShareButton url={link}>
          <WhatsappIcon size={30} round />
        </WhatsappShareButton>
      </div>
      <div>
        <TwitterShareButton url={link}>
          <TwitterIcon size={30} round />
        </TwitterShareButton>
      </div>
      <div>
        <TelegramShareButton url={link}>
          <TelegramIcon size={30} round />
        </TelegramShareButton>
      </div>
    </div>
  );
}
