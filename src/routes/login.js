const express = require("express");
const { findOne } = require("../models/user");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });

		if (user) {
			const checkPassword = await bcrypt.compare(password, user.password);

			if (checkPassword) {
				const secret = process.env.SECRET;
				const token = jwt.sign(
					{
						id: user._id,
					},
					secret
				);
				res.status(200).json({
					msg: "O usuário foi logado com sucesso!",
					token,
					id: user._id,
				});
			} else {
				res.status(422).json({
					error: "A senha informada está incorreta!",
				});
			}
		} else {
			res.status(404).json({
				error: "O email informado não existe!",
			});
		}
	} catch (error) {
		res.status(422).json({
			error: "Ocorreu algum erro ao logar!",
		});
	}
});

module.exports = router;
