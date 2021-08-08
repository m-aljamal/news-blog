const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`;
interface IUploadImageResponse {
  secure_url: string;
  public_id: string;
}

export async function uploadImages(
  images: File[],
  signature: string,
  timestamp: number
): Promise<IUploadImageResponse> {
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append(images[i].name, images[i]);
  }
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ?? "");

  const response = await fetch(url, {
    method: "post",
    body: formData,
  });
  return response.json();
  return;
}

export const createSignature = async () => {
  const res = await fetch("/api/cloudinary");
  return await res.json();
};
