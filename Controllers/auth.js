const express = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = express.request) => { 
    const {name, email, password} = req.body

    try {
        const usuario = new Usuario(req.body);
        await usuario.save();

        res.status(200).json({
            ok: true,
            msg: 'Usuario Creado',
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario'
        })
    }
}

const loginUsuario = (req, res = express.request) => {
    res.json({  ok: true,
                msg: 'Login Usuario' });
}

const revalidarToken = (req, res = express.request) => {
    res.json({  ok: true,
                msg: 'Renovar Token' });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}