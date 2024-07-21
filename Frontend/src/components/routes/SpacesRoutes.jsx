import { Route, Routes } from "react-router-dom";
import CreateSpace from "../pages/Spaces/CreateSpace.jsx";
import UpdateSpace from "../pages/Spaces/UpdateSpace.jsx";
import SpacesList from "../shared/GetSpaceInfo.jsx";

function SpacesRoutes() {
  return (
    <Routes>
      <Route path="/create-space" element={<CreateSpace />} />
      <Route path="/update-space/:id" element={<UpdateSpace />} />
      <Route path="/spaces" element={<SpacesList />} />
    </Routes>
  );
}

export default SpacesRoutes;
