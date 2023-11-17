const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const crearUsuario = async (req, res = express.request) => {
  const { name, email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email: email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    res.status(200).json({
      ok: true,
      msg: "Usuario Creado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear usuario",
    });
  }
};

const loginUsuario = async (req, res = express.request) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email: email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email",
      });
    }

    const passwordValid = bcrypt.compareSync(password, usuario.password);
    if (!passwordValid) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Login",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear usuario",
    });
    }
}

  const revalidarToken = (req, res = express.request) => {
    res.json({ ok: true, msg: "Renovar Token" });
  };

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
