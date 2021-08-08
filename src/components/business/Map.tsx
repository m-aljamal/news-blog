import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
export default function Map({ coordinates, title }) {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/streets-v11",
      center: coordinates,
      minzoom: 3,
      maxzoom: 12,
      zoom: 12,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${title}</h3>`))
      .addTo(map);

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <div className="w-full h-72 rounded-t-lg" ref={mapContainerRef} />;
}
