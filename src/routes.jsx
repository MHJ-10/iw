import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Map from "./components/map";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default routes;
