const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
	name: {
		type: String,
		required: true,
	},
	done: { type: Boolean, default: false },
	author: {
		id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		name: {
			type: String,
			required: true,
		},
	},
});

module.exports = Task;
