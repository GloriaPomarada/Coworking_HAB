import express from "express";
import path from "path";

const app = express();
// Ruta raíz de express
app.get("/", (req, res) => {
  res.send("Hello");
});

// Middleware para manejar errores 404
app.use((req, res, next) => {
  const error = new Error("No encontrado");
  error.status = 404;
  next(error);
});
// Servidor port: 3000
app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
