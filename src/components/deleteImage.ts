import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/destroy`;
interface IUploadImageResponse {
  secure_url: string;
  public_id: string;
}

export async function deleteImage(
  public_id: string,
  signature: string,
  timestamp: number
) {
  const response = await axios.post(url, {
    public_id,
    signature,
    timestamp,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? "",
  });

  console.log(response);

  return "delete";
}

export const createSignature = async () => {
  const res = await fetch("/api/cloudinary");
  return await res.json();
};
