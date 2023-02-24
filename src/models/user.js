const mongoose = require("mongoose");

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = User;
