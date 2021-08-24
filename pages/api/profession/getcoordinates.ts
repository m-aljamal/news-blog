import nc from "next-connect";
import auth from "src/components/middleWare/auth";
import onError from "src/components/onError";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
const geocoder = mbxGeocoding({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
});
const handler = nc({
  onError,
});

handler.use(auth);

handler.post(async (req, res) => {
  try {
    const geoData = await geocoder
      .forwardGeocode({ query: req.body.address, limit: 1 })
      .send();
    console.log(geoData.body.features[0].geometry.coordinates);

    res.json({ coordinates: geoData.body.features[0].geometry.coordinates });
  } catch (error) {
    console.error(error);

    res.status(400).json("error");
  }
});

export default handler;
