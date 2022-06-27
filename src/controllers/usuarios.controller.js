const usuarioModel = require('../models/usuarios.models');
var jwt = require('jsonwebtoken');
var fs = require('fs');

exports.crearUsuario = async (req, res) => {
    try {
        var usuario;
        usuario = new usuarioModel(req.body);

        await usuario.save();
        res.status(200).send(usuario);

    } catch (error) {
        console.error(error);
        res.status(500).send('ocurrio un error en el servidor');
    }
}

exports.loginUsuario = async(req, res) => {
    var user = req.body;
    var userValid = await usuarioModel.findOne({correoElectronico: user.correoElectronico});
    console.log(user);
    console.log(userValid);
    //Verifica el usuario
    if(!userValid){
        return res.status(404).send({message: 'Usuario no encontrado.'});
    }
    
    if(userValid.contraseña != user.contraseña){
        return res.status(403).send({ message: 'La Contraseña es incorrecta.' });
    }

    try {
        console.log('__dirname: ', __dirname);
        var cert_priv = fs.readFileSync(__dirname + '/../certs/clave_privada.pem');
        var signOptions = {
            issuer: process.env.Issuer,
            audience: process.env.Audience,
            expiresIn: "1d", // 1 dia (Formato https://github.com/zeit/ms)
            algorithm: "RS256" // https://github.com/auth0/node-jsonwebtoken#algorithms-supported
        };

        // https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback
        jwt.sign({ cusu: userValid }, cert_priv, signOptions,
            function(err, token) {

                if (err) {
                    console.log('Error al generar el token: ', err);
                    res.status(500).send({ error: "Error interno" });
                }
                console.log('token: ', token);
                res.send({ response: token });
            });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).send({ error: "Error interno" });
    }
}
