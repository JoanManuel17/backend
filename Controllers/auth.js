const express = require('express');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const crearUsuario = (req, res = express.request) => { 
    const {name, email, password} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(200).json({
        ok: true,
        name, email, password
    })
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