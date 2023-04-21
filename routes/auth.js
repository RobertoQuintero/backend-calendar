/*
  Rutas auth
  host + /api/auth
*/

const { Router } = require("express");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obigatorio").not().isEmpty(),
    check("email", "El email es obigatorio").isEmail(),
    check("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    [
      check("email", "El email es obigatorio").isEmail(),
      check(
        "password",
        "El password debe tener al menos 6 caracteres"
      ).isLength({
        min: 6,
      }),
      validarCampos,
    ],
  ],
  loginUsuario
);
router.get("/renew", validarJWT, revalidarToken);

module.exports = router;
