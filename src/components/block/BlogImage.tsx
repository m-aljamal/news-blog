import Image from "next/image";
export default function BlogImage({ data }) {
  return (
    <Image
      src={data?.file?.url}
      layout="responsive"
      objectFit="cover"
      width={900}
      height={500}
    />
  );
}
