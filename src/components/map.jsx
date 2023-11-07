import { useEffect, useRef, useState } from "react";
import { getAddress, getLatLng, getPrimaryLocation } from "../utils/utils";
import MapView from "./mapView";

function Map() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const markerRef = useRef(null);
  const addressRef = useRef("");

  // get location when rendered page.
  async function getLocation() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      navigator.geolocation.getCurrentPosition((positon) => {
        const { latitude, longitude } = positon.coords;
        setLocation({ lat: latitude, lng: longitude });
      });
    } else {
      const gettedlocation = await getPrimaryLocation();
      setLocation(gettedlocation);
    }
  }

  // get lat and lng from address and put in location state
  async function handleLatLng() {
    const address = addressRef.current.value;
    console.log(address);
    if (address.trim() !== "") {
      try {
        const latLng = await getLatLng(address);
        console.log(latLng);
        setLocation(latLng);
      } catch (err) {
        alert("Address not found.");
      }
      addressRef.current.value = "";
    } else {
      alert("Please enter your address");
    }
  }

  // get address from location state.
  async function handleAddress() {
    setIsLoading(true);
    const gettedAddress = await getAddress(location.lat, location.lng);
    setAddress(gettedAddress);
    setIsLoading(false);
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      {location && (
        <>
          <>
            <input type="text" ref={addressRef} />
            <button onClick={handleLatLng}>Show Location on Map</button>
          </>
          <>
            <p>latitude: {location.lat}</p>
            <p>longitude: {location.lng}</p>
          </>
          <>
            <button onClick={getLocation}>Show My Location</button>
            <button onClick={handleAddress}>get Address</button>
            {address && <p>{isLoading ? "Loading..." : address}</p>}
          </>
          <MapView
            location={location}
            setLocation={setLocation}
            markerRef={markerRef}
          />
        </>
      )}
    </>
  );
}

export default Map;
