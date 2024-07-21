import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSpace = () => {
  const navigate = useNavigate();

  const handleCreateSubmit = async (id, formData) => {
    try {
      await axios.post("/api/spaces", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error al crear el espacio:", error);
    }
  };

  return (
    <>
      <h2>Añade un espacio</h2>
      <SpaceForm onSubmit={handleCreateSubmit} />
    </>
  );
};

export default CreateSpace;
