import { useMemo } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MapSetting from "./mapSetting";

const MapView = ({ location, setLocation, markerRef }) => {
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        const positon = marker.getLatLng();
        const { lat, lng } = positon;
        setLocation({ lat, lng });
      },
    }),
    []
  );

  return (
    <MapContainer
      center={location}
      zoom={13}
      scrollWheelZoom={true}
      fadeAnimation={true}
    >
      <MapSetting location={location} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={location}
        draggable={true}
        ref={markerRef}
        eventHandlers={eventHandlers}
      />
    </MapContainer>
  );
};

export default MapView;

// function MapView({ location, setLocation, markerRef }) {
//   const eventHandlers = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         const positon = marker.getLatLng();
//         const { lat, lng } = positon;
//         setLocation({ lat, lng });
//       },
//     }),
//     []
//   );

//   return (
//     <MapContainer
//       center={location}
//       zoom={13}
//       scrollWheelZoom={true}
//       fadeAnimation={true}
//     >
//       <MapSetting location={location} />
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker
//         position={location}
//         draggable={true}
//         ref={markerRef}
//         eventHandlers={eventHandlers}
//       />
//     </MapContainer>
//   );
// }

// export default forwardRef(MapView);
