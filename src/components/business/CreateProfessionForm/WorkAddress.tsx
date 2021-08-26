import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import SvgLoading from "src/components/layout/SvgLoading";
import List from "./List";
import Map from "src/components/business/Map";
export default function WorkAddress({ register, setValue }) {
  const [userPlace, setUserPlace] = useState("");
  const [coordinates, setCoordinates] = useState([35.2433, 38.9637]);
  const [typeAddress, setTypeAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const ref = useRef();
  const handleCoordinates = async (e) => {
    setLoading(true);
    setUserPlace(e.target.value);
    setTypeAddress(e.target.value);
  };
  const handleAutoComplete = (place) => {
    setUserPlace(place.fullAddress);
    setCoordinates(place.coordinates);
    setShowAutocomplete(false);
  };

  useEffect(() => {
    const time = setTimeout(async () => {
      try {
        if (typeAddress) {
          const res = await axios.post("/api/profession/getcoordinates", {
            address: typeAddress,
          });
          setLoading(false);
          setAutocomplete(res.data);
          setShowAutocomplete(true);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }, 2000);
    return () => clearTimeout(time);
  }, [typeAddress]);

  useEffect(() => {
    const listener = (e) => {
      if (!(ref.current! as any).contains(e.target)) {
        setLoading(false);
        setShowAutocomplete(false);
      }
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);
  setValue("address", userPlace);
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 ">
      <Input
        type="textaria"
        text="الدولة:"
        reg={register("country")}
        holder="مثال: تركيا"
      />
      <div>
        <div className="relative" ref={ref}>
          <div className="relative ">
            {loading && <SvgLoading />}
            <Input
              text="العنوان:"
              holder="الافضل كتابة العنوان حسب لغة الدولة"
              type="textaria"
              onChange={handleCoordinates}
              value={userPlace}
              textAriaStyle=""
            />
          </div>
          <ul className="absolute   z-50 shadow-md bg-white w-full rounded-md">
            {showAutocomplete &&
              autocomplete.map((l) => (
                <List
                  title={l.text}
                  fullAddress={l.place_name}
                  key={l.id}
                  onClick={handleAutoComplete}
                  coordinates={l.geometry.coordinates}
                />
              ))}
          </ul>
        </div>
      </div>
      <div className="rounded-lg shadow-md col-start-1 col-end-3">
        <Map title={"address"} coordinates={coordinates} />
      </div>
    </div>
  );
}
