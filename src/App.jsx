import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/map")}>Go to Map</button>
    </>
  );
}

export default App;
