import SpaceForm from "../shared/CreateSpaceForm.jsx";

const CreateSpace = () => {
  const handleFormSubmit = (formData) => {
    console.log("Form Data:", formData);
  };

  return (
    <div>
      <h2>Añade o modifica un espacio</h2>
      <SpaceForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CreateSpace;
