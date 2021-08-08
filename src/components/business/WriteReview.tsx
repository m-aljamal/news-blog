import { useState } from "react";
import StarRate from "./StarRate";

export default function WriteReview({ id }) {
  const [text, setText] = useState("");
  const [star, setStar] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rev = await fetch("/api/profession/review", {
        method: "POST",
        body: JSON.stringify({ review: text, id, star }),
      });
      console.log(rev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <StarRate value={star} setStar={setStar} type="edit" />
      </div>
      <div>
        <textarea
          className="border-2"
          placeholder="اكتب تعليق"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className="border-2">ارسل</button>
    </form>
  );
}
