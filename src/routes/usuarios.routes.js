const express = require('express');
const usuarioController = require('../controllers/usuarios.controller');

const router = express.Router();

router.post('/register', usuarioController.crearUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;