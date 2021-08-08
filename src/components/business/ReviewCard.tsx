import StarRate from "src/components/business/StarRate";
export default function ReviewCard({ review }) {
  return (
    <div>
      <div className="flex items-center">
        <p className="ml-2 businessTitle">{review.userName}</p>
        <StarRate value={review.star} type="preview" />
      </div>
      <p className="businessBody">{review.review}</p>
      <p className="businessBody mt-4">2021/08</p>
      <hr className="my-4" />
    </div>
  );
}
