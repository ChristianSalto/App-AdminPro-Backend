const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
	const user = await User.find({}, "nombre email role google");

	res.json({
		ok: true,
		user,
	});
};

const createUsers = async (req, res = response) => {
	const { password, email } = req.body;

	try {
		const isEmail = await User.findOne({ email });

		if (isEmail) {
			return res.status(400).json({
				ok: false,
				msg: "El correo ya esta registrado",
			});
		}

		const user = new User(req.body);

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		// Generar el TOKEN - JWT
		const token = await generateJWT(user.id);

		res.json({
			ok: true,
			user,
			token,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: "Error inesperado... revisar logs",
		});
	}
};

const updateUsers = async (req, res = response) => {
	// TODO: Validar token y comprobar si el usuario es correcto.
	const uid = req.params.id;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			res.status(404).json({
				ok: false,
				msj: "No existe usuario por ese id",
			});
		}

		// Actualizacion del user
		const { google, password, email, ...fields } = req.body;

		if (userDB.email !== email) {
			const exitEmail = await User.findOne({ email });
			if (exitEmail) {
				res.status(400).json({
					ok: false,
					msj: "Ya existe un usuario con ese email",
				});
			}
		}

		fields.email = email;
		const userUpdated = await User.findByIdAndUpdate(uid, fields, {
			new: true,
		});

		res.json({
			ok: true,
			user: userUpdated,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: "Error inesperado... revisar logs",
		});
	}
};

const deleteUser = async (req, res = response) => {
	const uid = req.params.id;

	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			res.status(404).json({
				ok: false,
				msj: "No existe usuario por ese id",
			});
		}

		await User.findByIdAndDelete(uid);

		res.json({
			ok: true,
			msj: "Usuario eliminado",
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: "Error inesperado... revisar logs",
		});
	}
};

module.exports = {
	getUsers,
	createUsers,
	updateUsers,
	deleteUser,
};
