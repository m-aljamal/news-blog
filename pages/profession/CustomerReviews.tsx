import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReviewCard from "src/components/business/ReviewCard";
import WriteReview from "src/components/business/WriteReview";
import Model from "src/components/layout/Model";
import useSWR from "swr";
import Button from "./Button";

export default function CustomerReviews({ id, reviews }) {
  // const [session, loading] = useSession();
  let [isOpen, setIsOpen] = useState(false);

  // if (loading) {
  //   return <p>Loading</p>;
  // }
  // const isUserHasReview = () => {
  //   if (!loading) {
  //     return reviews.some((r) => r.userName === session?.user?.name);
  //   }
  // };

  const { data, error } = useSWR(`/api/profession/allreviews/${id}`, {
    initialData: { reviews },
  });
  if (error) {
    return <p>يوجد خطأ</p>;
  }
  return (
    <div>
      <Toaster />
      <div>
        <h2 className="title">تقيمات الزبائن:</h2>
        <p className="mt-2 businessBody">
          يتم تصنيف العمل من حيث الجودة والاحترافية وسرعة الاستجابة
        </p>
      </div>
      <div className="my-4">
        {/* {!isUserHasReview() && (
        <Button
          icon="fas fa-pencil-alt mr-2"
          text="اضافة تقييم"
          handleClick={() => setIsOpen(true)}
        />
      )} */}

        <Button
          icon="fas fa-pencil-alt mr-2"
          text="اضافة تقييم"
          handleClick={() => setIsOpen(true)}
        />
      </div>

      <div>
        {data?.reviews.map((review) => (
          <div key={review.id} className="mt-8">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      <Model
        open={isOpen}
        setOpen={setIsOpen}
        type="send"
        title="اضافة تقييم"
        content={<WriteReview id={id} close={() => setIsOpen(false)} />}
      />
    </div>
  );
}
