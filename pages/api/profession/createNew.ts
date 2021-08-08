import prisma from "src/prisma";
import nc from "next-connect";
import onError from "src/components/onError";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
const geocoder = mbxGeocoding({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
});
const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  const data = JSON.parse(req.body);
  const geoData = await geocoder
    .forwardGeocode({ query: `${data.country}, ${data.address}`, limit: 1 })
    .send();

  data.coordinates = geoData.body.features[0].geometry;

  const addProfession = await prisma.business.create({
    data,
  });

  res.json(addProfession);
});

export default handler;
