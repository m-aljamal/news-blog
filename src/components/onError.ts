export default async function onError(
  error: any,
  req: any,
  res: any,
  next: any
) {
  console.log(error);
  res.status(500).end();
}
