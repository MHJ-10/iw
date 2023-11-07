import { useMap } from "react-leaflet";

function MapSetting({ location }) {
  const map = useMap();
  map.setView(location, map.getZoom());
  return null;
}

export default MapSetting;
