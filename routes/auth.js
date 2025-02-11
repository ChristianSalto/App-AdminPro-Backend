// Ruta : /api/login

const { Router } = require("express");
const { login } = require("../controllers/auth");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post('/',[
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validateFields,
], login)

module.exports = router;