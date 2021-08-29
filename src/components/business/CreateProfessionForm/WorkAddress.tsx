import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import SvgLoading from "src/components/layout/SvgLoading";
import List from "./List";
import Map from "src/components/business/Map";
import ListboxOptions from "src/components/layout/ListboxOptions";
const countries = [
  {
    name: "تركيا",
  },
  { name: "سوريا" },
];
export default function WorkAddress({ setValue, errors, clearErrors }) {
  const [userPlace, setUserPlace] = useState("");
  const [coordinates, setCoordinates] = useState([35.2433, 38.9637]);
  const [typeAddress, setTypeAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const ref = useRef();
  const handleCoordinates = async (e) => {
    clearErrors("address");
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

  const listener = (e) => {
    if (!(ref?.current as any)?.contains(e.target)) {
      setLoading(false);
      setShowAutocomplete(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, typeAddress]);
  setValue("address", userPlace);
  setValue("coordinates", coordinates);
  setValue("country", selectedCountry.name);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 ">
      <div>
        <p className="text-gray-600">الدولة:</p>
        <ListboxOptions
          data={countries}
          selected={selectedCountry}
          setSelected={setSelectedCountry}
        />
      </div>

      <div>
        <div className="relative" ref={ref}>
          <div className="relative ">
            {loading && <SvgLoading />}
            <Input
              text="العنوان:"
              holder="اكتب العنوان وشاهد الخريطة"
              type="textaria"
              onChange={handleCoordinates}
              value={userPlace}
              errors={errors}
            />
          </div>
          <ul className="absolute z-50 shadow-md bg-white w-full rounded-md">
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
      <div className="rounded-lg shadow-md md:col-start-1 md:col-end-3">
        <Map title={"address"} coordinates={coordinates} />
      </div>
    </div>
  );
}
