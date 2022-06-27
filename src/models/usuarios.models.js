const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('usuarios', UsuariosSchema);