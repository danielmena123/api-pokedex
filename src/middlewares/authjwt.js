const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.Authorize = function(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticación'});
    }

    const cert_pub = fs.readFileSync(__dirname + '/../certs/clave_publica.pem');
    const signOptions = {
        issuer: process.env.Issuer,
        audience: process.env.Audience,
        expiresIn: "1d", // 1 dia (Formato https://github.com/zeit/ms)
        algorithm: "RS256" // https://github.com/auth0/node-jsonwebtoken#algorithms-supported
    };

    var token = req.headers.authorization.replace(/['"]+/g, '');
    token = token.replace('Bearer ', '');

    jwt.verify(token, cert_pub, signOptions, function(err, playload) {
        if(err){
            console.log('Ocurrio un error al decodificar el token: ', err);
            return res.status(403).send({message: 'No autorizado'});
        }
        //Agrega el playload
        req.user = playload;

        next();
    });
}