import SpaceForm from "../../shared/SpaceForm.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSpace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdateSubmit = async (id, formData) => {
    try {
      await axios.put(`/api/spaces/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating space:", error);
    }
  };

  return (
    <>
      <h2>Modifica un espacio</h2>
      <SpaceForm onSubmit={handleUpdateSubmit} />
    </>
  );
};

export default UpdateSpace;
