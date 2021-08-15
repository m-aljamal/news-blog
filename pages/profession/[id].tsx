import WriteReview from "src/components/business/WriteReview";
import prisma from "src/prisma";
import ReviewCard from "src/components/business/ReviewCard";
import Map from "src/components/business/Map";
import Head from "next/head";
import Image from "next/image";
import BackLinkButton from "src/components/business/BackLinkButton";
import { useState } from "react";
import Model from "src/components/layout/Model";
import ShareBusiness from "src/components/business/ShareBusiness";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import StarRate from "src/components/business/StarRate";
export default function prof({ findBusiness, rateAvg }) {
  let [isOpen, setIsOpen] = useState(false);
  const { query } = useRouter();
  console.log(findBusiness);
  const avrage = Math.round(rateAvg._avg.star);
  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container pb-8">
        <BackLinkButton text="رجوع للخلف" />
        <div className="flex gap-8 mt-4 relative">
          <div className="w-3/5 rounded-lg shadow-md border-2 border-opacity-50">
            <div className=" flex gap-4   justify-between">
              <div className="w-2/5">
                <Image
                  src={findBusiness.logo.image}
                  width={150}
                  height={120}
                  layout="responsive"
                />
              </div>
              <div className="w-3/5 text-center p-4">
                <h2 className="text-lg">{findBusiness?.businessName}</h2>
                <p className="mt-2 businessBody">{findBusiness.name}</p>
                <DisplayRate avrage={avrage} starCount={rateAvg._count.star} />
                <Button
                  icon="fas fa-share-square mr-2"
                  text="مشاركة"
                  handleClick={() => setIsOpen(true)}
                />
              </div>
              <Model
                open={isOpen}
                setOpen={setIsOpen}
                title="مشاركة"
                content={<ShareBusiness />}
              />
            </div>
            <div className="px-5">
              <div className="mt-5">
                <span className="title">من نحن: </span>
                <span className="businessBody">
                  {findBusiness?.description}
                </span>
              </div>
              <div>
                <div className="mt-4 flex justify-around">
                  <div>
                    <h2 className="title mb-2">ملخص:</h2>
                    <p>
                      <i className="fas fa-map-marker-alt text-blue ml-2"></i>
                      <span className="mr-3 businessBody">
                        {findBusiness?.country} - {findBusiness?.address}
                      </span>
                    </p>
                    <p className="my-2">
                      <i className="fas fa-user-friends text-blue  "></i>
                      <span className="mr-3 businessBody">
                        {findBusiness?.NumberOfEmployees} موظف
                      </span>
                    </p>
                    <p>
                      <i className="fas fa-clock text-blue"></i>
                      <span className="mr-3 businessBody">
                        {findBusiness?.businessStart} عمل
                      </span>
                    </p>
                  </div>
                  <div>
                    <h2 className="title mb-2">التواصل الاجتماعي: </h2>
                    <div className="flex gap-2 justify-center">
                      <LinkWithLogo
                        link={findBusiness.faceBook}
                        logo="fab fa-facebook-square fa-lg text-blue"
                      />
                      <LinkWithLogo
                        link={findBusiness.instagram}
                        logo="fab fa-instagram-square fa-lg text-pink-500"
                      />
                      <LinkWithLogo
                        link={findBusiness.youtube}
                        logo="fab fa-youtube fa-lg text-red-500"
                      />
                      <LinkWithLogo
                        link={findBusiness.website}
                        logo="fas fa-globe fa-lg text-green-500 "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <hr className="my-4" />
                <h2 className="title">مشاريع مميزة: </h2>
                <div className="grid grid-cols-3 gap-4 my-4">
                  {findBusiness.images?.map((i) => (
                    <div key={i.public_id}>
                      <Image
                        src={i.image}
                        width={250}
                        height={180}
                        layout="responsive"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <hr className="my-4" />
              <CustomerReviews id={query.id} reviews={findBusiness?.reviews} />
            </div>
          </div>
          <div className="w-2/5 ">
            <div className=" rounded-lg shadow-md  sticky top-10">
              <Map
                title={findBusiness?.businessName}
                coordinates={findBusiness.coordinates.coordinates}
              />
              <div className="mt-4 flex gap-4 px-4 py-5">
                <LinkWithLogo
                  link={`tel:${findBusiness.phone}`}
                  logo="fas fa-phone mr-2"
                  className="contact"
                >
                  <span className="text-base">اتصال</span>
                </LinkWithLogo>
                <LinkWithLogo
                  link={`https://wa.me/${findBusiness.whatsAppNumber}?text=مرحبا اتواصل من اجل الاستفسار عن خدماتكم عبر موقع الاخبار`}
                  logo="fab fa-whatsapp mr-2 fa-lg"
                  className="contact"
                >
                  <span className="text-base">رسالة</span>
                </LinkWithLogo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const findBusiness = await prisma.business.findUnique({
    where: {
      id: ctx.query.id,
    },
    select: {
      reviews: true,
      businessType: true,
      name: true,
      businessName: true,
      country: true,
      address: true,
      email: true,
      description: true,
      coordinates: true,
      images: true,
      website: true,
      phone: true,
      jobDescription: true,
      logo: true,
      businessStart: true,
      NumberOfEmployees: true,
      faceBook: true,
      instagram: true,
      youtube: true,
      whatsAppNumber: true,
      createdAt: true,
    },
  });
  const rateAvg = await prisma.review.aggregate({
    _avg: {
      star: true,
    },
    _count: {
      star: true,
    },
    where: {
      businessId: ctx.query.id,
    },
  });

  return {
    props: { findBusiness: JSON.parse(JSON.stringify(findBusiness)), rateAvg },
  };
}

const CustomerReviews = ({ id, reviews }) => {
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

  return (
    <div>
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
        {reviews?.map((review) => (
          <div key={review.id} className="mt-8">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      <Model
        open={isOpen}
        setOpen={setIsOpen}
        title="اضافة تقييم"
        content={<WriteReview id={id} />}
      />
    </div>
  );
};

const Button = ({ icon, text, ...props }) => {
  return (
    <button
      className="border-2 px-4 py-1 text-gray-500 border-gray-500 rounded-md"
      onClick={props.handleClick}
    >
      <span className="text-base">{text}</span>
      <i className={icon}></i>
    </button>
  );
};

const LinkWithLogo = ({ link, logo, ...props }) => {
  return (
    <a href={link} target="_blank" className={props.className}>
      {props.children}
      <i className={logo}></i>
    </a>
  );
};

export const DisplayRate = ({ avrage, starCount }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <p className="text-gray-700 font-bold">( {starCount} )</p>
      <StarRate value={avrage} type="preview" />
      <p className="mr-2 text-Green font-bold">{avrage}</p>
    </div>
  );
};
