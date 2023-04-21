/**
 * /api/events
 */

const { Router } = require("express");
const {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  borrarEvento,
} = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();
router.use(validarJWT);
// geteventos
router.get("/", obtenerEventos);
// crearevento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
// actualizar evento
router.put("/:id", actualizarEvento);
// borrar evento
router.delete("/:id", borrarEvento);

module.exports = router;
