// Ruta : /api/user

const { Router } = require("express");
const { check } = require("express-validator");

const {
	getUsers,
	createUsers,
	updateUsers,
	deleteUser,
} = require("../controllers/users");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUsers);

router.post(
	"/",
	[
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		validateFields,
	],
	createUsers
);

router.put(
	"/:id",
	[
		validateJWT,
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		check("role", "El role es obligatorio").not().isEmpty(),
		validateFields,
	],
	updateUsers
);

router.delete("/:id", validateJWT, deleteUser);

module.exports = router;
