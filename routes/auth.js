const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {crearUsuario, loginUsuario, revalidarToken} = require("../Controllers/auth");
const { validarCampos } = require("../middlewares/validar-campo");

router.get("/", loginUsuario);

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);
router.get("/renew", revalidarToken);

module.exports = router;
