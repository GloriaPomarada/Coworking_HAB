//rutas raíz
const express = require('express');
const router = express.Router();

//Definimos las rutas de la API para reservar y cancelar un espacio de Coworking
router.get('/reservas', reservasController.getAllReservas);
router.post('/reservas', reservasController.createReserva);
router.delete('/reservas/:id', reservasController.cancelReserva);

//Creación de controladores:
const reservasController = require('./reservasController');

module.exports = {
    //Obtener todas las reservas
  getAllReservas: (req, res) => {

  },
  
  //Crear una nueva reserva
  createReserva: (req, res) => {

  },

  //Cancelar una reserva
  cancelReserva: (req, res) => {

  }
};

//!ME FALTA ALGO POR AQUÍ??????

//Se exporta el router para usarlo en el archivo principal
module.exports = router;
