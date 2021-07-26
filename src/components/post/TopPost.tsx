import Image from "next/image";

export default function TopPost({ post }) {
  

  return (
    // <div
    //   className={`w-full bg-no-repeat bg-cover bg-left bg-fixed`}
    //   style={{ backgroundImage: `url(${post.image})` }}
    // ></div>
    <div>
      <div className="fixed h-96 w-full overflow-hidden" style={{ zIndex: -1 }}>
        {/* <Image
          alt="Mountains"
          src={post.image}
          layout="fill"
          objectFit="cover"
          quality={100}
        /> */}
      </div>
      <p>
        Image Component
        <br />
        as a Background
      </p>
    </div>
  );
}
