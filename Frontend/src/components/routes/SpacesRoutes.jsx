import { Route, Routes } from "react-router-dom";
import CreateSpace from "../pages/CreateSpace/CreateSpace"

function SpacesRoutes() {
  return (
    <Routes>
        <Route path="/create-space" element={<CreateSpace/>}/>
    </Routes>
  )
}

export default SpacesRoutes 