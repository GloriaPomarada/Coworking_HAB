import { useEffect } from "react";

const usePreventNumberInputScroll = () => {
  useEffect(() => {
    // Seleccionamos todos los inputs de tipo "number"
    const numberInputs = document.querySelectorAll('input[type="number"]');

    // Vincamos el evento "wheel" a cada input
    const preventScroll = (event) => event.preventDefault();
    numberInputs.forEach((input) => {
      input.addEventListener("wheel", preventScroll);
    });

    // Limpiamos el evento al desmontar el componente
    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener("wheel", preventScroll);
      });
    };
  }, []);
};

export default usePreventNumberInputScroll;
