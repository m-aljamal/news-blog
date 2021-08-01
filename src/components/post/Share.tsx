import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
export default function Share() {
  return (
    <div className="flex gap-4">
      <div>
        <FacebookShareButton
          url={"https://www.aljazeera.net/"}
          quote={"CampersTribe - World is yours to explore"}
          hashtag="#camperstribe"
          title="الجزيرة"
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
