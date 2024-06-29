// authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Endpoint para inicio de sesión de usuarios
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redireccionar si el inicio de sesión está bien
  failureRedirect: '/login', // Redireccionar si el inicio de sesión está mal
  failureFlash: true // Mensajes flash para mostrar errores
}));
