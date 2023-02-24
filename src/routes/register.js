const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const checkEmailExist = await UserModel.findOne({ email });

		if (checkEmailExist) {
			res.status(200).json({
				error: "Esse email já é cadastrado em nosso sistema!",
			});
		} else {
			const salt = await bcrypt.genSalt(12);
			const passwordHash = await bcrypt.hash(password, salt);
			const newUser = new UserModel({ name, email, password: passwordHash });
			await newUser.save();

			const secret = process.env.SECRET;
			const token = jwt.sign(
				{
					id: newUser._id,
				},
				secret
			);

			res.status(200).json({
				msg: "Usuário cadastrado com sucesso",
				id: newUser._id,
				token,
			});
		}
	} catch (error) {
		res.status(422).json({
			error: "Não foi possível cadastrar o usuário!",
		});
	}
});

module.exports = router;
