const BASE_URL = "https://api.geoapify.com/v1";
const API_KEY = "f917bcab9d1a43938d346d2d6441b0de";

export async function getAddress(lat, lon) {
  const response = await fetch(
    `${BASE_URL}/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`
  ).then((res) => res.json());

  return response.features[0].properties.formatted;
}

export async function getLatLng(address) {
  const response = await fetch(
    `${BASE_URL}/geocode/search?text=${address}&apiKey=${API_KEY}`
  ).then((res) => res.json());

  const lat = response.features[0].properties.lat;
  const lng = response.features[0].properties.lon;
  return { lat, lng };
}

export async function getPrimaryLocation() {
  const response = await fetch(`${BASE_URL}/ipinfo?&apiKey=${API_KEY}`).then(
    (res) => res.json()
  );

  const lat = response.location.latitude;
  const lng = response.location.longitude;
  const accurateLat = lat + 0.0748325
  const accurateLng = lng - 0.0156149

  return { lat: accurateLat, lng: accurateLng };
}
