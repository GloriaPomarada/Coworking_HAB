import express from "express";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
