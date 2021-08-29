import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { trigger } from "swr";
import StarRate from "./StarRate";

export default function WriteReview({ id, close }) {
  const [text, setText] = useState("");
  const [star, setStar] = useState(0);
  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const rev = await axios.post("/api/profession/review", {
        review: text,
        id,
        star,
      });
      if (rev.status === 200) {
        trigger(`/api/profession/allreviews/${id}`);
        toast.success("تم اضافة التقييم بنجاح");
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSend} id="rev-form">
      <div className="mt-2">
        <StarRate value={star} setStar={setStar} type="edit" />
      </div>
      <div>
        <textarea
          className="border w-full outline resize-none p-2 text-gray-500 mt-4"
          placeholder="اكتب تعليق"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </form>
  );
}
