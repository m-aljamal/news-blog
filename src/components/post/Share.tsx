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
export default function Share({ link }) {
  return (
    <ul className="flex gap-1   sm:gap-4 sm:justify-between flex-wrap items-center mt-4">
      <li
        onClick={() => {
          navigator.clipboard.writeText(link);
        }}
        className="bg-gray-700 mb-1 cursor-pointer text-white w-7 h-7 rounded-full flex items-center justify-center"
      >
        <i className="fas fa-link"></i>
      </li>
      <li>
        <FacebookShareButton url={link}>
          <FacebookIcon size={30} round />
        </FacebookShareButton>
      </li>
      <li>
        <WhatsappShareButton url={link}>
          <WhatsappIcon size={30} round />
        </WhatsappShareButton>
      </li>
      <li>
        <TwitterShareButton url={link}>
          <TwitterIcon size={30} round />
        </TwitterShareButton>
      </li>
      <li>
        <TelegramShareButton url={link}>
          <TelegramIcon size={30} round />
        </TelegramShareButton>
      </li>
    </ul>
  );
}
