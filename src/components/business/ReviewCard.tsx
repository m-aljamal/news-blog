import StarRate from "src/components/business/StarRate";
import ShowDate from "../layout/ShowDate";
export default function ReviewCard({ review }) {
  return (
    <div>
      <div className="sm:flex items-center">
        <p className="ml-2 title">{review.userName}</p>
        <StarRate value={review.star} type="preview" />
      </div>
      <p className="businessBody">{review.review}</p>
      <p className="businessBody mt-4">
        <ShowDate date={review.createdAt} />
      </p>
      <hr className="my-4" />
    </div>
  );
}
